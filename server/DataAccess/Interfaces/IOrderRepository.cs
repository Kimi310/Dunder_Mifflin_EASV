using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IOrderRepository
{
    Order CreateOrder(Order order);
    List<Order> GetOrdersByCustomerId(int customerId);
    
    List<Order> GetAllOrders();

    public Order ChangeOrderStatus(Order order);
}