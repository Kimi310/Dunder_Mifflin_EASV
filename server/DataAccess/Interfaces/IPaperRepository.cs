using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IPaperRepository
{
    public Paper CreatePaper(Paper paper);
    
    public List<Paper> GetAllPapers();
    
    public Paper GetPaperById(int id);

    public Paper UpdatePaperDiscontinued(Paper paper);
    
    public Paper UpdatePaperRestock(Paper paper);

}