namespace CRM.UnitTests.Services;

using System.Text;
using System.Text.Json;
using CRM.Services;
using Microsoft.AspNetCore.Http;
using Models;
using NSubstitute;
using Xunit;

public class SessionServiceTests
{
    private readonly ISession session;
    private readonly SessionService sessionService;

    public SessionServiceTests()
    {
        session = Substitute.For<ISession>();
        var httpContextAccessor1 = Substitute.For<IHttpContextAccessor>();
        httpContextAccessor1.HttpContext.Returns(new DefaultHttpContext { Session = session });
        sessionService = new SessionService(httpContextAccessor1);
    }

    [Fact]
    public void CurrentCustomer_Get_ReturnsExpectedResult()
    {
        // Arrange
        var expectedCustomer = new CurrentCustomer { CustId = 1, Name = "Test Customer" };
        session.TryGetValue("CurrentCustomer", out _).Returns(x =>
        {
            var json = JsonSerializer.Serialize(expectedCustomer);
            var valueBytes = Encoding.UTF8.GetBytes(json);
            x[1] = valueBytes; ; // out param
            return true;
        });

        // Act
        var result = sessionService.CurrentCustomer;

        // Assert
        Assert.Equal(JsonSerializer.Serialize(expectedCustomer), JsonSerializer.Serialize(result));
    }

    [Fact]
    public void CurrentCustomer_Set_SetsExpectedValue()
    {
        // Arrange
        var expectedCustomer = new CurrentCustomer { CustId = 1, Name = "Test Customer" };

        // Act
        sessionService.CurrentCustomer = expectedCustomer;

        // Assert
        session.Received(1).Set("CurrentCustomer", Arg.Any<byte[]>());
    }

    [Fact]
    public void ClearKey_WhenCalled_RemovesKey()
    {
        // Arrange
        var key = "TestKey";

        // Act
        sessionService.ClearKey(key);

        // Assert
        session.Received(1).Remove(key);
    }
}