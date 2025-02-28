namespace CRM.UnitTests.Filters;

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using CRM.Filters;
using CRM.Services;
using Fanex.Logging;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using NSubstitute;
using Xunit;
using static Fanex.NAP.Client.Helpers.Business.Constant;

public class CrmPermissionAttributeTests
{
    [Fact]
    public async Task OnAuthorizationAsync_NoPermission_ExpectedRedirectResult()
    {
        // Arrange
        var napSession = Substitute.For<INapSession>();
        var logger = Substitute.For<ILogger>();
        var permissionService = Substitute.For<IPermissionService>();
        napSession.UserId.Returns(1);

        var context = new AuthorizationFilterContext(
            new ActionContext
            {
                HttpContext = new DefaultHttpContext(),
                RouteData = new RouteData(),
                ActionDescriptor = new ActionDescriptor(),
            },
            new List<IFilterMetadata>());
        var filter = new CrmPermissionAttribute(napSession, logger, permissionService)
        {
            Policy = Policy.Host
        };

        // Act
        await filter.OnAuthorizationAsync(context);

        // Assert
        var redirectResult = Assert.IsAssignableFrom<RedirectToActionResult>(context.Result);
        Assert.Equal("Auth", redirectResult.ControllerName);
    }

    [Fact]
    public async Task OnAuthorizationAsync_HavePermission_RequestSucceeded()
    {
        // Arrange
        var napSession = Substitute.For<INapSession>();
        var logger = Substitute.For<ILogger>();
        var permissionService = Substitute.For<IPermissionService>();
        var context = new AuthorizationFilterContext(
            new ActionContext
            {
                HttpContext = new DefaultHttpContext(),
                RouteData = new RouteData(),
                ActionDescriptor = new ActionDescriptor(),
            },
            new List<IFilterMetadata>());
        var filter = new CrmPermissionAttribute(napSession, logger, permissionService)
        {
            Policy = Policy.Host
        };

        // Act
        await filter.OnAuthorizationAsync(context);

        // Assert
        Assert.Equal((int)HttpStatusCode.OK, context.HttpContext.Response.StatusCode);
    }
}