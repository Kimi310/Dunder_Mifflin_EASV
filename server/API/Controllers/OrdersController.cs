using DataAccess;
using DataAccess.Models;
using DataAccess.TransferModels.Request;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.TransferModels.Requests;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        
        [HttpPost]
        public ActionResult<OrderDto> CreateOrder([FromBody] OrderDto orderDto)
        {
                var order = _orderService.CreateOrder(orderDto);
                return Ok(order);
        }
        
        
        /*
        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _orderService.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }
        [HttpGet("customer/{customerId}")]
        public IActionResult GetOrdersByCustomerId(int customerId)
        {
            var orders = _orderService.GetOrdersByCustomerId(customerId);
            return Ok(orders);
        }
        */
    }