using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IOrderRepository
{
    Order CreateOrder(Order order);
    Order GetOrderById(int orderId);
    IEnumerable<Order> GetOrdersByCustomerId(int customerId);
    void UpdateOrder(Order order);
    void DeleteOrder(int orderId);
    

}