namespace CRM.Controllers.UnitTests.AdminTool;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Controllers.AdminTool;
using CRM.Criteria.AdminTool.LogSetting;
using CRM.Models;
using CRM.Models.AdminTool.SettingLog;
using CRM.Services.ActionLog;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.Interfaces;
using Xunit;

public class SettingLogControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ISettingService settingService;
    private IActionLogService actionLogService;


    [Fact]
    public async Task GetActionLog_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var logActions = fixture.Create<IEnumerable<BaseModel>>();
        var controller = GetController();
        settingService.GetAllLogActionAsync(2).Returns(logActions);

        // Act
        var result = await controller.GetActionLog();
        var jsonResult = Assert.IsType<JsonResult>(result);
        var allLogActions = jsonResult.Value;
        Assert.Equal(logActions, allLogActions);
    }

    [Fact]
    public async Task GetSettingLog_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<GetSettingLogCriteria>();
        var settingLogs = fixture.Create<IEnumerable<SettingLogInfo>>();
        var controller = GetController();
        criteria.PageIndex = 1;
        criteria.PageSize = 100;
        actionLogService.GetSettingLogsAsync(criteria).Returns(settingLogs);

        // Act
        var result = await controller.GetSettingLog(criteria);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var data = jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var totalItems = jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
        Assert.Equal(settingLogs, data);
        Assert.Equal(settingLogs.Count(), totalItems);
    }

    private SettingLogController GetController()
    {
        settingService = Substitute.For<ISettingService>();
        actionLogService = Substitute.For<IActionLogService>();
        return new SettingLogController(settingService, actionLogService);
    }
}