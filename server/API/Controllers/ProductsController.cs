using DataAccess.TransferModels.Request;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.TransferModels.Responses;

namespace API.Controllers;


[ApiController]
[Route("[controller]")]
public class ProductsController(IPaperService paperService) : ControllerBase
{
    [HttpGet]
    public ActionResult<List<PaperDto>> GetAllProducts([FromQuery] string search = null)
    {
        var products = paperService.GetAllProducts().AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            products = products.Where(p => p.Name.Contains(search));
        }
        
        

        return Ok(products.ToList());
    }
}