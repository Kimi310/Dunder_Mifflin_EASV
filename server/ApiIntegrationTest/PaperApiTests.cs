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

public class PaperApiTests : WebApplicationFactory<Program>
{
    private readonly PgCtxSetup<DunderContext> _pgCtxSetup = new();

    public PaperApiTests()
    {
        Environment.SetEnvironmentVariable("DbConnectionString", 
            _pgCtxSetup._postgres.GetConnectionString());
    }

    [Fact]
    public async Task Create_Paper_Api_Test_Persist_To_Db()
    {
        var createPaperDto = new CreatePaperDto
        {
            Name = "Paper",
            Stock = 10,
            Price = 25
        };
        
        // Create Client
        var client = CreateClient();
        
        // Sim a request and get response
        var response = await client.PostAsJsonAsync("/Paper/Create", createPaperDto);
        
        // Make sure response code is OK ( 200 )
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        
        // Check the content
        var returnedPaper = await response.Content.ReadFromJsonAsync<PaperDto>();
        
        var paperInDb = _pgCtxSetup.DbContextInstance.Papers.First();
        Assert.Equal(createPaperDto.Name, returnedPaper.Name);
        Assert.Equal(createPaperDto.Stock, returnedPaper.Stock);
        Assert.Equal(createPaperDto.Price, returnedPaper.Price);
        Assert.Equivalent(createPaperDto.Name, paperInDb.Name);
        Assert.Equal(createPaperDto.Stock, paperInDb.Stock);
        Assert.Equal(createPaperDto.Price, paperInDb.Price);
    }

}