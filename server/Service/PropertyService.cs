using DataAccess.Interfaces;
using DataAccess.TransferModels.Request;
using Service.Interfaces;
using Service.TransferModels.Responses;

namespace Service;

public class PropertyService(IPropertyRepository propertyRepository) : IPropertyService
{
    public PropertyDto CreateProperty(CreatePropertyDto createPropertyDto)
    {
        var property = createPropertyDto.ToProperty();
        var newProperty = propertyRepository.CreateProperty(property);
        return new PropertyDto().FromEntity(newProperty);
    }

    public List<PropertyDto> GetProperties()
    {
        var newProperty = propertyRepository.GetProperties();
        return newProperty.ConvertAll(p => new PropertyDto().FromEntity(p));
    }
}