using DataAccess.Models;

namespace Service;
using DataAccess.Interfaces;
using DataAccess.TransferModels.Request;
using Service.Interfaces;
using Service.TransferModels.Responses;

public class OrderService
{
    public async Task<ServiceResult> PlaceOrder(OrderDto orderDto)
    {
        var order = new Order
        {
            OrderDate = orderDto.OrderDate,
            TotalAmount = CalculateTotalAmount(orderDto.OrderEntries),
            OrderEntries = orderDto.OrderEntries.Select(oe => new OrderEntry
            {
                ProductId = oe.ProductId,
                Quantity = oe.Quantity
            }).ToList()
        };

        _context.Orders.Add(order);
         _context.SaveChangesAsync();

        return new ServiceResult { Success = true };
    }

}