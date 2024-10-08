using DataAccess.Models;
using Service.Interfaces;
using DataAccess.TransferModels.Request;
using Service.TransferModels.Responses;
namespace Service;
public class OrderService : IOrderService
{
    private readonly ApplicationDbContext _context;

    public OrderService(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Order> CreateOrder(OrderDto orderDto)
    {
        // Sprawdzenie, czy klient istnieje
        var customer = await _context.Customers.FindAsync(orderDto.CustomerId);
        if (customer == null)
        {
            throw new ArgumentException("Customer not found");
        }

        // Tworzenie nowego zamówienia
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

        // Obliczanie całkowitej kwoty zamówienia
        order.TotalAmount = order.OrderEntries.Sum(e => e.Quantity * _context.Paper.Find(e.ProductId).Price);

        // Dodanie zamówienia do kontekstu
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return order;
    }

  
}
