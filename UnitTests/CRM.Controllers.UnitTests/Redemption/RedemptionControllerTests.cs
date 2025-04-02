namespace CRM.Controllers.UnitTests.Redemption;

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Redemption;
using CRM.Criteria.Redemption;
using CRM.Models;
using CRM.Models.Redemption;
using CRM.Models.Setting;
using CRM.Services;
using CRM.Services.Redemption;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.Interfaces;
using Xunit;

public class RedemptionControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private INapSession napSession;
    private IBaseService baseService;
    private ISettingService settingService;
    private IRedemptionService redemptionService;
        

    [Fact]
    public async Task GetLogsByCustomerId_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var logs = fixture.Create<IEnumerable<CustomerLogInfo>>();
        var criteria = fixture.Create<GetLogsByCustomerIdCriteria>();
        var controller = GetController();
        redemptionService.GetLogsByCustomerIdAsync(criteria).Returns(logs);

        // Act
        var result = await controller.GetLogsByCustomerId(criteria);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var redemptionLogs = jsonResult.Value;
        Assert.Equal(logs, redemptionLogs);
    }

    [Fact]
    public async Task GetAllStatus_WhenCalledWithParamTrue_ReturnAsExpectedResult()
    {
        // Arrange
        var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
        var currencies = fixture.Create<IEnumerable<BaseModel>>();
        var controller = GetController();
        settingService.GetStatusAsync(ViewTypeConstants.Redemption).Returns(statuses);
        settingService.GetCurrencyRedemptionAsync().Returns(currencies);

        // Act
        var result = await controller.GetAllStatus(true);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var statusResult = jsonResult.Value.GetType().GetProperty("statuses").GetValue(jsonResult.Value);
        var currenciesResult = jsonResult.Value.GetType().GetProperty("currencies").GetValue(jsonResult.Value);
        Assert.Equal(statusResult, statuses);
        Assert.Equal(currenciesResult, currencies);
    }

    [Fact]
    public async Task GetAllStatus_WhenCalledWithParamFalse_ReturnAsExpectedResult()
    {
        // Arrange
        var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
        var currencies = fixture.Create<IEnumerable<BaseModel>>();
        var controller = GetController();
        settingService.GetStatusAsync(ViewTypeConstants.Redemption).Returns(statuses);
        settingService.GetCurrencyRedemptionAsync().Returns(currencies);

        // Act
        var result = await controller.GetAllStatus(false);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var statusResult = jsonResult.Value.GetType().GetProperty("statuses").GetValue(jsonResult.Value);
        var currenciesResult = jsonResult.Value.GetType().GetProperty("currencies").GetValue(jsonResult.Value);
        Assert.Equal(statusResult, statuses);
        Assert.Equal(currenciesResult, currencies);
    }

    [Fact]
    public async Task GetLogById_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var log = fixture.Create<LogInfo>();
        var controller = GetController();
        redemptionService.GetLogByIdAsync(1).Returns(log);

        // Act
        var result = await controller.GetLogById(1);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var redemptionLog = jsonResult.Value;
        Assert.Equal(log, redemptionLog);
    }

    [Fact]
    public async Task EditRedemptionLog_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var command = fixture.Create<EditRedemptionLogCommand>();
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
        var result = await controller.EditRedemptionLog(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
        Assert.Equal(commandResult, actual);
    }

    [Fact]
    public async Task CreateRedemptionLog_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var command = fixture.Create<CreateRedemptionLogCommand>();
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
        var result = await controller.CreateRedemptionLog(command);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(napSession.UserId, command.UserId);
        Assert.Equal("1.0.0.0", command.IP);
        Assert.Equal(commandResult, actual);
    }

    #region Helpers

    private RedemptionController GetController()
    {
        napSession = Substitute.For<INapSession>();
        settingService = Substitute.For<ISettingService>();
        baseService = Substitute.For<IBaseService>();
        redemptionService = Substitute.For<IRedemptionService>();
        return new RedemptionController(napSession, redemptionService, settingService, baseService);
    }

    #endregion Helpers
}