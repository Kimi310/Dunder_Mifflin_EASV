using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess;

public class PaperRepository(DunderContext context) : IPaperRepository
{
    public Paper CreatePaper(Paper paper)
    {
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
}