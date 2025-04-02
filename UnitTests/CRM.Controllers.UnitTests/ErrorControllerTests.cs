namespace CRM.Controllers.UnitTests;

using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using ONEbook.UM.Services;
using Xunit;

public class ErrorControllerTests
{
    private readonly IMaintenanceService maintenanceService;
    private ErrorController controller;

    public ErrorControllerTests()
    {
        maintenanceService = Substitute.For<IMaintenanceService>();
        controller = new ErrorController(maintenanceService);
    }

    [Fact]
    public void PageNotFound_WhenCalled_ReturnExpectedViewResult()
    {
        //Act
        var actual = controller.PageNotFound();

        // Assert
        var viewResult = Assert.IsType<ViewResult>(actual);
        Assert.Null(viewResult.ViewName);
    }

    [Fact]
    public void AccessDenied_WhenCalled_ReturnExpectedViewResult()
    {
        // Act
        var actual = controller.AccessDenied();

        // Assert
        var viewResult = Assert.IsType<ViewResult>(actual);
        Assert.Null(viewResult.ViewName);
    }

    [Fact]
    public void InternalError_WhenCalled_ReturnExpectedViewResult()
    {
        // Act
        var actual = controller.InternalError();

        // Assert
        var viewResult = Assert.IsType<ViewResult>(actual);
        Assert.Null(viewResult.ViewName);
    }
}