using DataAccess.Models;

namespace Service.TransferModels.Responses;

public class PropertyDto
{
    public int Id { get; set; }

    public string PropertyName { get; set; } = null!;
    
    public PropertyDto FromEntity(Property property)
    {
        return new PropertyDto()
        {
            Id = property.Id,
            PropertyName =  property.PropertyName
        };
    }
    
    public Property ToProperty()
    {
        return new Property
        {
            PropertyName = this.PropertyName,
            Id = this.Id
        };
    }
}