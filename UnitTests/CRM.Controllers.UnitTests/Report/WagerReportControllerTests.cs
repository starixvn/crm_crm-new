namespace CRM.Controllers.UnitTests.Report;

using AutoFixture;
using CRM.Controllers.Report;
using CRM.Criteria.Report.WagerReport;
using CRM.Models.Report.WagerReport;
using CRM.Resources;
using CRM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NSubstitute;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using Models;
using Services.ExportExcel;
using Xunit;

public class WagerReportControllerTests
{
    private IExportExcelService exportExcelService;
    private AppSettings appSettings;
    private IBaseService baseService;

    [Fact]
    public async Task ExportWagerReport_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<GetWagerReportCriteria>();
        var fileName = string.Format(ViewResources.WagerReportExcelName, criteria.Year) + ".xlsx";
        var expected = fixture.Create<byte[]>();
        var controller = GetController();
        var templates = CreateReportInfo();
        exportExcelService.ExportWagerReport(templates, criteria.Year).Returns(expected);

        // Act
        var result = await controller.ExportWagerReport(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    [Fact]
    public async Task GetWagerReport_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<GetWagerReportCriteria>();
        var expectedTitle = string.Format(ViewResources.WagerReportTitle, criteria.Year);
        var rawData = fixture.Create<IEnumerable<WagerRawData>>();
        var controller = GetController();
        baseService.GetDataAsync<WagerRawData>(criteria).Returns(rawData);

        // Act
        var result = await controller.GetWagerReport(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var WagerReportInfoTemplates = (WagerReportModel)jsonResult.Value;
        Assert.Equal(WagerReportInfoTemplates.WagerByMonths.First().Total, rawData.First().NoOfIssues);
        Assert.Equal(WagerReportInfoTemplates.WagerByMonths.First().Wagers.First().Name, rawData.First().SubCategory);
        Assert.Equal(WagerReportInfoTemplates.WagerByMonths.Last().Wagers.First().Name, rawData.Last().SubCategory);
        Assert.Equal(WagerReportInfoTemplates.WagerByMonths.Last().Total, rawData.Last().NoOfIssues);
        Assert.Equal(WagerReportInfoTemplates.ReportTitle, expectedTitle);
    }

    #region Helpers

    private WagerReportController GetController()
    {
        exportExcelService = Substitute.For<IExportExcelService>();
        var optionsAppSettings = Substitute.For<IOptionsSnapshot<AppSettings>>();
        appSettings = new AppSettings
        {
            TimeSpan = 12
        };
        baseService = Substitute.For<IBaseService>();
        optionsAppSettings.Value.Returns(appSettings);
        return new WagerReportController(exportExcelService, optionsAppSettings, baseService);

    }
    private WagerReportModel CreateReportInfo()
    {
        var grandTotal = new WagerByMonth
        {
            Month = "test",
            Total = 65,
            Wagers = new List<Wager>{
                new()
                {
                    Id = 0,
                    Name = "test",
                    Amount = 10
                }
            }
        };

        var wagerByMonths = new List<WagerByMonth>
        {
            new()
            {
                Month = "test",
                Total= 65,
                Wagers = new List<Wager>{
                    new()
                    {
                        Id = 0,
                        Name = "test",
                        Amount = 10
                    }
                }
            }
        };

        return new WagerReportModel
        {
            GrandTotal = grandTotal,
            WagerByMonths = wagerByMonths,
            ReportTitle = "test"
        };
    }
    #endregion Helpers
}