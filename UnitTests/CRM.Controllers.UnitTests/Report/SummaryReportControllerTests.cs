namespace CRM.Controllers.UnitTests.Report
{
    using AutoFixture;
    using CRM.Controllers.Report;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Criteria.Report.CategoriesSummaryReport;
    using CRM.Models.Common;
    using CRM.Models.Report.CategoriesSummaryReport;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Report.CategoriesSummaryReport;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using NSubstitute;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Xunit;

    public class SummaryReportControllerTests
    {
        private ISummaryReportService summaryReportService;
        private ISettingService settingService;
        private IExportExcelService exportExcelService;
        private AppSettings appSettings;

        [Fact]
        public async Task getAllSettings_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var minReportDate = Convert.ToInt32(ViewResources.MinReportDate);
            var currentYear = DateTime.Now.Year;
            var yearRange = new List<Setting>();
            for (int i = minReportDate; i <= currentYear; i++)
            {
                yearRange.Add(new Setting { Id = i, Value = i.ToString() });
            }

            var siteTypes = new List<Setting>
            {
                new Setting { Id = SiteConstants.All, Name = ViewResources.All },
                new Setting { Id = SiteConstants.NA, Name = ViewResources.Symbol_NotApply },
                new Setting { Id = SiteConstants.IBCGroup, Name = ViewResources.Credit },
                new Setting { Id = SiteConstants.LicenseeGroup, Name = ViewResources.Licensee },
            };
            var categories = await settingService.GetMainCategoryAsync(SettingConstants.Active);

            var expected = new
            {
                YearRange = yearRange,
                SiteTypes = siteTypes,
                Categories = categories
            };

            // Act
            var result = await controller.GetAllSettings();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            expected.Equals(jsonResult.Value);
        }

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
            Assert.Equal("../Report/Summary/Index", viewResult.ViewName);
        }

        [Fact]
        public async Task ExportSummaryReport_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<GetSummaryReportCriteria>();
            criteria.Year = 2021;
            criteria.SiteType = 0;
            criteria.Categories = "3003";
            var fileName = "Categories_Summary_2021.xlsx";
            var expected = fixture.Create<byte[]>();
            var controller = GetController();
            var templates = await summaryReportService.GetSummaryReportAsync(criteria);
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
            var fixture = new Fixture();
            var criteria = fixture.Create<GetSummaryReportCriteria>();
            criteria.Year = 2021;
            criteria.SiteType = 0;
            criteria.Categories = "3003";
            var controller = GetController();
            var templates = await summaryReportService.GetSummaryReportAsync(criteria);

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
            settingService = Substitute.For<ISettingService>();
            exportExcelService = Substitute.For<IExportExcelService>();
            var optionsAppSettings = Substitute.For<IOptionsSnapshot<AppSettings>>();
            appSettings = new AppSettings
            {
                TimeSpan = 12
            };
            optionsAppSettings.Value.Returns(appSettings);
            return new SummaryReportController(summaryReportService, exportExcelService, optionsAppSettings);
        }

        #endregion Helpers
    }
}
