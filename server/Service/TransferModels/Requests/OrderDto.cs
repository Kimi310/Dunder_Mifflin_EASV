using DataAccess.Models;
using Service.TransferModels.Responses;

namespace Service.TransferModels.Requests;

public class OrderDto
{
    public int CustomerId { get; set; }
    
    public double TotalAmount { get; set; }
    
    public List<OrderEntryDto> OrderEntries { get; set; }
    
    public string? Status { get; set; }

    public OrderDto FromEntity(Order order)
    {
        return new OrderDto
        {
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
    }




