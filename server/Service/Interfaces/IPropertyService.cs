using DataAccess.TransferModels.Request;
using Service.TransferModels.Responses;

namespace Service.Interfaces;

public interface IPropertyService
{
    public PropertyDto CreateProperty(CreatePropertyDto createPropertyDto);

    public List<PropertyDto> GetProperties();
}