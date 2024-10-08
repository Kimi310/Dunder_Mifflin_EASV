using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.TransferModels.Request;
using Service.TransferModels.Requests;

namespace Service.Interfaces;

public interface IOrderService
{
    Order CreateOrder(OrderDto orderDto);
    Order GetOrderById(int orderId);

}

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public Order CreateOrder(OrderDto orderDto)
    {
        var order = new Order
        {
            OrderDate = DateTime.Now,
            CustomerId = orderDto.CustomerId,
            Status = "Pending",
            OrderEntries = orderDto.OrderEntries.Select(entry => new OrderEntry
            {
                ProductId = entry.ProductId,
                Quantity = entry.Quantity
            }).ToList()
        };

        
        order.TotalAmount = order.OrderEntries
            .Sum(e => e.Quantity * 10); 

        return _orderRepository.CreateOrder(order);
    }

    public Order GetOrderById(int orderId)
    {
        return _orderRepository.GetOrderById(orderId);
    }
    
}