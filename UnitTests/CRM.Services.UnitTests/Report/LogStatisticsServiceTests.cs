namespace CRM.Services.UnitTests.Report;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Criteria.Report.LogStatistics;
using CRM.Extensions;
using CRM.Models;
using CRM.Models.Feedback.LatestFeedback;
using CRM.Models.Report.LogStatistics;
using CRM.Resources;
using CRM.Services.Report;
using Interfaces;
using NSubstitute;
using Xunit;

public class LogStatisticsServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ICommonService commonService;

    [Fact]
    public async Task GetReportDataAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var clientDate = fixture.Create<DateTime>();
        fixture.Customize<LogStatisticsCriteria>(x => x.With(b => b.SiteType, 0));
        var criteria = fixture.Create<LogStatisticsCriteria>();
        criteria.SiteType = LogStatisticConstants.IBC;

        var service = GetService();
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientDate);

        var reportTitle = string.Format(
            ViewResources.LogStatistics_ExcelTitle,
            GetLogStatisticSiteTypeName(criteria.SiteType, false),
            commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
            commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat());

        var excelFileName = string.Format(
            ViewResources.LogStatistics_ExcelFileName,
            GetLogStatisticSiteTypeName(criteria.SiteType, true),
            commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormatDash(),
            commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormatDash());
        var expected = new LogStatisticsViewModel
        {
            Id = 0,
            Name = reportTitle,
            ExcelFileName = excelFileName,
            CommunicationColumns = new List<BaseModel> { new() { Id = 1, Name = "CommunicationId" } },
            ProductColumns = new List<BaseModel> { new() { Id = 1, Name = "Product" } },
        };

        var logStatisticEntities = new List<LogStatisticsEntity>
        {
            new()
            {
                MainCategoryId = 1,
                MainCategory = "MainCategory",
                SubCategoryId = 1,
                SubCategory = "SubCategory",
                CommunicationId = 1,
                Communication = "CommunicationId",
                ProductId = 1,
                Product = "Product",
                Total = 1
            }
        };
        baseService.GetDataAsync<LogStatisticsEntity>(criteria).Returns(logStatisticEntities);

        // Act
        var actual = await service.GetReportDataAsync(criteria);

        // Assert
        Assert.Equal(actual.GrandTotalOfCommunicationCount.Count(), expected.GrandTotalOfCommunicationCount.Count());
        Assert.Equal(actual.GrandTotalOfCommunicationSumByProduct.Count(), expected.GrandTotalOfCommunicationSumByProduct.Count());
        Assert.Equal(actual.Id, expected.Id);
        Assert.Equal(actual.Name, expected.Name);
        Assert.Equal(actual.ExcelFileName, expected.ExcelFileName);
        Assert.Collection(actual.CommunicationColumns,
            item => Assert.Equal(expected.CommunicationColumns.First().Name, item.Name));
        Assert.Collection(actual.ProductColumns,
            item => Assert.Equal(expected.ProductColumns.First().Name, item.Name));
    }


    [Fact]
    public async Task GetReportDetailsAsync_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<LogStatisticsDetailCriteria>();
        var clientDate = fixture.Create<DateTime>();
        fixture.Customize<LogStatisticsDetailCriteria>(x => x.With(b => b.SiteType, 0));
        var service = GetService();
        commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientDate);

        var reportTitle = string.Format(
            ViewResources.LogStatistics_Detail_ExcelTitle,
            GetLogStatisticDetailSiteTypeName(criteria.SiteType, false),
            commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
            commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat());

        var excelFileName = string.Format(
            ViewResources.LogStatistics_Detail_ExcelFileName,
            GetLogStatisticDetailSiteTypeName(criteria.SiteType, true),
            commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormatDash(),
            commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormatDash());
        var latestFeedbackCommunicationTool = fixture.Create<IEnumerable<LatestFeedbackCommunicationTool>>();
        var logStatisticEntities = new List<StatisticsDetailbyDateModel>
        {
            new()
            {
                Bbm= "---",
                CreatorName= null,
                Email= "---",
                Fax= "---",
                Language= "Mandarin",
                Line= "---",
                MobilePhone= "---",
                MobilePhoneAreaCode= "",
                MobilePhoneCountryCode= "",
                MSN= "---",
                WhatsApp= "---",
                Yahoo= "--"
            }
        };

        var expected = new StatisticsDetailReportByDateModel
        {
            Id = 0,
            ChildReports = logStatisticEntities,
            Name = reportTitle,
            ExcelFileName = excelFileName
        };

        baseService.FetchMultipleAsync<StatisticsDetailbyDateModel, LatestFeedbackCommunicationTool>(criteria)
            .Returns(new ValueTuple<IEnumerable<StatisticsDetailbyDateModel>, IEnumerable<LatestFeedbackCommunicationTool>>
                (logStatisticEntities, latestFeedbackCommunicationTool));

        // Act
        var actual = await service.GetReportDetailsAsync(criteria);

        // Assert
        Assert.Equal(actual.ChildReports, expected.ChildReports);
        Assert.Equal(actual.Name, expected.Name);
        Assert.Equal(actual.ExcelFileName, expected.ExcelFileName);
    }

    private static string GetLogStatisticSiteTypeName(short siteType, bool isFileName)
    {
        if (isFileName)
        {
            switch (siteType)
            {
                case LogStatisticConstants.IBC:
                    return ViewResources.CreditDailyLogStatisticsFileName;

                case LogStatisticConstants.Licensee:
                    return ViewResources.LicenseeDailyLogStatisticsFileName;

                default:
                    return string.Empty;
            }
        }
        else
        {
            switch (siteType)
            {
                case LogStatisticConstants.IBC:
                    return ViewResources.CreditDailyLogStatistics;

                case LogStatisticConstants.Licensee:
                    return ViewResources.LicenseeDailyLogStatistics;

                default:
                    return string.Empty;
            }
        }
    }

    private static string GetLogStatisticDetailSiteTypeName(short siteType, bool isFileName)
    {
        if (isFileName)
        {
            switch (siteType)
            {
                case LogStatisticConstants.IBC:
                    return ViewResources.CreditDailyLogStatisticsDetail_FileName;

                case LogStatisticConstants.Licensee:
                    return ViewResources.LogStatisticsDetail_FileName;

                default:
                    return string.Empty;
            }
        }
        else
        {
            switch (siteType)
            {
                case LogStatisticConstants.IBC:
                    return ViewResources.CreditDailyLogStatisticsDetail;

                case LogStatisticConstants.Licensee:
                    return ViewResources.LicenseeDailyLogStatisticsDetail;

                default:
                    return string.Empty;
            }
        }
    }

    #region Helpers
    private LogStatisticsService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();

        return new LogStatisticsService(baseService, commonService);
    }
    #endregion Helpers
}