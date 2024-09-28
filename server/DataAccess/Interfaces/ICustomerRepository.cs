using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface ICustomerRepository
{
    public Customer CreateCustomer(Customer customer);
    public Customer GetCustomerByEmail(Customer customer);
}