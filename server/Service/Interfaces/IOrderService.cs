using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.TransferModels.Request;
using Service.TransferModels.Requests;

namespace Service.Interfaces;

public interface IOrderService
{
    OrderDto CreateOrder(OrderDto orderDto);
    public List<OrderDto> GetAllOrders();
    public List<OrderDto> GetAllOrdersByCustomerId(int customerId);
    public OrderDto ChangeOrderStatus(OrderDto orderDto);
}