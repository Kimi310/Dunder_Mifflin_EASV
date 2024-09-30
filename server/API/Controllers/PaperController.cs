using DataAccess.Models;
using DataAccess.TransferModels.Request;
using Microsoft.AspNetCore.Mvc;
using Service;
using Service.Interfaces;
using Service.TransferModels.Responses;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class PaperController(IPaperService paperService) : ControllerBase
{
    [HttpPost]
    [Route("Create")]
    public ActionResult<PaperDto> CreatePaper([FromBody] CreatePaperDto data)
    {
        var paper = paperService.CreatePaper(data);
        return Ok(paper);
    }

    [HttpGet]
    [Route("Get/{id}")]
    public ActionResult<PaperDto> GetPaper([FromRoute] int id)
    {
        var paper = paperService.GetPaperById(id);
        return Ok(paper);
    }
}