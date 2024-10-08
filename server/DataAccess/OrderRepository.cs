using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class OrderRepository (DunderContext context) : IOrderRepository
{
    private readonly DunderContext _context;
    

    public Order CreateOrder(Order order)
    {
        _context.Orders.Add(order);
        _context.SaveChanges();
        return order;
    }

    public Order GetOrderById(int orderId)
    {
        return _context.Orders
            .Include(o => o.OrderEntries)
            .FirstOrDefault(o => o.Id == orderId);
    }

    public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
    {
        return _context.Orders
            .Include(o => o.OrderEntries)
            .Where(o => o.CustomerId == customerId)
            .ToList();
    }

    public void UpdateOrder(Order order)
    {
        var existingOrder = _context.Orders.Find(order.Id);
        if (existingOrder == null)
        {
            throw new Exception("Order not found");
        }

        existingOrder.Status = order.Status ?? existingOrder.Status;
        existingOrder.TotalAmount = order.TotalAmount > 0 ? order.TotalAmount : existingOrder.TotalAmount;
        
        _context.SaveChanges();
    }

    public void DeleteOrder(int orderId)
    {
        var order = _context.Orders.Find(orderId);
        if (order == null) return;
        _context.Orders.Remove(order);
        _context.SaveChanges();
    }
}