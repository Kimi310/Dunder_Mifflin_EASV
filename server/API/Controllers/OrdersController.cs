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

        [HttpGet]
        public ActionResult<List<OrderDto>> GetOrders()
        {
            var orders = _orderService.GetAllOrders();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public ActionResult<List<OrderDto>> GetOrdersByUser([FromRoute] int id)
        {
            var orders = _orderService.GetAllOrdersByCustomerId(id);
            return Ok(orders);
        }
    }