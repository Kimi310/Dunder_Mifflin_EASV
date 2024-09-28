using DataAccess.Models;

namespace Service.TransferModels.Responses;

public class CustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Email { get; set; } = null!;

    
    public CustomerDto FromEntity(Customer customer)
    {
        return new CustomerDto()
        {
            Id = customer.Id,
            Name = customer.Name,
            Address = customer.Address!,
            Phone = customer.Phone!,
            Email = customer.Email!
        };
    }
}