namespace CRM.Controllers.UnitTests.AdminTool;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using Controllers.AdminTool;
using CRM.Criteria.Customer;
using CRM.Models.AdminTool.CommunicationToolSetting;
using CRM.Models.Customer;
using CRM.Models.Setting;
using CRM.Services.Customer;
using Microsoft.AspNetCore.Mvc;
using Models;
using NSubstitute;
using Services.AdminTool;
using Services.Interfaces;
using Xunit;

public class CommunicationSettingControllerTests : Controller

{
    private ISettingService settingService;
    private ICommunicationToolSettingService communicationToolService;
    private ICustomerService customerService;

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnExpectedDataAsync()
    {
        //Arrange
        var communicationTools = new List<Setting>
        {
            new() {Id = 1, Name = "test"}
        };
        var mainCategories = new List<Setting>
        {
            new() {Id = 1, Name = "test"}
        };
        var subCategories = new List<Setting>
        {
            new() {Id = 1, Name = "test"}
        };
        var controller = GetController();
        settingService.GetCommunicationToolAsync(SettingConstants.Active).Returns(communicationTools);
        settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
        settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategories);

        // Act
        var result = await controller.GetAllSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var communicationToolsJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("CommunicationTools").GetValue(jsonResult.Value);
        var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("MainCategories").GetValue(jsonResult.Value);
        var subCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("SubCategories").GetValue(jsonResult.Value);

        Assert.Equal(communicationTools, communicationToolsJson);
        Assert.Equal(mainCategories, mainCategoriesJson);
        Assert.Equal(subCategories, subCategoriesJson);
    }

    [Fact]
    public async Task GetCommunicationToolSetting_WhenCalled_ReturnExpectedDataAsync()
    {
        // Arrange
        var fixture = new Fixture();
        var communications = fixture.Create<IEnumerable<CommunicationToolSetting>>();
        var param = fixture.Create<GetGridDataParam>();
        var controller = GetController();
        communicationToolService.GetAllAsync(param).Returns(communications);

        // Act
        var result = await controller.GetCommunicationToolSetting(param);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var communicationSettings = (IEnumerable<CommunicationToolSetting>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
        Assert.Equal(communications, communicationSettings);
        Assert.Equal(param.TotalRows, totalItems);
    }

    [Fact]
    public async Task GetById_CommunicationToolIsNotExist_ReturnNotFound()
    {
        // Arrange
        var fixture = new Fixture();
        CommunicationToolSetting communicationTool = null;
        var id = fixture.Create<int>();
        var controller = GetController();
        communicationToolService.GetByIdAsync(id).Returns(communicationTool);

        // Act
        var result = await controller.GetById(id);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task GetById__CommunicationToolIsExist_ReturnExpectedData()
    {
        // Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommunicationToolSetting>();
        var id = fixture.Create<int>();
        var controller = GetController();
        communicationToolService.GetByIdAsync(id).Returns(expected);

        // Act
        var result = await controller.GetById(id);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var template = Assert.IsAssignableFrom<CommunicationToolSetting>(jsonResult.Value);
        Assert.Equal(expected, template);
    }

    [Fact]
    public async Task Create_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<CreateCommunicationToolSetting>();
        var controller = GetController();
        communicationToolService.CreateAsync(model).Returns(expected);

        // Act
        var result = await controller.Create(model);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, commandResult);
    }

    [Fact]
    public async Task Edit_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<EditCommunicationToolSetting>();
        var controller = GetController();
        communicationToolService.EditAsync(model).Returns(expected);
        communicationToolService.GetByIdAsync(model.DefaultCommId).Returns(new CommunicationToolSetting { Username = "abc" });
        customerService.GetCustomerInfoAsync(Arg.Any<GetCustomerInfoByUsernameCriteria>())
            .Returns(new CustomerInfoDetails { CustId = 1 });
        customerService.HasHostPermissionOnCustIdAsync(1).Returns(true);

        // Act
        var result = await controller.Edit(model);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, commandResult);
    }

    [Fact]
    public async Task Delete_WhenCalled__NoPermissionOnUsername_ReturnExpectedData()
    {
        // Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var id = fixture.Create<int>();
        var controller = GetController();
        communicationToolService.DeleteAsync(id).Returns(expected);

        // Act
        var result = await controller.Delete(id);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(1, commandResult.Code);
        Assert.Equal("No Permission", commandResult.Message);
    }

    [Fact]
    public async Task Delete_WhenCalled__HavePermissionOnUsername_ReturnExpectedData()
    {
        // Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var id = fixture.Create<int>();
        var controller = GetController();
        communicationToolService.DeleteAsync(id).Returns(expected);
        communicationToolService.GetByIdAsync(id).Returns(new CommunicationToolSetting { Username = "abc" });
        customerService.GetCustomerInfoAsync(Arg.Any<GetCustomerInfoByUsernameCriteria>())
            .Returns(new CustomerInfoDetails { CustId = 1 });
        customerService.HasHostPermissionOnCustIdAsync(1).Returns(true);

        // Act
        var result = await controller.Delete(id);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, commandResult);
    }

    #region Helpers

    private CommunicationSettingController GetController()
    {
        communicationToolService = Substitute.For<ICommunicationToolSettingService>();
        settingService = Substitute.For<ISettingService>();
        customerService = Substitute.For<ICustomerService>();
        return new CommunicationSettingController(settingService, communicationToolService, customerService);
    }

    #endregion Helpers
}