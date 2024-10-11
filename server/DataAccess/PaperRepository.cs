using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class PaperRepository(DunderContext context) : IPaperRepository
{
    public Paper CreatePaper(Paper paper)
    {
        foreach (var property in paper.Properties)
        {
            context.Entry(property).State = EntityState.Unchanged;
        }

        context.Papers.Add(paper);
        context.SaveChanges();
        return paper;
    }

    public List<Paper> GetAllPapers()
    {
        return context.Papers.ToList();
    }

    public Paper GetPaperById(int id)
    {
        var paper = context.Papers.FirstOrDefault(p => p.Id == id);
        if (paper == null)
        {
            throw new NullReferenceException();
        }
        return paper;
    }

    public Paper UpdatePaperDiscontinued(Paper paper)
    {
        var existingPaper = context.Papers.FirstOrDefault(p => p.Id == paper.Id);
    
        if (existingPaper != null)
        {
            existingPaper.Discontinued = paper.Discontinued;
            context.SaveChanges();
            return existingPaper;
        }
        throw new NullReferenceException();
    }

    public Paper UpdatePaperRestock(Paper paper)
    {
        var existingPaper = context.Papers.FirstOrDefault(p => p.Id == paper.Id);

        if (existingPaper != null)
        {
            existingPaper.Stock = paper.Stock;
            context.SaveChanges();
            return existingPaper;
        }
        throw new NullReferenceException();
    }
}