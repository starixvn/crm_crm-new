
namespace CRM.Controllers.UnitTests.AdminTool;

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Controllers.AdminTool;
using CRM.Criteria.AdminTool.SettingManagement;
using CRM.Models.AdminTool;
using CRM.Models.Setting;
using CRM.Services;
using CRM.ViewModels;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using NSubstitute;
using Services.Interfaces;
using Xunit;

public class SettingManagementControllerTests
{
    private IBaseService baseService;
    private ISettingService settingService;
    private INapSession napSession;
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public async Task GetMainSettings_WhenCalled_ReturnExpectedJson()
    {
        //Arrange
        var mainSetting = new List<Setting>
        {
            new() {Id = 1, Name = "test"}
        };
        var controller = GetController();
        settingService.GetMainSettingAsync().Returns(mainSetting);

        // Act
        var result = await controller.GetMainSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var settingsResult = jsonResult.Value;
        Assert.Equal(settingsResult, mainSetting);
    }

    [Fact]
    public async Task GetParentSettings_WhenCalled_ReturnExpectedJson()
    {
        //Arrange
        var parents = new List<Setting>
        {
            new() {Id = 1, Name = "test"}
        };
        var controller = GetController();
        settingService.GetSettingAsync().Returns(parents);

        // Act
        var result = await controller.GetParentSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var settingsResult = jsonResult.Value;
        Assert.Equal(settingsResult, parents);
    }

    [Fact]
    public async Task GetLicensees_WhenCalled_ReturnExpectedJson()
    {
        //Arrange
        var criteria = fixture.Create<GetLicenseeCriteria>();
        var expected = fixture.Create<IEnumerable<string>>();
        var controller = GetController();
        baseService.GetDataAsync<string>(Arg.Do<GetLicenseeCriteria>(x => criteria = x)).Returns(expected);

        // Act
        var result = await controller.GetLicensees();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var settingsResult = jsonResult.Value;
        Assert.Equal(settingsResult, expected);
    }

    [Fact]
    public async Task GetLicenseesMapping_WhenCalled_ReturnExpectedJson()
    {
        //Arrange
        var criteria = fixture.Create<GetLicenseeMappingCriteria>();
        var licenseesMapping = fixture.Create<IEnumerable<LicenseeMapping>>();
        var controller = GetController();
        baseService.GetDataAsync<LicenseeMapping>(Arg.Do<GetLicenseeMappingCriteria>(x => criteria = x)).Returns(licenseesMapping);

        // Act
        var result = await controller.GetLicenseesMapping(criteria);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var settingsResult = jsonResult.Value;
        Assert.Equal(settingsResult, licenseesMapping);
    }

    [Fact]
    public async Task GetLicenseeManager_WhenCalled_ReturnExpectedJson()
    {
        //Arrange
        var criteria = fixture.Create<GetLicenseeManagerCriteria>();
        var licenseeManagers = fixture.Create<IEnumerable<LicenseeManager>>();
        var controller = GetController();
        baseService.GetDataAsync<LicenseeManager>(Arg.Do<GetLicenseeManagerCriteria>(x => criteria = x)).Returns(licenseeManagers);

        // Act
        var result = await controller.GetLicenseeManager(criteria);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var settingsResult = jsonResult.Value;
        Assert.Equal(settingsResult, licenseeManagers);
    }

    [Fact]
    public async Task GetSettingByType_WhenCalled_ReturnExpectedJson()
    {
        //Arrange
        var settingByTypes = new List<Setting>
        {
            new() {Id = 1, Name = "test"}
        };
        var settingType = fixture.Create<SettingTypeViewModel>();
        var controller = GetController();
        settingService.GetSettingByTypes(settingType.SettingName).Returns(settingByTypes);

        // Act
        var result = await controller.GetSettingByType(settingType);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var settingsResult = jsonResult.Value;
        Assert.Equal(settingsResult, settingByTypes);
    }

    [Fact]
    public async Task EditStatusSetting_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var expected = fixture.Create<CommandResult>();
        var command = fixture.Create<EditStatusCommand>();
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        baseService.ExecuteNonQueryAsync(command).Returns(expected);

        // Act
        var result = await controller.EditStatusSetting(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, actual);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
    }

    [Fact]
    public async Task InsertNewSetting_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var expected = fixture.Create<CommandResult>();
        var command = fixture.Create<AddNewSettingCommand>();
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        baseService.ExecuteNonQueryAsync(command).Returns(expected);

        // Act
        var result = await controller.InsertNewSetting(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, actual);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
    }

    [Fact]
    public async Task EditNewSetting_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var expected = fixture.Create<CommandResult>();
        var command = fixture.Create<EditNewSettingCommand>();
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        baseService.ExecuteNonQueryAsync(command).Returns(expected);

        // Act
        var result = await controller.EditNewSetting(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, actual);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
    }

    [Fact]
    public async Task EditLicenseeMapping_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var expected = fixture.Create<CommandResult>();
        var command = fixture.Create<EditLicenseeMappingCommand>();
        var controller = GetController();
        baseService.ExecuteNonQueryAsync(command).Returns(expected);

        // Act
        var result = await controller.EditLicenseeMapping(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, actual);
        Assert.Equal(napSession.UserId, command.UserId);
    }

    private SettingManagementController GetController()
    {
        baseService = Substitute.For<IBaseService>();
        settingService = Substitute.For<ISettingService>();
        napSession = Substitute.For<INapSession>();
        return new SettingManagementController(baseService, settingService, napSession);
    }
}