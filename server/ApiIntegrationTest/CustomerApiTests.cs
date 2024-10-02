using System.Net.Http.Json;
using System.Text.Json;
using System.Net;
using API;
using DataAccess;
using DataAccess.Models;
using DataAccess.TransferModels.Request;
using Microsoft.AspNetCore.Mvc.Testing;
using PgCtx;
using Service.TransferModels.Responses;
using Xunit;

namespace ApiIntegrationTest;

public class CustomerApiTests : WebApplicationFactory<Program>
{
    private readonly PgCtxSetup<DunderContext> _pgCtxSetup = new();

    public CustomerApiTests()
    {
        Environment.SetEnvironmentVariable("DbConnectionString", 
            _pgCtxSetup._postgres.GetConnectionString());
    }


    [Fact]
    public async Task Create_New_Customer()
    {
        var createCustomerDto = new CreateCustomerDto
        {
            Name = "John Doe",
            Email = "john@doe.com"
        };
        
        // Create Client
        var client = CreateClient();
        
        // Sim a request and get response
        var response = await client.PostAsJsonAsync("/Customer/signup", createCustomerDto);
        
        // Make sure response code is OK ( 200 )
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        // Check the content
        var customer = await response.Content.ReadFromJsonAsync<CustomerDto>();
        
        Assert.NotNull(customer);
        Assert.Equal(1, customer.Id);
        Assert.Equal("John Doe", customer.Name);
        Assert.Equal("john@doe.com", customer.Email);
    }
}