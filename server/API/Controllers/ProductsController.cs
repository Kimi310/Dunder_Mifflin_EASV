using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.TransferModels.Responses;

namespace API.Controllers;


[ApiController]
[Route("[controller]")]
public class ProductsController(IPaperService paperService) : ControllerBase
{
    [HttpGet]
    public ActionResult<List<PaperDto>> GetAllProducts()
    {
        return Ok(paperService.GetAllProducts());
    }
}