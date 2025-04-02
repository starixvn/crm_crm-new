namespace CRM.Services.UnitTests.Report;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Report;
using CRM.Models.Report;
using CRM.Services.Report;
using Interfaces;
using NSubstitute;
using Xunit;

public class IssueStatisticsServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ICommonService commonService;

    [Theory]
    [InlineData(1)]
    [InlineData(3)]
    public async Task GetIssuesStatisticsReportAsync_WhenCalled_ReturnExpected(int reportType)
    {
        // Arrange
        var service = GetService();
        var serverTime = fixture.Create<DateTime>();
        fixture.Customize<GetIssuesStatisticReportCriteria>(x => x.With(b => b.ReportType, reportType));
        var criteria = fixture.Create<GetIssuesStatisticReportCriteria>();
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(serverTime);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(serverTime);
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(serverTime);
        var issuesStatisticsReportInfo = new IssuesStatisticsReportInfo
        {
            Name = "Daily Issue Statistic Report From Mar 01, 2022 To Mar 22, 2022",
            ShortName = "2021-01-01",
            ReportTypeId = 1,
            NumberOfIssues = 1,
            TotalChildReports = 1,
            CountryInfo = new Models.Country { Id = 1, Name = "Afghanistan" },
            Total = new IssuesStatisticsReportInfo { 
                Name = "GrandTotal", 
                NumberOfIssues = 1,
                ChildReports = new List<IssuesStatisticsReportInfo> {
                    new()
                    {
                        ShortName = "11:16"
                    }
                }
            }
        };

        var issuesStatistics = new List<IssuesStatistics> {
            new() { CountryId = 1, CountryName = "Afghanistan", FeedbackDate = new DateTime(), NoOfIssues = 1 }
        };

        baseService
            .GetDataAsync<IssuesStatistics>(Arg.Do<GetIssuesStatisticReportCriteria>(x => criteria = x))
            .Returns(issuesStatistics);
        criteria.IsGetFullReport = false;

        // Act
        var result = await service.GetIssuesStatisticsReportAsync(criteria);

        // Assert
        Assert.Equal(issuesStatisticsReportInfo.TotalChildReports, result.TotalChildReports);
        Assert.Equal(issuesStatisticsReportInfo.Total.ChildReports.Count, result.Total.ChildReports.Count);
        Assert.Equal(issuesStatisticsReportInfo.Total.NumberOfIssues, result.Total.NumberOfIssues);
    }

    #region Helpers
    private IssueStatisticsService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();
        return new IssueStatisticsService(baseService, commonService);
    }

    #endregion Helpers
}