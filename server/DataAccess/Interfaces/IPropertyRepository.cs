using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IPropertyRepository
{
    public Property CreateProperty(Property property);

    public List<Property> GetProperties();
}