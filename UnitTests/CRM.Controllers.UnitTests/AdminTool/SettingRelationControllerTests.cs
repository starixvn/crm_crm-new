namespace CRM.Controllers.UnitTests.AdminTool;

using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Controllers.AdminTool;
using CRM.Criteria.AdminTool;
using CRM.Criteria.Setting;
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

public class SettingRelationControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ISettingService settingService;
    private INapSession napSession;

    [Fact]
    public async Task GetMainSettings_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var allSettings = new List<Setting>
        {
            new()
            {
                SettingId = 1,
                SettingName = "Site",
                DisplayOrder = 10,
                SettingValue = "value"
            }
        };
        var expected = new List<Setting> {
            new()
            {
                SettingName = "Site",
                ChildSettings = allSettings
            }
        };
        var controller = GetController();
        settingService.GetMainSettingAsync().Returns(allSettings);

        // Act
        var result = await controller.GetMainSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var convertJsonResult = (IEnumerable<Setting>)jsonResult.Value;
        Assert.Equal(expected[0].SettingName, convertJsonResult.FirstOrDefault().SettingName);
        Assert.Equal(expected[0].ChildSettings.FirstOrDefault().ChildSettings, convertJsonResult.FirstOrDefault().ChildSettings);
    }

    [Fact]
    public async Task GetSettingByType_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var model = fixture.Create<SettingTypeViewModel>();
        var settingByTypes = new List<Setting>
        {
            new()
            {
                SettingId = 1,
                SettingName = "Site",
                DisplayOrder = 10,
                SettingValue = "value"
            }
        };

        var controller = GetController();
        settingService.GetSettingByTypes(model.SettingName).Returns(settingByTypes);

        // Act
        var result = await controller.GetSettingByType(model);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.Equal(settingByTypes, jsonResult.Value);
    }

    [Fact]
    public async Task GetMainSettingRelation_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<GetSettingRelationByNameCriteria>();
        var mainRelations = fixture.Create<IEnumerable<SettingRelation>>();

        var controller = GetController();
        settingService.GetMainSettingRelationAsync(criteria).Returns(mainRelations);

        // Act
        var result = await controller.GetMainSettingRelation(criteria);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.Equal(mainRelations, jsonResult.Value);
    }

    [Fact]
    public async Task Update_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var commandResult = fixture.Create<CommandResult>();
        var command = fixture.Create<UpdateSettingRelationCommand>();
        var controller = GetController();
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        baseService.ExecuteNonQueryAsync(Arg.Do<UpdateSettingRelationCommand>(x => command = x)).Returns(commandResult);

        // Act
        var result = await controller.Update(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(commandResult, actual);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.Ip);
    }

    private SettingRelationController GetController()
    {
        baseService = Substitute.For<IBaseService>();
        settingService = Substitute.For<ISettingService>();
        napSession = Substitute.For<INapSession>();
        return new SettingRelationController(baseService, settingService, napSession);
    }
}