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

    public List<Order> GetOrdersByCustomerId(int customerId)
    {
        return context.Orders
            .Include(o => o.OrderEntries)
            .Where(o => o.CustomerId == customerId)
            .ToList();
    }

    public List<Order> GetAllOrders()
    {
        return context.Orders.Include(o => o.OrderEntries).ToList();
    }

    public Order ChangeOrderStatus(Order order)
    {
        var existingOrder = context.Orders.Include(o => o.OrderEntries).FirstOrDefault(p => p.Id == order.Id);
    
        if (existingOrder != null)
        {
            existingOrder.Status = order.Status;
            context.SaveChanges();
            return existingOrder;
        }
        throw new NullReferenceException();
    }
}