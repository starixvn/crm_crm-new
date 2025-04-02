namespace CRM.Controllers.UnitTests.Communication;

using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Communication;
using CRM.Criteria.Communication;
using CRM.Criteria.Feedback.AddFeedback;
using CRM.Models;
using CRM.Models.CommunicationLogs;
using CRM.Models.Setting;
using CRM.Services;
using CRM.Services.Communication;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.Interfaces;
using Xunit;
using static Fanex.NAP.Client.Helpers.Business.Constant;

public class CommunicationLogControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private INapSession napSession;
    private IBaseService baseService;
    private ISettingService settingService;
    private ICommunicationService communicationService;
    private ICommonService commonService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetLogsByCustomerId_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var logs = fixture.Create<IEnumerable<CommunicationLog>>();
        var param = fixture.Create<GetLogsByCustomerIdCriteria>();
        var controller = GetController();
        communicationService.GetLogsByCustomerIdAsync(param).Returns(logs);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.GetLogsByCustomerId(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var communicationLogs = (IEnumerable<CommunicationLog>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        Assert.Equal(logs, communicationLogs);
        Assert.Equal(mainCategories, categories);
    }

    [Fact]
    public async Task GetAllStatus_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
        var controller = GetController();
        settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);

        // Act
        var result = await controller.GetAllStatus(true);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var statusResult = jsonResult.Value;
        Assert.Equal(statusResult, statuses);
    }

    [Fact]
    public async Task GetLogByFeedbackId_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var log = fixture.Create<CommunicationLog>();
        var controller = GetController();
        communicationService.GetLogByFeedbackIdAsync(1, 1).Returns(log);

        // Act
        var result = await controller.GetLogByFeedbackId(1, 1);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var communicationLog = (CommunicationLog)jsonResult.Value.GetType().GetProperty("log").GetValue(jsonResult.Value);
        Assert.Equal(log, communicationLog);
    }

    #region EditCommunicationLog

    [Fact]
    public async Task EditCommunicationLog_DoNotHaveEditPermission_ReturnAsExpectedResult()
    {
        // Arrange
        var command = fixture.Create<EditCommunicationLogCommand>();
        var controller = GetController();
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback).Returns(false);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);

        // Act
        var result = await controller.EditCommunicationLog(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(1, commandResult.Code);
        Assert.Equal("You don't have permission to update.", commandResult.Message);
    }

    [Fact]
    public async Task EditCommunicationLog_DoNotHaveReviewPermission_ReturnAsExpectedResult()
    {
        // Arrange
        var command = new EditCommunicationLogCommand { UpdateReviewedMode = 1 };
        var controller = GetController();
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Read).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(false);

        // Act
        var result = await controller.EditCommunicationLog(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(1, commandResult.Code);
        Assert.Equal("You don't have permission to review feedback.", commandResult.Message);
    }

    [Fact]
    public async Task EditCommunicationLog_DoNotHaveDeletePermission_ReturnAsExpectedResult()
    {
        // Arrange
        var command = new EditCommunicationLogCommand { IsDeletedFeedbackView = false, StatusId = 11004 };
        var controller = GetController();
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Read).Returns(false);

        // Act
        var result = await controller.EditCommunicationLog(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(1, commandResult.Code);
        Assert.Equal("You don't have permission to delete.", commandResult.Message);
    }

    [Fact]
    public async Task EditCommunicationLog_IsReviewed_ReturnAsExpectedResult()
    {
        // Arrange
        var commandResult = new CommandResult { Code = 0 };
        var command = new EditCommunicationLogCommand { IsReviewed = true, Review = "review", UpdateReviewedMode = 1 };
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
        permissionService.IsHavingPermissionByPolicyAsync(Arg.Any<string>()).Returns(true);
        baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

        // Act
        var result = await controller.EditCommunicationLog(command);

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
    public async Task EditCommunicationLog_NotReview_ReturnAsExpectedResult()
    {
        // Arrange
        var commandResult = fixture.Create<CommandResult>();
        var command = new EditCommunicationLogCommand { Review = "review" };
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(Arg.Any<string>()).Returns(true);

        baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

        // Act
        var result = await controller.EditCommunicationLog(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(commandResult, actual);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
        Assert.Empty(command.Review);
    }

    #endregion EditCommunicationLog

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var extentions = fixture.Create<IEnumerable<SettingRelation>>();
        var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
        var communicationTools = new List<Setting> { new() { Id = 1 } };
        var languages = fixture.Create<IEnumerable<Language>>();
        var responses = fixture.Create<IEnumerable<SettingRelation>>();
        var roles = fixture.Create<IEnumerable<SettingRelation>>();
        var sites = new List<SiteInfo> { new() { IsLicensee = true } };
        var countries = fixture.Create<IEnumerable<Country>>();
        var mainCategories = new List<Setting> { new() { Id = 1 } };
        var subCategories = new List<Setting> { new() { Id = 1 } };
        var licenseeTypes = fixture.Create<IEnumerable<BaseModel>>();
        var bettypes = new List<Product> { new() { Id = 1 } };
        var products = new List<Product> { new() { Id = 1 } };
        var subProducts = new List<Product> { new() { Id = 1 } };

        var controller = GetController();
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extentions);
        settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
        settingService.GetCommunicationToolAsync(SettingConstants.Active).Returns(communicationTools);
        settingService.GetLanguageAsync(SettingConstants.Active, true).Returns(languages);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(responses);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role).Returns(roles);
        settingService.GetAllSitesWithGroupAsync().Returns(sites);
        settingService.GetCountryAsync(SettingConstants.Active, true).Returns(countries);
        settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
        settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategories);
        settingService.GetLicenseeTypeAsync().Returns(licenseeTypes);
        settingService.GetBetTypeAsync(active: SettingConstants.Active).Returns(bettypes);
        settingService.GetProductAsync(SettingConstants.Active).Returns(products);
        settingService.GetSubProductAsync(active: SettingConstants.Active).Returns(subProducts);

        // Act
        var result = await controller.GetAllSettings(true);

        // Assert
        Assert.Equal(extentions, result.Extensions);
        Assert.Equal(statuses, result.Statuses);
        Assert.Equal(communicationTools, result.CommunicationTools);
        Assert.Equal(languages, result.Languages);
        Assert.Equal(responses, result.Responses);
        Assert.Equal(roles.Where(x => x.IsActive), result.Roles);
        Assert.Equal(sites, result.Sites);
        Assert.Equal(countries, result.Countries);
        Assert.Equal(mainCategories, result.MainCategories);
        Assert.Equal(subCategories, result.SubCategories);
        Assert.Equal(licenseeTypes, result.LicenseeTypes);
        Assert.Equal(bettypes, result.Bettypes);
        Assert.Equal(products, result.Products);
        Assert.Equal(subProducts, result.SubProducts);
    }

    [Fact]
    public async Task CreateCommunicationLog_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var command = fixture.Create<AddCustomerFeedbackCommand>();
        var commandResult = fixture.Create<CommandResult>();
        var clientIP = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        var controller = GetController();
        controller.ControllerContext.HttpContext = clientIP;
        baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

        // Act
        var result = await controller.CreateCommunicationLog(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
        Assert.Equal(commandResult, actual);
    }

    #region Helpers

    private CommunicationLogController GetController()
    {
        napSession = Substitute.For<INapSession>();
        permissionService = Substitute.For<IPermissionService>();
        baseService = Substitute.For<IBaseService>();
        settingService = Substitute.For<ISettingService>();
        communicationService = Substitute.For<ICommunicationService>();
        commonService = Substitute.For<ICommonService>();
        return new CommunicationLogController(napSession, communicationService, settingService, baseService, commonService, permissionService);
    }

    #endregion Helpers
}