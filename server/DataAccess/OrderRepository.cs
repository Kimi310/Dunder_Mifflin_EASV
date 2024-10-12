using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class OrderRepository (DunderContext context) : IOrderRepository
{
   

    public Order CreateOrder(Order order)
    {
        context.Orders.Add(order);
        context.SaveChanges();
        return order;
    }

    public Order GetOrderById(int orderId)
    {
        return context.Orders
            .Include(o => o.OrderEntries)
            .FirstOrDefault(o => o.Id == orderId);
    }

    public IEnumerable<Order> GetOrdersByCustomerId(int customerId)
    {
        return context.Orders
            .Include(o => o.OrderEntries)
            .Where(o => o.CustomerId == customerId)
            .ToList();
    }

    public void UpdateOrder(Order order)
    {
        var existingOrder = context.Orders.Find(order.Id);
        if (existingOrder == null)
        {
            throw new Exception("Order not found");
        }

        existingOrder.Status = order.Status ?? existingOrder.Status;
        existingOrder.TotalAmount = order.TotalAmount > 0 ? order.TotalAmount : existingOrder.TotalAmount;
        
        context.SaveChanges();
    }

    public void DeleteOrder(int orderId)
    {
        var order = context.Orders.Find(orderId);
        if (order == null) return;
        context.Orders.Remove(order);
        context.SaveChanges();
    }
}