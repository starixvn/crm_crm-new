namespace CRM.Controllers.UnitTests.Report.Statistics;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Report.Statistics;
using CRM.Criteria.Report.RedemptionStatistics;
using CRM.Models;
using CRM.Models.Report.RedemptionStatistics;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using Extensions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class RedemptionStatisticsControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ICommonService commonService;
    private IBaseService baseService;
    private ISettingService settingService;
    private IExportExcelService excelService;
        

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
        var currencies = fixture.Create<IEnumerable<BaseModel>>();
        var controller = GetController();
        settingService.GetStatusAsync(ViewTypeConstants.Redemption).Returns(statuses);
        settingService.GetCurrencyRedemptionAsync().Returns(currencies);

        // Act
        var result = await controller.GetAllSettings();

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var statusesJson = (IEnumerable<FeedbackStatus>)jsonResult.Value.GetType().GetProperty("statuses").GetValue(jsonResult.Value);
        var currenciesJson = (IEnumerable<BaseModel>)jsonResult.Value.GetType().GetProperty("currencies").GetValue(jsonResult.Value);

        Assert.Equal(statuses, statusesJson);
        Assert.Equal(currencies, currenciesJson);
    }

    [Fact]
    public async Task GetRedemptionSummary_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var convertDate = fixture.Create<DateTime>();
        var redemptions = new List<RedemptionStatisticsEntity>
        {
            new()
            {
                Amount = 2,
                Currency = "Euro",
                CurrencyId = 6,
                Month = 10,
                Subject ="Testing",
                Year = 2021
            }
        };
        var criteria = fixture.Create<GetRedemptionStatisticsCriteria>();
        var title = string.Format(ViewResources.RedemptionStatistics_Title,
            criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
        IDictionary<string, decimal> totalHash = new Dictionary<string, decimal>();
        totalHash.Add("Euro", 2);
        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(convertDate);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(convertDate);
        baseService.GetDataAsync<RedemptionStatisticsEntity>(criteria).Returns(redemptions);

        // Act
        var result = await controller.GetRedemptionSummary(criteria);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var dataJson = (List<RedemptionStatisticsEntity>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var totalJson = (IDictionary<string, decimal>)jsonResult.Value.GetType().GetProperty("totals").GetValue(jsonResult.Value);
        var titleJson = jsonResult.Value.GetType().GetProperty("title").GetValue(jsonResult.Value);


        //Assert
        Assert.Equal(redemptions.First().Amount, dataJson.First().Amount);
        Assert.Equal(redemptions.First().Currency, dataJson.First().Currency);
        Assert.Equal(totalHash, totalJson);
        Assert.Equal(title, titleJson);
    }

    [Fact]
    public async Task GetRedemptionDetails_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var convertDate = fixture.Create<DateTime>();
        var details = fixture.Create<IEnumerable<RedemptionStatisticsDetailEntity>>();
        fixture.Customize<GetRedemptionStatisticsDetailCriteria>(x => x.With(b => b.PageIndex, 1));
        var criteria = fixture.Create<GetRedemptionStatisticsDetailCriteria>();
        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(convertDate);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(convertDate);
        baseService.GetDataAsync<RedemptionStatisticsDetailEntity>(criteria).Returns(details);

        // Act
        var result = await controller.GetRedemptionDetails(criteria);
        var jsonResult = Assert.IsType<JsonResult>(result);
        var detailsJson = jsonResult.Value.GetType().GetProperty("details").GetValue(jsonResult.Value);

        // Assert
        Assert.Equal(details, detailsJson);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var convertDate = fixture.Create<DateTime>();
        fixture.Customize<GetRedemptionStatisticsCriteria>(x => x.With(b => b.ReportBy, 1));
        var redemptions = fixture.Create<IEnumerable<RedemptionStatisticsEntity>>();
        var criteria = fixture.Create<GetRedemptionStatisticsCriteria>();
        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(convertDate);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(convertDate);

        baseService.GetDataAsync<RedemptionStatisticsEntity>(criteria).Returns(redemptions);
        var fileName = string.Format(ViewResources.RedemptionStatistics_ExcelFile,
            criteria.FromDate.ToString("yyyyMMdd"), criteria.ToDate.ToString("yyyyMMdd"));

        // Act
        var result = await controller.ExportExcel(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
    }

    [Fact]
    public async Task ExportExcelDetails_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var convertDate = fixture.Create<DateTime>();
        var details = fixture.Create<IEnumerable<RedemptionStatisticsDetailEntity>>();
        var criteria = fixture.Create<GetRedemptionStatisticsDetailCriteria>();
        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(convertDate);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(convertDate);

        baseService.GetDataAsync<RedemptionStatisticsDetailEntity>(criteria).Returns(details);
        var fileName = string.Format(ViewResources.Redemption_Statistics_Detail_FileName);

        // Act
        var result = await controller.ExportExcelDetails(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
    }

    #region Helpers

    private RedemptionStatisticsController GetController()
    {
        commonService = Substitute.For<ICommonService>();
        baseService = Substitute.For<IBaseService>();
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        return new RedemptionStatisticsController(commonService, baseService, settingService, excelService);
    }

    #endregion Helpers
}