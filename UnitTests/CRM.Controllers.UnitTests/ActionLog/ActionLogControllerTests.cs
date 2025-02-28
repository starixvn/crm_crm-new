namespace CRM.Controllers.UnitTests.ActionLog;

using AutoFixture;
using CRM.Controllers.ActionLog;
using CRM.Criteria.ActionLog;
using CRM.Models;
using CRM.Models.ActionLog;
using CRM.Services.ActionLog;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

public class ActionLogControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ISettingService settingService;
    private IActionLogService actionLogService;

    [Fact]
    public async Task GetAllLogAction_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var logActions = fixture.Create<IEnumerable<BaseModel>>();
        var controller = GetController();
        settingService.GetAllLogActionAsync(1).Returns(logActions);

        // Act
        var result = await controller.GetAllLogAction(1);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var allLogActions = jsonResult.Value;
        Assert.Equal(logActions, allLogActions);
    }

    [Fact]
    public async Task GetActivityLog_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<GetActivityLogCriteria>();
        var actLogs = fixture.Create<IEnumerable<ActionLogInfo>>();
        var controller = GetController();
        criteria.PageIndex = 1;
        criteria.PageSize = 100;
        actionLogService.GetActivityLogAsync(criteria).Returns(actLogs);

        // Act
        var result = await controller.GetActivityLog(criteria);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var activityLogs = jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var countActLog = jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
        Assert.Equal(actLogs, activityLogs);
        Assert.Equal(actLogs.Count(), countActLog);
    }

    #region Helpers

    private ActionLogController GetController()
    {
        settingService = Substitute.For<ISettingService>();
        actionLogService = Substitute.For<IActionLogService>();
        return new ActionLogController(settingService, actionLogService);
    }

    #endregion Helpers
}