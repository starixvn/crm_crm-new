namespace CRM.Services.UnitTests.Dashboard;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Dashboard;
using CRM.Models.CommunicationLogs;
using CRM.Models.Dashboard;
using CRM.Models.Feedback;
using CRM.Models.Redemption;
using CRM.Services.Dashboard;
using Interfaces;
using Models;
using NSubstitute;
using Xunit;

public class DashboardServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ICommonService commonService;

    [Fact]
    public async Task GetCustomerRemarksAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var criteria = fixture.Create<GetCustomerRemarksCriteria>();
        var custometRemark = fixture.Create<IEnumerable<string>>();
        var service = GetService();
        baseService.GetDataAsync<string>(Arg.Do<GetCustomerRemarksCriteria>(x => criteria = x)).Returns(custometRemark);

        //Act
        var actual = await service.GetCustomerRemarksAsync(criteria);

        //Assert
        Assert.Equal(custometRemark, actual);
    }

    [Fact]
    public async Task GetRedemptionLogsAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var criteria = fixture.Create<GetRedemptionLogsCriteria>();
        var redemptionLogs = fixture.Create<IEnumerable<CustomerLogInfo>>();
        var service = GetService();
        baseService.GetDataAsync<CustomerLogInfo>(Arg.Do<GetRedemptionLogsCriteria>(x => criteria = x)).Returns(redemptionLogs);

        //Act
        var actual = await service.GetRedemptionLogsAsync(criteria);

        //Assert
        Assert.Equal(redemptionLogs, actual);
    }

    [Fact]
    public async Task GetCommunicationLogsAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var criteria = fixture.Create<GetCommunicationLogsCriteria>();
        var communicationLogInfos = fixture.Create<IEnumerable<CommunicationLog>>();
        var settingItems = fixture.Create<IEnumerable<FeedbackSettingRelation>>();

        var tuple = (communicationLogInfos, settingItems);
        var service = GetService();
        baseService.FetchMultipleAsync<CommunicationLog, FeedbackSettingRelation>(Arg.Do<GetCommunicationLogsCriteria>(x => criteria = x)).Returns(tuple);
        communicationLogInfos = communicationLogInfos.Where(x => x.Settings.Any());

        //Act
        var actual = await service.GetCommunicationLogsAsync(criteria);

        //Assert
        Assert.Equal(communicationLogInfos, actual);
    }

    [Fact]
    public async Task GetCustomerInfoVerifyAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var criteria = fixture.Create<GetCustomerInfoVerifyCriteria>();
        var customerInfoVerify = fixture.Create<CustomerInfoVerify>();
        var service = GetService();
        baseService.GetDataEntityAsync<CustomerInfoVerify>(Arg.Do<GetCustomerInfoVerifyCriteria>(x => criteria = x)).Returns(customerInfoVerify);

        //Act
        var actual = await service.GetCustomerInfoVerifyAsync(criteria);

        //Assert
        Assert.Equal(customerInfoVerify, actual);
    }

    [Fact]
    public async Task EditCustomerVerifyAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var command = fixture.Create<EditCustomerVerifyCommand>();
        var commandResult = fixture.Create<CommandResult>();
        var service = GetService();
        baseService.ExecuteNonQueryAsync(Arg.Do<EditCustomerVerifyCommand>(x => command = x)).Returns(commandResult);

        //Act
        var actual = await service.EditCustomerVerifyAsync(command);

        //Assert
        Assert.Equal(commandResult, actual);
    }

    #region Helpers
    private DashboardService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();

        return new DashboardService(baseService, commonService);
    }

    #endregion Helpers
}