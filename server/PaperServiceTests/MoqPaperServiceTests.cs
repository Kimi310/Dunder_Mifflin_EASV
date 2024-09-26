using DataAccess;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.TransferModels.Request;
using Microsoft.EntityFrameworkCore;
using Moq;
using Service;
using Service.Interfaces;
using Service.TransferModels.Responses;
using Xunit;


namespace PaperServiceTests;

public class MoqPaperServiceTests
{
    private readonly IPaperService _paperService;
    private readonly Mock<IPaperRepository> _mockPaperRepo;

    public MoqPaperServiceTests()
    {
        _mockPaperRepo = new Mock<IPaperRepository>();
        var mockContext = It.IsAny<DunderContext>();
        _paperService = new PaperService(_mockPaperRepo.Object);
    }

    [Fact]
    public void CreatePaper_Successfully_Returns_Paper()
    {
        var createPaperDto = new CreatePaperDto
        {
            Name = "Paper",
            Stock = 10,
            Price = 25
        };

        var expectedPaper = new Paper()
        {
            Id = 1,
            Name = createPaperDto.Name,
            Discontinued = false,
            Price = createPaperDto.Price,
            Stock = createPaperDto.Stock,
        };
        
        _mockPaperRepo.Setup(x => x.CreatePaper(It.IsAny<Paper>())).Returns(expectedPaper);
        
        var result = _paperService.CreatePaper(createPaperDto);
        
        Assert.NotNull(result);
        Assert.Equal(expectedPaper.Id, result.Id);
        Assert.Equal(expectedPaper.Name, result.Name);
        Assert.Equal(expectedPaper.Discontinued, result.Discontinued);
        Assert.Equal(expectedPaper.Price, result.Price);
        Assert.Equal(expectedPaper.Stock, result.Stock);
    }
}