namespace CRM.Controllers.UnitTests.Report
{
    using AutoFixture;
    using CRM.Controllers.Report;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Report.WagerReport;
    using CRM.Models.Report.WagerReport;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using NSubstitute;
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;
    using Xunit;

    public class WagerReportControllerTests
    {
        private IExportExcelService exportExcelService;
        private AppSettings appSettings;
        private IBaseService baseService;

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            // Arrange
            var controller = GetController();

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Null(viewResult.Model);
            Assert.Equal("../Report/Wager/Index", viewResult.ViewName);
        }

        [Fact]
        public async Task ExportDirectReport_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<GetWagerReportCriteria>();
            criteria.Year = 2020;
            var fileName = "Wagers_Related_Report_2020.xlsx";
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
        public async Task GetDirectReport_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<GetWagerReportCriteria>();
            criteria.Year = 2020;
            var rawData = fixture.Create<IEnumerable<WagerReportModel>>();
            var controller = GetController();
            baseService.GetDataAsync<WagerReportModel>(Arg.Do<GetWagerReportCriteria>(x => criteria = x)).Returns(rawData);

            // Act
            var result = await controller.GetWagerReport(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var directReportInfoTemplates = (WagerReportModel)jsonResult.Value;
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
                    new Wager
                    {
                        Id = 0,
                        Name = "test",
                        Amount = 10
                    }
                }
            };

            var wagerByMonths = new List<WagerByMonth>
            {
                new WagerByMonth{
                    Month = "test",
                    Total= 65,
                    Wagers = new List<Wager>{
                        new Wager
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
}