using DataAccess.TransferModels.Request;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.TransferModels.Responses;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class PropertyController(IPropertyService propertyService) : ControllerBase
{
    [HttpPost]
    [Route("Create")]
    public ActionResult<PropertyDto> CreatePaper([FromBody] CreatePropertyDto data)
    {
        var property = propertyService.CreateProperty(data);
        return Ok(property);
    }
    
    [HttpGet]
    [Route("Get")]
    public ActionResult<List<PropertyDto>> GetAllProducts()
    {
        var properties = propertyService.GetProperties();
        return Ok(properties.ToList());
    }
}