using DataAccess.Models;
using Service.TransferModels.Responses;

namespace Service.TransferModels.Requests;

public class OrderDto
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    
    public double TotalAmount { get; set; }
    
    public List<OrderEntryDto> OrderEntries { get; set; }
    
    public string? Status { get; set; }

    public OrderDto FromEntity(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            CustomerId = order.CustomerId,
            TotalAmount = order.TotalAmount,
            Status = order.Status,
            OrderEntries = order.OrderEntries.Select(e => new OrderEntryDto
            {
                ProductId = e.ProductId,
                Quantity = e.Quantity
            }).ToList()
            
        };
    }

    public Order toOrder()
    {
        return new Order()
        {
            Id = Id,
            Status = Status,
            TotalAmount = TotalAmount,
            CustomerId = CustomerId,
        };
    }
    }




