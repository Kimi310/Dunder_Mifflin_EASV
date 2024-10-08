using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using Service.Interfaces;
using DataAccess.TransferModels.Request;
using Service.TransferModels.Requests;
using Service.TransferModels.Responses;
namespace Service;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly ICustomerRepository _customerRepository;
    private readonly IPaperRepository _paperRepository;

    public OrderService(IOrderRepository orderRepository, ICustomerRepository customerRepository, IPaperRepository paperRepository)
    {
        _orderRepository = orderRepository;
        _customerRepository = customerRepository;
        _paperRepository = paperRepository;
    }

    public Order CreateOrder(OrderDto orderDto)
    {
        var customer = _customerRepository.GetCustomerById(OrderDto.CustomerId);
        if (customer == null)
        {
            throw new Exception("Customer not found");
        }

        
        var order = new Order
        {
            CustomerId = OrderDto.CustomerId,
            OrderDate = DateTime.Now,
            Status = "Pending",
            OrderEntries = OrderDto.OrderEntries.Select(entryDto => 
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
                    Price = product.Price
                };
            }).ToList()
        };

        // Oblicz sumaryczną kwotę zamówienia
        order.TotalAmount = order.OrderEntries.Sum(e => e.Price * e.Quantity);

        var newOrder = _orderRepository.CreateOrder(order);
        return new OrderDto().FromEntity(newOrder);
    }
    

    public Order GetOrderById(int orderId)
    {
        var order = _orderRepository.GetOrderById(orderId);
        return new Order().OrderEntries (order);
    }

    public List<OrderDto> GetOrdersByCustomerId(int customerId)
    {
        return _orderRepository.GetOrdersByCustomerId(customerId).ConvertAll(o => new OrderDto().FromEntity(o));
    }
}
  

