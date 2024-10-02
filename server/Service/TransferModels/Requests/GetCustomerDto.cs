using System.ComponentModel.DataAnnotations;
using DataAccess.Models;

namespace DataAccess.TransferModels.Request;

public class GetCustomerDto
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = null!;
    
    public Customer toCustomer()
    {
        return new Customer() { Email = Email };
    }
}