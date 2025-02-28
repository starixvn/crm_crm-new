namespace CRM.Controllers.UnitTests.Report;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Report;
using CRM.Criteria.Report.CategoriesSummaryReport;
using CRM.Models.Report.CategoriesSummaryReport;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report.CategoriesSummaryReport;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using NSubstitute;
using Services.ExportExcel;
using Xunit;

public class SummaryReportControllerTests
{
    private ISummaryReportService summaryReportService;
    private IExportExcelService exportExcelService;
    private IPermissionService permissionService;
    private AppSettings appSettings;
    private readonly Fixture fixture = new();

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
        fixture.Behaviors.Add(new OmitOnRecursionBehavior(1));
        var allSettings = fixture.Create<AllSetting>();

        var controller = GetController();
        summaryReportService.AllSettings().Returns(allSettings);

        // Act
        var result = await controller.GetAllSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.Equal(jsonResult.Value, allSettings);
    }

    [Fact]
    public async Task ExportSummaryReport_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<GetSummaryReportCriteria>();
        var fileName = string.Format(ViewResources.SheetNameSummaryReport, criteria.Year) + ".xlsx";
        var expected = fixture.Create<byte[]>();
        var controller = GetController();
        var templates = CreateReportInfo();
        exportExcelService.ExportSummaryReport(templates, criteria.Year).Returns(expected);

        // Act
        var result = await controller.ExportSummaryReport(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    [Fact]
    public async Task GetSummaryReport_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var criteria = fixture.Create<GetSummaryReportCriteria>();
        var controller = GetController();
        var templates = CreateReportInfo();
        summaryReportService.GetSummaryReportAsync(criteria).Returns(templates);
        // Act
        var result = await controller.GetSummaryReport(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var summaryReportInfoTemplates = (SummaryReportModel)jsonResult.Value;
        Assert.Equal(templates, summaryReportInfoTemplates);
    }

    #region Helpers

    private SummaryReportController GetController()
    {
        summaryReportService = Substitute.For<ISummaryReportService>();
        exportExcelService = Substitute.For<IExportExcelService>();
        permissionService = Substitute.For<IPermissionService>();
        var optionsAppSettings = Substitute.For<IOptionsSnapshot<AppSettings>>();
        appSettings = new AppSettings
        {
            TimeSpan = 12
        };
        optionsAppSettings.Value.Returns(appSettings);
        return new SummaryReportController(summaryReportService, exportExcelService, permissionService, optionsAppSettings);
    }

    private static SummaryReportModel CreateReportInfo()
    {
        var title = "Categories Summary Report For Year 2021";
        var months = new List<string> { "FEB", "APR", "SEP" };
        var grandTotals = new List<Summary>
        {
            new(){
                Amount =1,
                Month = "FEB"
            },
            new(){
                Amount =1,
                Month = "APR"
            },
            new(){
                Amount =1,
                Month = "SEP"
            }
        };
        var subCategories = new List<CategorySummary>
        {
            new(){
                Id = 4014,
                Name = "Super/Master/Agent",
                SubCategories = null,
                Summaries = grandTotals
            }
        };
        var categorySummaries = new List<CategorySummary>
        {
            new()
            {
                Id = 3003,
                Name = "Open Account",
                SubCategories = subCategories,
                Summaries = grandTotals
            }
        };

        return new SummaryReportModel
        {
            ReportTitle = title,
            CategorySummaries = categorySummaries,
            GrandTotals = grandTotals,
            Months = months
        };
    }

    #endregion Helpers
}