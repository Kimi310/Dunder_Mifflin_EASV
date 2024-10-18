using DataAccess.Models;
using Service.TransferModels.Responses;

namespace DataAccess.TransferModels.Request;

public class CreatePaperDto
{
    public string Name { get; set; }
    
    public int Stock { get; set; }
    
    public double Price { get; set; }
    
    public List<PropertyDto> Properties { get; set; } = new List<PropertyDto>();
    
    
    public Paper toPaper()
    {
        return new Paper()
        {
            Name = Name,
            Stock = Stock,
            Price = Price,
            Properties = this.Properties.ConvertAll(p => p.ToProperty())
        };
    }
}