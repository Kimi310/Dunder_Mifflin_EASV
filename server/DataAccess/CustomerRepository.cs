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

    public Customer UpdateCustomerById(Customer customer)
    {
        var existingCustomer = context.Customers.Find(customer.Id);

        if (existingCustomer == null)
        {
            throw new Exception("Customer not found");
        }
        
        if (customer.Name != null)
        {
            existingCustomer.Name = customer.Name;
        }

        if (customer.Address != null)
        {
            existingCustomer.Address = customer.Address;
        }

        if (customer.Phone != null)
        {
            existingCustomer.Phone = customer.Phone;
        }

        if (customer.Email != null)
        {
            existingCustomer.Email = customer.Email;
        }

        context.SaveChanges();
        return existingCustomer;
    }

    public Customer GetCustomerByID(int customerId)
    {
        return context.Customers.FirstOrDefault(c => c.Id == customerId);
    }
}