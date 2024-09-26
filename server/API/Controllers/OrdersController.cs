using DataAccess.TransferModels.Request;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]

public class OrdersController (IOrderService orderService): ControllerBase
{
    /*[HttpPost]
    public async Task<IActionResult> CreateOrder(OrderDto orderDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var order = await orderService.CreateOrder(orderDto);
        return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
    }
   [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await orderService.GetOrderById(id);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }*/
}
