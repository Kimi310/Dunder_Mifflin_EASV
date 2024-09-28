using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess;

public class CustomerRepository(DunderContext context) : ICustomerRepository
{
    public Customer CreateCustomer(Customer customer)
    {
        context.Customers.Add(customer);
        context.SaveChanges();
        return customer;
    }

    public Customer GetCustomerByEmail(Customer customer)
    {
        var fromDbCustomer = context.Customers.FirstOrDefault(c => c.Email == customer.Email);
        return fromDbCustomer;
    }
}