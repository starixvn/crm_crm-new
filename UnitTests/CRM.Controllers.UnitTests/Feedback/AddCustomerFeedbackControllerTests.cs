namespace CRM.Controllers.UnitTests.Feedback;

using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Feedback;
using CRM.Criteria.Feedback.AddFeedback;
using CRM.Models;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using CRM.ViewModels.Feedback;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NSubstitute;
using Services.Interfaces;
using Xunit;
using static Fanex.NAP.Client.Helpers.Business.Constant;

public class AddCustomerFeedbackControllerTests
{
    private INapSession napSession;
    private ISettingService settingService;
    private IBaseService baseService;
    private ICommonService commonService;
    private ICRMLogService logService;
    private IPermissionService permissionService;

    private readonly Fixture fixture = new();

    #region Helpers

    private AddCustomerFeedbackController GetController()
    {
        napSession = Substitute.For<INapSession>();
        settingService = Substitute.For<ISettingService>();
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();
        logService = Substitute.For<ICRMLogService>();
        permissionService = Substitute.For<IPermissionService>();
        return new AddCustomerFeedbackController(napSession, settingService, baseService, commonService, logService, permissionService);
    }

    [Fact]
    public async Task AllSetting_WhenCalled_ReturnExpectedSettings()
    {
        // Arrange
        var controller = GetController();
        var settings = new CreateFeedbackViewModel
        {
            Extensions = fixture.Create<IEnumerable<SettingRelation>>(),
            Countries = fixture.Create<IEnumerable<Country>>(),
            CommunicationTools = new List<Setting> { new()
            { Id = 1, Name = "CommunicationTools", ChildSettings =
                []
            } },
            Languages = fixture.Create<IEnumerable<Language>>(),
            MainCategories = new List<Setting> { new() { Id = 1, Name = "MainCategories", ChildSettings = [] } },
            SubCategories = new List<Setting> { new() { Id = 1, Name = "SubCategories", ChildSettings = [] } },
            Products = new List<Product> { new() { Id = 1, Name = "Products", ParentId = 2, ChildSettings = new List<Product>() } },
            SubProducts = new List<Product> { new() { Id = 1, Name = "SubProducts", ParentId = 2, ChildSettings = new List<Product>() } },
            Bettypes = new List<Product> { new() { Id = 1, Name = "Bettypes", ParentId = 2, ChildSettings = new List<Product>() } },
            Responses = fixture.Create<IEnumerable<SettingRelation>>(),
            Statuses = fixture.Create<IEnumerable<FeedbackStatus>>(),
            Titles = fixture.Create<IEnumerable<SettingRelation>>(),
            Roles = fixture.Create<IEnumerable<SettingRelation>>(),
            LicenseeTypes = fixture.Create<IEnumerable<BaseModel>>()
        };

        settingService.GetLanguageAsync(SettingConstants.Active, true).Returns(settings.Languages);
        settingService.GetCountryAsync(SettingConstants.Active, true).Returns(settings.Countries);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(settings.Extensions);
        settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(settings.Statuses);
        settingService.GetCommunicationToolAsync(SettingConstants.Active).Returns(settings.CommunicationTools);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(settings.Responses);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active).Returns(settings.Titles);
        settingService.GetLicenseeTypeAsync().Returns(settings.LicenseeTypes);
        settingService.GetProductAsync(SettingConstants.Active).Returns(settings.Products);
        settingService.GetSubProductAsync(active: SettingConstants.Active).Returns(settings.SubProducts);
        settingService.GetBetTypeAsync(active: SettingConstants.Active).Returns(settings.Bettypes);
        settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(settings.MainCategories);
        settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(settings.SubCategories);

        // Act
        var result = await controller.AllSetting();
        var jsonResult = Assert.IsType<JsonResult>(result);
        var viewModel = Assert.IsAssignableFrom<CreateFeedbackViewModel>(jsonResult.Value);

        // Assert
        Assert.Equal(settings.Extensions, viewModel.Extensions);
        Assert.Equal(settings.Countries, viewModel.Countries);
        Assert.Equal(settings.CommunicationTools, viewModel.CommunicationTools);
        Assert.Equal(settings.Languages, viewModel.Languages);
        Assert.Equal(settings.MainCategories, viewModel.MainCategories);
        Assert.Equal(settings.SubCategories, viewModel.SubCategories);
        Assert.Equal(settings.Products, viewModel.Products);
        Assert.Equal(settings.SubProducts, viewModel.SubProducts);
        Assert.Equal(settings.Bettypes, viewModel.Bettypes);
        Assert.Equal(settings.Sites, viewModel.Sites);
        Assert.Equal(settings.Responses, viewModel.Responses);
        Assert.Equal(settings.Statuses, viewModel.Statuses);
        Assert.Equal(settings.Titles, viewModel.Titles);
        Assert.Equal(settings.LicenseeTypes, viewModel.LicenseeTypes);
        Assert.Equal(settings.ProductNA, viewModel.ProductNA);
        Assert.Equal(settings.SubProductNA, viewModel.SubProductNA);
        Assert.Equal(settings.BettypeNA, viewModel.BettypeNA);
        Assert.Equal(settings.ExtensionNA, viewModel.ExtensionNA);
    }

    [Fact]
    public async Task Create_HasPersmission_ExpectedCommandResult()
    {
        // Arrange
        var controller = GetController();
        permissionService.IsHavingPermissionByPolicyAsync(Arg.Any<string>(), Policy.Read).Returns(true);
        var expectedDate = new DateTime();
        commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(expectedDate);
        var command = fixture.Create<AddCustomerFeedbackCommand>();
        var clientIP = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(123456)
            }
        };

        controller.ControllerContext.HttpContext = clientIP;
        var commandResult = fixture.Create<CommandResult>();
        baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

        // Act
        var result = await controller.Create(command) as JsonResult;

        // Assert
        var actualCommandResult = (CommandResult)result.Value;
        Assert.Equal(commandResult, actualCommandResult);
    }

    [Fact]
    public async Task Create_DoNotHavePersmission_ExpectedCommandResult()
    {
        // Arrange
        var controller = GetController();
        permissionService.IsHavingPermissionByPolicyAsync(Arg.Any<string>(), Policy.Host).Returns(false);
        var expectCommandResult = new CommandResult
        {
            Code = 1,
            Message = ViewResources.DoNotEditFeedbackPermission
        };
        var command = fixture.Create<AddCustomerFeedbackCommand>();

        // Act
        var result = await controller.Create(command) as JsonResult;

        // Assert
        var actualCommandResult = (CommandResult)result.Value;
        Assert.Equal(JsonConvert.SerializeObject(expectCommandResult), JsonConvert.SerializeObject(actualCommandResult));
    }

    #endregion Helpers
}