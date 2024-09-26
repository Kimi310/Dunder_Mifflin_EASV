using DataAccess.Models;
using DataAccess.TransferModels.Request;

namespace Service.Interfaces;

public interface IOrderService
{
    Task<Order> CreateOrder(OrderDto orderDto);
}