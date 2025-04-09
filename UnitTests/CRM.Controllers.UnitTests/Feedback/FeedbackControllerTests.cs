namespace CRM.Controllers.UnitTests.Feedback;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Feedback;
using CRM.Criteria.Feedback;
using CRM.Models;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using CRM.Services;
using CRM.Services.Customer;
using CRM.Services.Feedback;
using CRM.ViewModels.Feedback;
using Enum;
using Fanex.NAP.Client;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Customer;
using NSubstitute;
using Services.Interfaces;
using Xunit;
using static Fanex.NAP.Client.Helpers.Business.Constant;
using FeedbackStatus = Models.Setting.FeedbackStatus;

public class FeedbackControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private INapSession napSession;
    private INapSettings napSettings;
    private IUserService userService;
    private ISettingService settingService;
    private IFeedbackService feedbackService;
    private ITicketRefService ticketRefService;
    private ICRMLogService logService;
    private IPermissionService permissionService;
    private ICustomerService customerService;
    private IBaseService baseService;

    [Fact]
    public async Task GetNoOfInquiryByFeedbackId_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var feedback = fixture.Create<EditNoOfInquiry>();
        var controller = GetController();
        feedbackService.GetNoOfInquiryByFeedbackIdAsync(1).Returns(feedback);

        // Act
        var result = await controller.GetNoOfInquiryByFeedbackId(1);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<EditNoOfInquiry>(jsonResult.Value);
        Assert.Equal(feedback, actual);
    }

    [Fact]
    public async Task EditNoOfInquiry_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var command = new EditNoOfInquiryCommand();
        var commandResult = fixture.Create<CommandResult>();
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        feedbackService.EditNoOfInquiryAsync(Arg.Do<EditNoOfInquiryCommand>(x => command = x)).Returns(commandResult);

        // Act
        var result = await controller.EditNoOfInquiry(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(commandResult, actual);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
    }

    [Fact]
    public async Task GetCustomerFeedbackById_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var extentions = new List<SettingRelation>
        {
            new() { Id = 1, IsActive = true },
            new() { Id = 2, IsActive = false },
            new() { Id = 2022, IsActive = true }
        };
        var communicationTools = new List<Setting>
        {
            new() { Id = 1, IsActive = true },
            new() { Id = 2, IsActive = false },
            new() { Id = 1005, IsActive = true }
        };
        var statuses = new List<FeedbackStatus>
        {
            new() { StatusId = 1, Name = "Pending", IsActive = false },
            new() { StatusId = 2, Name = "Closed", IsActive = true },
            new() { StatusId = 11004, Name = "Deleted" }
        };
        var responses = new List<SettingRelation>
        {
            new() { Id = 1, IsActive = false },
            new() { Id = 2, IsActive = true },
            new() { Id = 3, IsActive = false }
        };
        var languages = new List<Language>
        {
            new() { LanguageId = 1, IsActive = false },
            new() { LanguageId = 2, IsActive = true },
            new() { LanguageId = 3, IsActive = false }
        };
        var countries = new List<Country>
        {
            new() { Id = 1, IsActive = false },
            new() { Id = 2, IsActive = true },
            new() { Id = 3, IsActive = false }
        };
        var mainCategories = new List<Setting> { new() { Id = 1 } };
        var subCategories = new List<Setting> { new() { Id = 1 } };
        var products = new List<Product> { new() { Id = 1 }, new() { Id = 46004, IsActive = true } };
        var subProducts = new List<Product> { new() { Id = 1 }, new() { Id = 8063, IsActive = true } };
        var bettypes = new List<Product> { new() { Id = 1 }, new() { Id = 9144, IsActive = true } };
        var roles = new List<SettingRelation>
        {
            new() { Id = 1, IsActive = false },
            new() { Id = 2, IsActive = true },
            new() { Id = 3, IsActive = false }
        };
        var titles = fixture.Create<IEnumerable<SettingRelation>>();
        var licenseeTypes = fixture.Create<IEnumerable<BaseModel>>();
        var feedback = new CustomerFeedback
        {
            ResponseId = 1,
            LanguageId = 1,
            StatusId = 1,
            RoleId = 1,
            CountryId = 1,
            Settings = new List<FeedbackSettingRelation>
            {
                new() { SettingId = 1, SettingType = "Station" },
                new() { SettingId = 2, SettingType = "Station" },
                new() { SettingId = 2022, SettingType = "Station" },
                new() { SettingId = 1, SettingType = "Communication" },
                new() { SettingId = 2, SettingType = "Communication" },
                new() { SettingId = 1005, SettingType = "Communication" }
            }
        };
        var controller = GetController();
        feedbackService.GetCustomerFeedbackByIdAsync(1).Returns(feedback);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.DeleteFeedback, Policy.Host).Returns(true);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension).Returns(extentions);
        settingService.GetCommunicationToolAsync(isIncludeNA: true).Returns(communicationTools);
        settingService.GetMainCategoryAsync().Returns(mainCategories);
        settingService.GetSubCategoryAsync().Returns(subCategories);
        settingService.GetProductAsync().Returns(products);
        settingService.GetSubProductAsync().Returns(subProducts);
        settingService.GetBetTypeAsync().Returns(bettypes);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response).Returns(responses);
        settingService.GetLanguageAsync(isIncludeNA: true).Returns(languages);
        settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role).Returns(roles);
        settingService.GetCountryAsync(isIncludeNA: true).Returns(countries);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active).Returns(titles);
        settingService.GetLicenseeTypeAsync().Returns(licenseeTypes);

        // Act
        var result = await controller.GetCustomerFeedbackById(1);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actualFeedback = (CustomerFeedback)jsonResult.Value.GetType().GetProperty("feedback").GetValue(jsonResult.Value);
        var settings = (CreateFeedbackViewModel)jsonResult.Value.GetType().GetProperty("settings").GetValue(jsonResult.Value);
        var hasReviewFeedbackPermission = (bool)jsonResult.Value.GetType().GetProperty("hasReviewFeedbackPermission").GetValue(jsonResult.Value);
        Assert.Equal(feedback, actualFeedback);
        Assert.True(hasReviewFeedbackPermission);

        Assert.Equal(2, settings.Extensions.Count());
        Assert.Collection(settings.Extensions,
            item => Assert.Equal(extentions[0], item),
            item => Assert.Equal(extentions[1], item));
        Assert.Equal(extentions[2], settings.ExtensionNA);

        Assert.Equal(2, settings.CommunicationTools.Count());
        Assert.Collection(settings.CommunicationTools,
            item => Assert.Equal(communicationTools[0], item),
            item => Assert.Equal(communicationTools[1], item));
        Assert.Equal(communicationTools[2], settings.CommunicationToolNA);

        Assert.Equal(2, settings.Responses.Count());
        Assert.Collection(settings.Responses,
            item => Assert.Equal(responses[0], item),
            item => Assert.Equal(responses[1], item));

        Assert.Equal(2, settings.Languages.Count());
        Assert.Collection(settings.Languages,
            item => Assert.Equal(languages[0], item),
            item => Assert.Equal(languages[1], item));

        Assert.Equal(3, settings.Statuses.Count());
        Assert.Collection(settings.Statuses,
            item => Assert.Equal(statuses[0], item),
            item => Assert.Equal(statuses[1], item),
            item => Assert.Equal(statuses[2], item));

        Assert.Equal(2, settings.Roles.Count());
        Assert.Collection(settings.Roles,
            item => Assert.Equal(roles[0], item),
            item => Assert.Equal(roles[1], item));

        Assert.Equal(2, settings.Countries.Count());
        Assert.Collection(settings.Countries,
            item => Assert.Equal(countries[0], item),
            item => Assert.Equal(countries[1], item));

        Assert.Equal(titles, settings.Titles);
        Assert.Equal(licenseeTypes, settings.LicenseeTypes);

        Assert.Equal(products[1], settings.ProductNA);
        Assert.Equal(subProducts[1], settings.SubProductNA);
        Assert.Equal(bettypes[1], settings.BettypeNA);
        Assert.Equal(extentions[2], settings.ExtensionNA);
        Assert.Equal(communicationTools[2], settings.CommunicationToolNA);
    }

    [Fact]
    public async Task GetCustomerFeedbackById_WhenFeedbackIsNull_ReturnsExpectedResult()
    {
        // Arrange
        var controller = GetController();
        var customer = new CustomerFeedback
        {
            CustId = 10,
            RelatedCustomers = [new RelatedCustomerPermission { CustId = 10, IsAuthorized = true, IsCredit = true }],
            CustomerType = SiteType.Credit
        };
        customerService.GetSiteTypeByCustIdAsync(customer.CustId).Returns(new CustomerFeedback { CustomerType = SiteType.Credit });
        feedbackService.GetCustomerFeedbackByIdAsync(Arg.Any<int>()).Returns(customer);

        // Act
        var result = await controller.GetCustomerFeedbackById(1);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = jsonResult.Value;
        Assert.NotNull(actual);
    }

    #region EditCustomerFeedback

    [Fact]
    public async Task EditCustomerFeedback_DoNotHaveEditPermission_ReturnAsExpectedResult()
    {
        // Arrange
        var command = fixture.Create<EditCustomerFeedbackCommand>();
        var controller = GetController();
        userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedback, Policy.Host).Returns(false);

        // Act
        var result = await controller.EditCustomerOldFeedback(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(1, commandResult.Code);
        Assert.Equal("You don't have permission to delete feedback.", commandResult.Message);
    }

    [Fact]
    public async Task EditCustomerFeedback_DoNotHaveReviewPermission_ReturnAsExpectedResult()
    {
        // Arrange
        var command = new EditCustomerFeedbackCommand { UpdateReviewedMode = 1 };
        var controller = GetController();
        userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedback, Policy.Host).Returns(true);
        userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host).Returns(false);

        // Act
        var result = await controller.EditCustomerOldFeedback(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(1, commandResult.Code);
        Assert.Equal("You don't have permission to review feedback.", commandResult.Message);
    }

    [Fact]
    public async Task EditCustomerFeedback_IsReviewed_ReturnAsExpectedResult()
    {
        // Arrange
        var commandResult = fixture.Create<CommandResult>();
        var command = new EditCustomerFeedbackCommand { IsReviewed = true, Review = "review" };
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit).Returns(true);
        feedbackService.EditCustomerFeedbackAsync(Arg.Do<EditCustomerFeedbackCommand>(x => command = x)).Returns(commandResult);

        // Act
        var result = await controller.EditCustomerOldFeedback(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(commandResult, actual);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
        Assert.Equal(napSession.UserId, command.ReviewerId);
        Assert.NotEmpty(command.Review);
    }

    [Fact]
    public async Task EditCustomerFeedback_NotReview_ReturnAsExpectedResult()
    {
        // Arrange
        var commandResult = fixture.Create<CommandResult>();
        var command = new EditCustomerFeedbackCommand { Review = "review" };
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit).Returns(true);
        feedbackService.EditCustomerFeedbackAsync(Arg.Do<EditCustomerFeedbackCommand>(x => command = x)).Returns(commandResult);

        // Act
        var result = await controller.EditCustomerOldFeedback(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(commandResult, actual);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
        Assert.Empty(command.Review);
    }

    #endregion EditCustomerFeedback

    [Fact]
    public async Task CheckFeedbackDuplication_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var param = new CheckFeedbackDuplicationCriteria { CustomerId = 0 };
        var controller = GetController();
        // Act
        var result = await controller.CheckFeedbackDuplication(param);

        // Assert
        Assert.Equal(0, result);
    }

    [Fact]
    public async Task EditCustomerNewManualFeedback_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var command = fixture.Create<EditCustomerNewManualFeedbackCommand>();
        command.StatusID = 11004;
        var commandResult = fixture.Create<CommandResult>();
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit).Returns(true);
        feedbackService.EditCustomerNewManualFeedbackAsync(Arg.Do<EditCustomerNewManualFeedbackCommand>(x => command = x)).Returns(commandResult);

        // Act
        var result = await controller.EditCustomerNewManualFeedback(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(commandResult, actual);
        Assert.Equal(napSession.UserId, command.UserID);
        Assert.Equal("1.0.0.0", command.IP);
    }

    [Fact]
    public async Task GetTicketInfoByRefNo_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var ticketInfo = fixture.Create<TicketInfo>();
        ticketInfo.ErrorCode = "0";
        var controller = GetController();
        ticketRefService.GetTicketByRefNoAsync(Arg.Any<long>()).Returns(ticketInfo);

        // Act
        var result = await controller.GetTicketInfoByRefNo(12345);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<TicketInfo>(jsonResult.Value);
        Assert.Equal(ticketInfo, actual);
        Assert.Contains("This is an auto-generated entry.", actual.Description);
    }

    [Fact]
    public async Task GetBalanceUpday_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var balanceDay = fixture.Create<DateTime>();
        var controller = GetController();
        ticketRefService.GetBalanceUpdayAsync().Returns(balanceDay);

        // Act
        var result = await controller.GetBalanceUpday();

        // Assert
        Assert.Equal(balanceDay.ToString("MM/dd/yyyy"), result);
    }

    #region Helpers

    private FeedbackController GetController()
    {
        napSession = Substitute.For<INapSession>();
        napSettings = Substitute.For<INapSettings>();
        userService = Substitute.For<IUserService>();
        settingService = Substitute.For<ISettingService>();
        feedbackService = Substitute.For<IFeedbackService>();
        ticketRefService = Substitute.For<ITicketRefService>();
        logService = Substitute.For<ICRMLogService>();
        permissionService = Substitute.For<IPermissionService>();
        customerService = Substitute.For<ICustomerService>();
        baseService = Substitute.For<IBaseService>();
        return new FeedbackController(napSession, settingService, feedbackService, ticketRefService, logService, permissionService, customerService, baseService);
    }

    #endregion Helpers
}