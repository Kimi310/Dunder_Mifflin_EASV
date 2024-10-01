using DataAccess.TransferModels.Request;
using Service.TransferModels.Responses;

namespace Service.Interfaces;

public interface ICustomerService
{
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto);
    public CustomerDto GetCustomerByEmail(GetCustomerDto getCustomerDto);
    public CustomerDto UpdateCustomerById(UpdateCustomerDto updateCustomerDto);
}