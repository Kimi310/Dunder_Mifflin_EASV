using System.ComponentModel.DataAnnotations;
using DataAccess.Models;

namespace DataAccess.TransferModels.Request;

public class CreateCustomerDto
{
    [Required(ErrorMessage = "Name is required.")]
    public string Name { get; set; } = null!;
    
    
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = null!;
    
    
    public Customer toCustomer()
    {
        return new Customer()
        {
            Name = Name,
            Email = Email
        };
    }
}