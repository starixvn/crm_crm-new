namespace CRM.Controllers.UnitTests;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CRM.Models.Auth;
using CRM.Resources;
using Fanex.Data;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client;
using Fanex.NAP.Client.Models;
using Fanex.NAP.Client.Models.ParameterObject;
using Fanex.NAP.Client.Models.ValueObject;
using Fanex.NAP.Client.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Options;
using Models;
using NSubstitute;
using Xunit;

public class AuthControllerTests
{
    private IUserService userService;
    private INapSession napSession;
    private ISecurityService securityService;
    private IGroupService groupService;
    private INapSettings napSettings;
    private IOptionsSnapshot<AppSettings> appSettings;

    [Fact]
    public void Index_WhenCalled_ReturnView()
    {
        var controller = GetController();
        //Actual
        var actual = controller.SignIn();

        //Assert
        Assert.IsType<ViewResult>(actual);
    }

    #region SSO Login Tests

    [Fact]
    public async Task SSO_IsNotValidTime_RedirectToAction()
    {
        var controller = GetController();
        var sso = new SingleSignOn
        {
            OnUserId = Cryptography.EncryptPassword("8"),
            UserId = Cryptography.EncryptPassword("8"),
            Time = Cryptography.EncryptPassword(DateTime.Now.ToString()),
            RedirectUrl = "/Test"
        };
        securityService.GetTimeAsync().Returns(DateTime.Now.AddYears(1).ToString());
        //Actual
        var actual = await controller.SingleSignOn(sso);

        //Assert
        var result = Assert.IsType<RedirectResult>(actual);
        Assert.Equal("~/Auth/SignIn", result.Url);
    }

    [Fact]
    public async Task SSO_IsValidTimeAndCannotSSOLogin_RedirectToAction()
    {
        var controller = FakeDoCheckInController();
        controller.ControllerContext.HttpContext.Request.Headers["Accept-Language"] = "us";
        var sso = new SingleSignOn
        {
            OnUserId = Cryptography.EncryptPassword("8"),
            UserId = Cryptography.EncryptPassword("8"),
            Time = Cryptography.EncryptPassword(DateTime.Now.ToString()),
            RedirectUrl = "/Test"
        };
        securityService.GetTimeAsync().Returns(DateTime.Now.AddYears(-1).ToString());
        securityService.SSOLoginAsync(Arg.Any<SSOLoginParameter>()).Returns(0);
        //Actual
        var actual = await controller.SingleSignOn(sso);

        //Assert
        var result = Assert.IsType<RedirectResult>(actual);
        Assert.Equal("~/Auth/SignIn", result.Url);
    }

    [Fact]
    public async Task SSO_IsValidTimeAndSSOLoginSuccess_ButNoUser_RedirectAction()
    {
        var controller = FakeDoCheckInController();
        controller.ControllerContext.HttpContext.Request.Headers["Accept-Language"] = "us";
        var sso = new SingleSignOn
        {
            OnUserId = Cryptography.EncryptPassword("8"),
            UserId = Cryptography.EncryptPassword("8"),
            Time = Cryptography.EncryptPassword(DateTime.Now.ToString()),
            RedirectUrl = "/Test"
        };
        securityService.GetTimeAsync().Returns(DateTime.Now.AddYears(-1).ToString());
        securityService.SSOLoginAsync(Arg.Any<SSOLoginParameter>()).Returns(8);
        //Actual
        var actual = await controller.SingleSignOn(sso);

        //Assert
        var result = Assert.IsType<RedirectResult>(actual);
        Assert.Equal("~/Auth/SignIn", result.Url);
    }

    [Fact]
    public async Task SSO_IsValidTimeAndSSOLoginSuccess_GetUserSuccess_RedirectAction()
    {
        var controller = FakeDoCheckInController();
        controller.ControllerContext.HttpContext.Request.Headers["Accept-Language"] = "us";
        var sso = new SingleSignOn
        {
            OnUserId = Cryptography.EncryptPassword("8"),
            UserId = Cryptography.EncryptPassword("8"),
            Time = Cryptography.EncryptPassword(DateTime.Now.ToString()),
            RedirectUrl = "/Test"
        };
        var user = new User
        {
            Id = 8,
            Name = "sa",
            Username = "sa",
        };
        securityService.SSOLoginAsync(Arg.Any<SSOLoginParameter>()).Returns(8);
        userService.GetAsync(Arg.Any<int>()).Returns(user);
        securityService.GetTimeAsync().Returns(DateTime.Now.AddYears(-1).ToString());
        var menuItems = new List<MenuItem>
        {
            new() {Id = 1, Name = "Test", Url = "/Test"},
            new() {Id = 2, Name = "Sub", Url = "Sub" }
        };
        userService.GetMenuItemAsync(Arg.Any<int>(), Arg.Any<int>(), Arg.Any<string>()).Returns(menuItems);

        //Actual
        var actual = await controller.SingleSignOn(sso);

        //Assert
        var result = Assert.IsType<RedirectResult>(actual);
        Assert.Equal("/Test", result.Url);
    }

    #endregion SSO Login Tests

    #region SignIn tests

    [Fact]
    public async Task SignIn_WhenNoUser_ReturnExpectedResult()
    {
        var controller = GetController();
        //Actual
        var actual = await controller.SignIn(new SignIn());

        //Assert
        Assert.IsType<ViewResult>(actual);
        Assert.Equal(ViewResources.UserNotExisted, controller.ViewBag.Message);
    }

    [Fact]
    public async Task SignIn_WrongPassword_ReturnExpectedResult()
    {
        var controller = GetController();
        var userLogin = new SignIn
        {
            Username = "sa",
            Password = "1234"
        };

        var user = new User
        {
            Username = "sa",
            Password = "Test"
        };
        userService.GetAsync(Arg.Any<string>()).Returns(user);

        //Actual
        var actual = await controller.SignIn(userLogin);

        //Assert
        Assert.IsType<ViewResult>(actual);
        Assert.Equal(ViewResources.WrongPassword, controller.ViewBag.Message);
    }

    [Fact]
    public async Task SignIn_NoPermission_ReturnExpectedResult()
    {
        var controller = GetController();
        var userLogin = new SignIn
        {
            Username = "sa",
            Password = "1234"
        };

        var user = new User
        {
            Username = "sa",
            Password = "1234",
            GroupId = 2
        };

        userService.GetAsync(Arg.Any<string>()).Returns(user);
        groupService.GetAsync(Arg.Any<int>()).Returns(new Group { Id = 2, Name = "Test", IsActive = true });
        //Actual
        var actual = await controller.SignIn(userLogin);

        //Assert
        Assert.IsType<ViewResult>(actual);
        Assert.Equal(ViewResources.NoPermission, controller.ViewBag.Message);
    }

    [Fact]
    public async Task SignIn_Valid_ReturnExpectedResult()
    {
        var controller = FakeDoCheckInController();
        controller.ControllerContext.HttpContext.Request.Headers["Accept-Language"] = "us";
        var userLogin = new SignIn
        {
            Username = "sa",
            Password = "1234aa",
            ReturnUrl = "/Test"
        };

        var user = new User
        {
            Username = "sa",
            Password = "1234aa",
            GroupId = 2
        };
        var siteLevel = new List<SiteLevel>
        {
            new() { SiteId = 69, IsActive = true }
        };
        napSettings.SiteId.Returns(69);
        userService.GetAsync(Arg.Any<string>()).Returns(user);
        groupService.GetAsync(Arg.Any<int>())
            .Returns(new Group { Id = 2, Name = "Test", IsActive = true });
        userService.GetSiteLevelAsync(Arg.Any<int>(), Arg.Any<string>())
            .Returns(siteLevel);
        //Actual
        var actual = await controller.SignIn(userLogin);

        //Assert
        var result = Assert.IsType<RedirectResult>(actual);

        Assert.Equal("/Test", result.Url);
    }

    #endregion SignIn tests

    #region helper

    private AuthController FakeDoCheckInController()
    {
        var authService = Substitute.For<IAuthenticationService>();
        var urlHelper = Substitute.For<IUrlHelper>();
        var urlHelperFactory = Substitute.For<IUrlHelperFactory>();
        var serviceProvider = Substitute.For<IServiceProvider>();
        var session = Substitute.For<ISession>();
        var tempData = Substitute.For<ITempDataDictionaryFactory>();
        serviceProvider.GetService(typeof(IAuthenticationService)).Returns(authService);
        serviceProvider.GetService(typeof(IUrlHelper)).Returns(urlHelper);
        serviceProvider.GetService(typeof(IUrlHelperFactory)).Returns(urlHelperFactory);
        serviceProvider.GetService(typeof(ITempDataDictionaryFactory)).Returns(tempData);

        var request = Substitute.For<HttpRequest>();
        request.Host.Returns(new HostString("localhost", 8081));
        var httpContext = Substitute.For<HttpContext>();
        httpContext.Request.Returns(request);
        httpContext.RequestServices.Returns(serviceProvider);
        httpContext.Session.Returns(session);

        var controllerContext = new ControllerContext
        {
            HttpContext = httpContext
        };

        var controller = GetController();
        controller.ControllerContext = controllerContext;
        controller.ControllerContext.HttpContext.Connection.RemoteIpAddress = System.Net.IPAddress.Any;
        controller.ControllerContext.HttpContext.Request.Headers["User-Agent"] = "12345";
        controller.Url.IsLocalUrl(Arg.Any<string>()).Returns(true);

        return controller;
    }

    private AuthController GetController()
    {
        userService = Substitute.For<IUserService>();
        groupService = Substitute.For<IGroupService>();
        napSettings = Substitute.For<INapSettings>();
        securityService = Substitute.For<ISecurityService>();
        napSession = Substitute.For<INapSession>();
        appSettings = Substitute.For<IOptionsSnapshot<AppSettings>>();
        appSettings.Value.Returns(new AppSettings { SingleSignOnExpiredTime = -1 });

        return new AuthController(userService, napSession, securityService, groupService, napSettings, appSettings);
    }

    #endregion helper
}