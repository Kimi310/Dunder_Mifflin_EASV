using DataAccess.Models;
using Service.TransferModels.Responses;

namespace DataAccess.TransferModels.Request;

public class OrderDto
{
    public int? CustomerId { get; set; }

    public virtual Customer? Customer { get; set; }
    
    public double TotalAmount { get; set; }
    
    public List<OrderEntryDto> OrderEntries { get; set; }
}


