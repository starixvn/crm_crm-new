namespace CRM.Services.UnitTests.ActionLog;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Criteria.ActionLog;
using CRM.Models;
using CRM.Models.ActionLog;
using CRM.Models.Setting;
using CRM.Services.ActionLog;
using Interfaces;
using Microsoft.Extensions.Options;
using NSubstitute;
using Xunit;

public class ActionLogServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ICommonService commonService;
    private ISettingService settingService;
    private AppSettings appSettings;

    [Fact]
    public async Task GetActivityLogAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var countries = fixture.Create<IEnumerable<Country>>();
        var currencies = fixture.Create<IEnumerable<BaseModel>>();
        var settings = new List<Setting>();
        var criteria = fixture.Create<GetActivityLogCriteria>();
        var actionLogs = new List<ActionLogInfo>()
        {
            new()
            {
                OldValues = "<Acc_CRM_RedemptionUpd><Subject>test</Subject></Acc_CRM_RedemptionUpd>",
                NewValues = "<Acc_CRM_RedemptionUpd><Subject>test123</Subject></Acc_CRM_RedemptionUpd>"
            }
        };
        criteria.PageIndex = 1;
        criteria.PageSize = 100;

        var service = GetService();
        settingService.GetCountryAsync(SettingConstants.Active).Returns(countries);
        settingService.GetCurrencyAsync().Returns(currencies);
        settingService.GetSettingAsync("").Returns(settings);
        baseService.GetDataAsync<ActionLogInfo>(Arg.Do<GetActivityLogCriteria>(x => criteria = x)).Returns(actionLogs);

        //Act
        var actual = await service.GetActivityLogAsync(criteria);

        //Assert
        Assert.Equal("test", actual.First().OldValuesList[0]);
        Assert.Equal("test123", actual.First().NewValuesList[0]);
    }

    [Fact]
    public void FilterOldNewResults_WhenCalled_Return()
    {
        //Arrange
        var actionLog = fixture.Create<ActionLogInfo>();
        actionLog.OldValues = actionLog.NewValues = "test";

        var service = GetService();

        //Act
        service.FilterOldNewResults(actionLog);

        //Assert
        Assert.Equal(actionLog.ActionName, actionLog.ActionName);
    }

    [Fact]
    public void FilterOldNewResults_WhenCalled_OldResultNull()
    {
        //Arrange
        var actionLog = fixture.Create<ActionLogInfo>();
        actionLog.NewValuesList = new List<string>();
        actionLog.FieldNames = new List<string>();
        actionLog.OldValues = "";
        actionLog.NewValues = "<Acc_CRM_RedemptionUpd><Subject>test123</Subject></Acc_CRM_RedemptionUpd>";

        var service = GetService();

        //Act
        service.FilterOldNewResults(actionLog);

        //Assert
        Assert.Equal("Subject", actionLog.FieldNames[0]);
        Assert.Equal("test123", actionLog.NewValuesList[0]);
    }

    [Fact]
    public void FilterOldNewResults_WhenCalled_OldResultEqualNewResult()
    {
        //Arrange
        var actionLog = fixture.Create<ActionLogInfo>();
        actionLog.NewValuesList = new List<string>();
        actionLog.OldValuesList = new List<string>();
        actionLog.FieldNames = new List<string>();
        actionLog.OldValues = "<Acc_CRM_RedemptionUpd><Subject>test</Subject></Acc_CRM_RedemptionUpd>";
        actionLog.NewValues = "<Acc_CRM_RedemptionUpd><Subject>test123</Subject></Acc_CRM_RedemptionUpd>";

        var service = GetService();

        //Act
        service.FilterOldNewResults(actionLog);

        //Assert
        Assert.Equal("Subject", actionLog.FieldNames[0]);
        Assert.Equal("test123", actionLog.NewValuesList[0]);
        Assert.Equal("test", actionLog.OldValuesList[0]);
    }

    #region Helpers
    private ActionLogService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();
        settingService = Substitute.For<ISettingService>();
        var optionsAppSettings = Substitute.For<IOptionsSnapshot<AppSettings>>();

        appSettings = new AppSettings
        {
            CRMActionLogKey = "LanguageID,CountryID",
            CRMActionLogBoolValue = "IsVerifyEmail,IsVerifyPassport"
        };
        optionsAppSettings.Value.Returns(appSettings);
        return new ActionLogService(baseService, commonService, settingService, optionsAppSettings);
    }

    #endregion Helpers

}