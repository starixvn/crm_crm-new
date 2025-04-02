namespace CRM.Controllers.UnitTests.Report.Statistics;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Report.Statistics;
using CRM.Criteria.Report;
using CRM.Models.Report;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report;
using Extensions;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class IssueStatisticsControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private IIssueStatisticsService issueStatisticsService;
    private ISettingService settingService;
    private IExportExcelService excelService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting> { new() { Id = 1, Name = "MainCategory" } };
        var subCategories = new List<Setting> { new() { Id = 1, Name = "SubCategory" } };
        var controller = GetController();
        settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
        settingService.GetSubCategoryAsync(null, SettingConstants.Active).Returns(subCategories);

        // Act
        var result = await controller.GetAllSettings();

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var categoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        var subCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("subCategories").GetValue(jsonResult.Value);

        Assert.Equal(mainCategories, categoriesJson);
        Assert.Equal(subCategories, subCategoriesJson);
    }

    [Fact]
    public async Task GetIssuesStatistics_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<GetIssuesStatisticReportCriteria>();
        var issuesStatistics = new IssuesStatisticsReportInfo
        {
            Id = "1",
            Name = "issue"
        };
        var controller = GetController();
        issueStatisticsService.GetIssuesStatisticsReportAsync(criteria).Returns(issuesStatistics);

        // Act
        var result = await controller.GetIssuesStatistics(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var data = jsonResult.Value;

        Assert.Equal(data, issuesStatistics);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        fixture.Customize<GetIssuesStatisticReportCriteria>(x => x.With(b => b.ReportType, 1));
        var criteria = fixture.Create<GetIssuesStatisticReportCriteria>();
        var issuesStatistics = new IssuesStatisticsReportInfo
        {
            Id = "1",
            Name = "issue"
        };
        var fileName = string.Format(ViewResources.IssueStatistics_ExcelFile, ViewResources.Daily,
            criteria.FromDate.ToShortDateFormatDash(), criteria.ToDate.ToShortDateFormatDash());
        var controller = GetController();
        issueStatisticsService.GetIssuesStatisticsReportAsync(criteria).Returns(issuesStatistics);

        // Act
        var result = await controller.ExportExcel(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
    }

    #region Helpers

    private IssueStatisticsController GetController()
    {
        issueStatisticsService = Substitute.For<IIssueStatisticsService>();
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        permissionService = Substitute.For<IPermissionService>();

        return new IssueStatisticsController(issueStatisticsService, settingService, excelService, permissionService);
    }

    #endregion Helpers
}