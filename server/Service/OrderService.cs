using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using Service.Interfaces;
using DataAccess.TransferModels.Request;
using Service.TransferModels.Requests;
using Service.TransferModels.Responses;
namespace Service;

public class OrderService(IOrderRepository _orderRepository, ICustomerRepository _customerRepository, IPaperRepository _paperRepository) : IOrderService
{
    public OrderDto CreateOrder(OrderDto orderDto)
    {
        var customer = _customerRepository.GetCustomerByID(orderDto.CustomerId);
        if (customer == null)
        {
            throw new Exception("Customer not found");
        }

        
        var order = new Order
        {
            CustomerId = customer.Id,
            OrderDate = DateTime.UtcNow,
            Status = "Pending",
            OrderEntries = orderDto.OrderEntries.Select(entryDto => 
            {
                var product = _paperRepository.GetPaperById(entryDto.ProductId.Value);
                if (product == null)
                {
                    throw new Exception("Product not found");
                }
                return new OrderEntry
                {
                    ProductId = entryDto.ProductId,
                    Quantity = entryDto.Quantity,
                    Product = product
                };
            }).ToList()
        };

        order.TotalAmount = order.OrderEntries.Sum(e => e.Product.Price * e.Quantity);

        var newOrder = _orderRepository.CreateOrder(order);
        return new OrderDto().FromEntity(newOrder);
    }

    public List<OrderDto> GetAllOrders()
    {
        var orders = _orderRepository.GetAllOrders();
        var orderDtos = orders.Select(order => new OrderDto().FromEntity(order)).ToList();
        return orderDtos;
    }

    public List<OrderDto> GetAllOrdersByCustomerId(int customerId)
    {
        var orders = _orderRepository.GetOrdersByCustomerId(customerId);
        var orderDtos = orders.Select(order => new OrderDto().FromEntity(order)).ToList();
        return orderDtos;
    }
}
  

