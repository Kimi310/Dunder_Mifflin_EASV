using DataAccess.TransferModels.Request;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.TransferModels.Responses;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]

public class 
    CustomerController(ICustomerService customerService): ControllerBase
{
    [HttpPost]
    [Route("signup")]
    public ActionResult<CustomerDto> CreateCustomer([FromBody] CreateCustomerDto data)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        try
        {
            var customer = customerService.CreateCustomer(data);
            return Ok(customer);
        }
        catch (Exception e)
        {
            return BadRequest("Error with your request");
        }
    }


    [HttpPost]
    [Route("login")]
    public ActionResult<CustomerDto> LoginCustomer([FromBody] GetCustomerDto data)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var customer = customerService.GetCustomerByEmail(data);
            return Ok(customer);
        }
        catch (Exception e)
        {
            return BadRequest("Error with your request " + e.Message);
        }
    }


    [HttpPatch]
    [Route("update")]
    public ActionResult<CustomerDto> UpdateCustomer([FromBody] UpdateCustomerDto data)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var customer = customerService.UpdateCustomerById(data);
            return Ok(customer);
        }
        catch (Exception e)
        {
            return BadRequest("Error with your request " + e.Message);
        }
    }
}