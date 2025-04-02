namespace CRM.Controllers.UnitTests.Report;

using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Report;
using CRM.Criteria.Report.SettlementReport;
using CRM.Models.Report.SettlementReport;
using CRM.Services;
using CRM.Services.Report;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using NSubstitute;
using Services.ExportExcel;
using Xunit;

public class SettlementReportControllerTests
{
    private ISettlementReportService settlementReportService;
    private IExportExcelService excelService;
    private IPermissionService permissionService;
    private AppSettings appSettings;

    [Fact]
    public async Task ExportSettlementReport_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<GetSettlementReportCriteria>();
        criteria.Year = 2020;
        var templates = GetSettlementReportInfo();
        var fileName = "Settlement_Issues_Report_For_Year_2020.xlsx";
        var expected = fixture.Create<byte[]>();
        var controller = GetController();
        settlementReportService.GetSettlementReportAsync(criteria).Returns(templates);
        excelService.ExportSettlementReport(templates).Returns(expected);

        // Act
        var result = await controller.ExportSettlementReport(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    [Fact]
    public async Task GetSettlementReport_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var fixture = new Fixture();
        var templates = GetSettlementReportInfo();
        var criteria = fixture.Create<GetSettlementReportCriteria>();
        var controller = GetController();
        settlementReportService.GetSettlementReportAsync(criteria).Returns(templates);

        // Act
        var result = await controller.GetSettlementReport(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var settlementReportInfoTemplates = (SettlementReportInfo)jsonResult.Value;
        Assert.Equal(templates, settlementReportInfoTemplates);
    }

    #region Helpers

    private SettlementReportController GetController()
    {
        settlementReportService = Substitute.For<ISettlementReportService>();
        excelService = Substitute.For<IExportExcelService>();
        permissionService = Substitute.For<IPermissionService>();
        var optionsAppSettings = Substitute.For<IOptionsSnapshot<AppSettings>>();
        appSettings = new AppSettings
        {
            TimeSpan = 12
        };
        optionsAppSettings.Value.Returns(appSettings);
        return new SettlementReportController(settlementReportService, excelService, permissionService, optionsAppSettings);
    }

    private SettlementReportInfo GetSettlementReportInfo()
    {
        var childReport = new SettlementReportInfo
        {
            Id = 14,
            Name = "Italy",
            NumberOfIssues = 2
        };
        var childMonth = new SettlementReportInfo
        {
            Name = "Oct",
            NumberOfIssues = 2,
            ChildReports = [childReport],
        };
        var templates = new SettlementReportInfo
        {
            Name = "Settlement Issues Report For Year 2019",
            TotalChildReports = 1
        };
        templates.Total = new SettlementReportInfo
        {
            Name = "Grand Total",
            NumberOfIssues = 2
        };
        templates.Total.ChildReports = [childReport];
        templates.ChildReports = [childMonth];

        return templates;
    }

    #endregion Helpers
}