namespace CRM.Services.UnitTests.Report;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Report.SettlementReport;
using CRM.Models.Report.SettlementReport;
using CRM.Services.Report;
using NSubstitute;
using Xunit;

public class SettlementReportServiceTests
{
    private IBaseService baseService;

    [Fact]
    public async Task GetAsync_WhenCalled_ReturnExpected()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<GetSettlementReportCriteria>();
        var rawData = GetRawReport();
        var service = GetService();
        var expected = GetSettlementReportInfo();
        baseService
            .GetDataAsync<SettlementReportEntity>(Arg.Do<GetSettlementReportCriteria>(x => criteria = x))
            .Returns(rawData);
        criteria.IsGetFullReport = false;

        // Act
        var result = await service.GetSettlementReportAsync(criteria);

        // Assert
        Assert.Equal(expected.TotalChildReports, result.TotalChildReports);
        Assert.Equal(expected.Total.TotalChildReports, result.Total.TotalChildReports);
        Assert.Equal(expected.Total.NumberOfIssues, result.Total.NumberOfIssues);
    }

    [Fact]
    public async Task GetAsync_WhenBaseServiceReturnEmptyArray_ReturnExpected()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<GetSettlementReportCriteria>();
        var rawData = new List<SettlementReportEntity>();
        var service = GetService();
        baseService
            .GetDataAsync<SettlementReportEntity>(Arg.Do<GetSettlementReportCriteria>(x => criteria = x))
            .Returns(rawData);
        criteria.IsGetFullReport = false;

        // Act
        var result = await service.GetSettlementReportAsync(criteria);

        // Assert
        Assert.Equal(0, result.TotalChildReports);
        Assert.Equal(0, result.Total.TotalChildReports);
        Assert.Equal(0, result.Total.NumberOfIssues);
    }
        
    #region Helpers

    private SettlementReportService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        var service = Substitute.ForPartsOf<SettlementReportService>(baseService);
        return service;
    }

    private SettlementReportInfo GetSettlementReportInfo()
    {
        var childReportItaly = new SettlementReportInfo
        {
            Id = 100,
            Name = "Italy",
            NumberOfIssues = 2
        };
        var childReportNA = new SettlementReportInfo
        {
            NumberOfIssues = 1
        };
        var childReportAruba = new SettlementReportInfo
        {
            Id = 14,
            Name = "Aruba",
            NumberOfIssues = 1
        };
        var childMonthOtc = new SettlementReportInfo
        {
            Name = "Oct",
            NumberOfIssues = 2,
            ChildReports = [childReportItaly],
        };
        var childMonthNov = new SettlementReportInfo
        {
            Name = "Nov",
            NumberOfIssues = 4,
            ChildReports =
            [
                childReportNA,
                childReportAruba,
                childReportItaly
            ],
        };
        var templates = new SettlementReportInfo
        {
            TotalChildReports = 3
        };
        templates.Total = new SettlementReportInfo
        {
            Name = "Grand Total",
            NumberOfIssues = 6
        };
        templates.Total.ChildReports =
        [
            childReportItaly,
            childReportNA,
            childReportAruba
        ];
        templates.ChildReports =
        [
            childMonthOtc,
            childMonthNov
        ];
        templates.Name = "Settlement Issues Report For Year 2020";

        return templates;
    }

    private IEnumerable<SettlementReportEntity> GetRawReport()
    {
        var rawData = new List<SettlementReportEntity>
        {
            new()
            {
                Month = 10,
                CountryId = 100,
                CountryName = "Italy",
                NoOfIssues = 2
            },
            new()
            {
                Month = 11,
                NoOfIssues = 1
            },
            new()
            {
                Month = 11,
                CountryId = 14,
                CountryName = "Aruba",
                NoOfIssues = 1
            },
            new()
            {
                Month = 1,
                CountryId = 100,
                CountryName = "Italy",
                NoOfIssues = 2
            }
        };
        return rawData;
    }

    #endregion Helpers
}