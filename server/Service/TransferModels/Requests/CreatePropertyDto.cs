using DataAccess.Models;

namespace DataAccess.TransferModels.Request;

public class CreatePropertyDto
{
    public string PropertyName { get; set; } = null!;

    public Property ToProperty()
    {
        return new Property
        {
            PropertyName = this.PropertyName
        };
    }
}