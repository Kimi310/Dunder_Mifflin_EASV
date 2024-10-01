using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using DataAccess.Models;

namespace DataAccess.TransferModels.Request;

public class UpdateCustomerDto
{
    [Required(ErrorMessage = "Id is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Id must be greater than 0.")]
    public int Id { get; set; }
    
    public string Name { get; set; } = null!;
    
    public string Address { get; set; } = null!;
    
    [Phone(ErrorMessage = "Invalid phone number format.")]
    public string Phone { get; set; } = null!;
    
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = null!;
    
    public Customer toCustomer()
    {
        return new Customer()
        {
            Id = Id,
            Name = Name,
            Address = Address,
            Phone = Phone,
            Email = Email
        };
    }
}