namespace CRM.Services.UnitTests.Communication;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Communication;
using CRM.Models.Common;
using CRM.Models.CommunicationLogs;
using CRM.Models.Customer;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using CRM.Services.Communication;
using Interfaces;
using NSubstitute;
using Xunit;

public class CommunicationServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ICommonService commonService;
    private ISettingService settingService;

    [Fact]
    public async Task GetLogsByCustomerIdAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var param = fixture.Create<GetLogsByCustomerIdCriteria>();
        var communicationLogInfos = fixture.Create<IEnumerable<CommunicationLog>>();
        var settingItems = fixture.Create<IEnumerable<SettingItem>>();

        var tuple = (communicationLogInfos, settingItems);
        var service = GetCommunicationService();
        baseService.FetchMultipleAsync<CommunicationLog, SettingItem>(Arg.Do<GetLogsByCustomerIdCriteria>(x => param = x)).Returns(tuple);

        //Act
        var actual = await service.GetLogsByCustomerIdAsync(param);

        //Assert
        Assert.Equal(communicationLogInfos, actual);
    }

    [Fact]
    public async Task GetLogByFeedbackIdAsync_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var date = fixture.Create<DateTime>();
        var clientdate = fixture.Create<DateTime>();
        var communicationLogs = new[] 
        {
            new CommunicationLog
            {
                FeedbackDate = date,
                ResolutionDate = date,
                    SolveDate = date,
                    FirstResponseTime = date
            }
        };
        var relatedCustomers = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
        var settings = fixture.Create<IEnumerable<FeedbackSettingRelation>>();
        var site = fixture.Create<SiteSetting>();
        var criteria = new GetLogByFeedbackIdCriteria();
        var service = GetCommunicationService();
        baseService.FetchMultipleAsync<CommunicationLog, RelatedCustomerPermission, FeedbackSettingRelation>(
                Arg.Do<GetLogByFeedbackIdCriteria>(x => criteria = x))
            .Returns((communicationLogs, relatedCustomers, settings));
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientdate);
        settingService.GetSiteByIdAsync(Arg.Any<int>()).Returns(site);

        // Act
        var actual = await service.GetLogByFeedbackIdAsync(1, 1);

        // Assert
        Assert.Equal(communicationLogs.First(), actual);
        Assert.Equal(clientdate, actual.FeedbackDate);
        Assert.Equal(clientdate, actual.ResolutionDate);
        Assert.Equal(clientdate, actual.SolveDate);
        Assert.Equal(settings, actual.Settings);
    }

    #region Helpers
    private CommunicationService GetCommunicationService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();
        settingService = Substitute.For<ISettingService>();

        return new CommunicationService(baseService, commonService, settingService);
    }

    #endregion Helpers
}