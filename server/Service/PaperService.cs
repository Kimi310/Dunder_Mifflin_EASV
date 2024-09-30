using DataAccess.Interfaces;
using DataAccess.TransferModels.Request;
using Service.Interfaces;
using Service.TransferModels.Responses;

namespace Service;


public class PaperService(IPaperRepository paperRepository) : IPaperService
{
    public PaperDto CreatePaper(CreatePaperDto createPaperDto)
    {
        var paper = createPaperDto.toPaper();
        var newPaper = paperRepository.CreatePaper(paper);
        return new PaperDto().FromEntity(newPaper);
    }

    public List<PaperDto> GetAllProducts()
    {
        return paperRepository.GetAllPapers().ConvertAll(p => new PaperDto().FromEntity(p));
    }

    public PaperDto GetPaperById(int paperId)
    {
        return new PaperDto().FromEntity(paperRepository.GetPaperById(paperId));
    }
}