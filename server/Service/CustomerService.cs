using DataAccess.Interfaces;
using DataAccess.TransferModels.Request;
using Service.Interfaces;
using Service.TransferModels.Responses;

namespace Service;

public class CustomerService(ICustomerRepository customerRepository) : ICustomerService
{
    public CustomerDto CreateCustomer(CreateCustomerDto createCustomerDto)
    {
        var customer = createCustomerDto.toCustomer();
        var newCustomer = customerRepository.CreateCustomer(customer);
        return new CustomerDto().FromEntity(newCustomer);
    }

    public CustomerDto GetCustomerByEmail(GetCustomerDto getCustomerDto)
    {
        var customer = getCustomerDto.toCustomer();
        var thisCustomer = customerRepository.GetCustomerByEmail(customer);
        return new CustomerDto().FromEntity(thisCustomer);
    }

    public CustomerDto UpdateCustomerById(UpdateCustomerDto updateCustomerDto)
    {
        var customer = updateCustomerDto.toCustomer();
        var thisCustomer = customerRepository.UpdateCustomerById(customer);
        return new CustomerDto().FromEntity(thisCustomer);
    }
}