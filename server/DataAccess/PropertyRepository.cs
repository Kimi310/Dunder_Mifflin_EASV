using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess;

public class PropertyRepository(DunderContext context) : IPropertyRepository
{
    public Property CreateProperty(Property property)
    {
        context.Properties.Add(property);
        context.SaveChanges();
        return property;
    }

    public List<Property> GetProperties()
    {
        return context.Properties.ToList();
    }
}