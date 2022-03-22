namespace CRM.Controllers.UnitTests.Report.Statistics
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Report.Statistics;
    using CRM.Core.Constants;
    using CRM.Criteria.Report.LogStatistics;
    using CRM.Models.Report.LogStatistics;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Report;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class LogStatisticsControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private ILogStatisticsService logStatisticsService;
        private ISettingService settingService;
        private IExportExcelService excelService;

        [Fact]
        public void Index_WhenCalled_ReturnAsExpectedResult()
        {
            var controller = GetController();

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Null(viewResult.Model);
            Assert.Equal("../Report/LogStatistics/Index", viewResult.ViewName);
        }

        [Fact]
        public async Task getAllSettings_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var products = new List<Product> { new Product { Id = 1, Name = "Product" } };
            var mainCategories = new List<Setting> { new Setting { Id = 1, Name = "mainCategory" } };
            var communicationTools = new List<Setting> { new Setting { Id = 1, Name = "communicationTool" } };

            var controller = GetController();
            settingService.GetProductAsync().Returns(products);
            settingService.GetMainCategoryAsync().Returns(mainCategories);
            settingService.GetCommunicationToolAsync(2, true).Returns(communicationTools);

            var expected = new
            {
                products,
                mainCategories,
                communicationTools
            };

            // Act
            var result = await controller.getAllSettings();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            expected.Equals(jsonResult.Value);
        }

        [Fact]
        public async Task GetMainReport_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var ibcReport = fixture.Create<LogStatisticsViewModel>();
            var licenseeReport = fixture.Create<LogStatisticsViewModel>();
            var criteria = fixture.Create<LogStatisticsCriteria>();

            var controller = GetController();
            logStatisticsService.GetReportDataAsync(criteria).Returns(ibcReport);
            logStatisticsService.GetReportDataAsync(criteria).Returns(licenseeReport);
            var expected = new { ibcReport, licenseeReport };

            // Act
            var result = await controller.GetMainReport(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            expected.Equals(jsonResult.Value);
        }

        [Fact]
        public async Task GetReportDetails_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<LogStatisticsDetailCriteria>();
            var reportDetails = new StatisticsDetailReportByDateModel
            {
                ChildReports = new List<StatisticsDetailbyDateModel>
                {
                        new StatisticsDetailbyDateModel {FeedbackID = 1}
                }
            };
            var report = reportDetails.ChildReports;
            var products = new List<Product> { new Product { Id = 1, Name = "product" } };
            var subProducts = new List<Product> { new Product { Id = 1, Name = "subProducts" } };
            var mainCategories = new List<Setting> { new Setting { Id = 1, Name = "mainCategory" } };
            var communicationTools = new List<Setting> { new Setting { Id = 1, Name = "communicationTool" } };
            var extensions = new List<SettingRelation> { new SettingRelation { Id = 1, Value = "extension" } }; 

            var controller = GetController();
            logStatisticsService.GetReportDetailsAsync(criteria).Returns(reportDetails);
            settingService.GetProductAsync().Returns(products);
            settingService.GetSubProductAsync().Returns(subProducts);
            settingService.GetAllMainSubCategoriesAsync().Returns(mainCategories);
            settingService.GetCommunicationToolAsync().Returns(communicationTools);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extensions);

            var expected = new
            {
                report,
                mainCategories,
                communicationTools,
                products,
                subProducts,
                extensions,
                totalRows = criteria.TotalRows
            };

            // Act
            var result = await controller.GetReportDetails(criteria);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            expected.Equals(jsonResult.Value);
        }

        [Fact]
        public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<LogStatisticsCriteria>();
            var param = new LogStatisticsCriteria
            {
                ProductId = criteria.ProductId,
                MainCategoryId = criteria.MainCategoryId,
                CommunicationId = criteria.CommunicationId,
                FromDate = criteria.FromDate,
                ToDate = criteria.ToDate,
                ProductType = LogStatisticConstants.ProductTypeDetails,
                CategoryType = LogStatisticConstants.SubCategory,
                SiteType = criteria.SiteType
            };
            var logStatistics = fixture.Create<LogStatisticsViewModel>();
            
            logStatisticsService.GetReportDataAsync(param).Returns(logStatistics);

            // Act
            var result = await controller.ExportExcel(criteria);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        }

        [Fact]
        public async Task ExportExcelDetails_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var criteria = fixture.Create<LogStatisticsDetailCriteria>();

            var logStatisticsDetail = new StatisticsDetailReportByDateModel
            {
                ChildReports = new List<StatisticsDetailbyDateModel>
                {
                        new StatisticsDetailbyDateModel {FeedbackID = 1}
                },
                ExcelFileName = "ExcelFileName"
            };
            var products = new List<Product> { new Product { Id = 1, Name = "product" } };
            var subProducts = new List<Product> { new Product { Id = 1, Name = "subProducts" } };
            var mainCategories = new List<Setting> { new Setting { Id = 1, Name = "mainCategory" } };
            var communicationTools = new List<Setting> { new Setting { Id = 1, Name = "communicationTool" } };
            var extensions = new List<SettingRelation> { new SettingRelation { Id = 1, Value = "extension" } };

            logStatisticsService.GetReportDetailsAsync(criteria).Returns(logStatisticsDetail);
            settingService.GetProductAsync().Returns(products);
            settingService.GetSubProductAsync().Returns(subProducts);
            settingService.GetAllMainSubCategoriesAsync().Returns(mainCategories);
            settingService.GetCommunicationToolAsync().Returns(communicationTools);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extensions);

            // Act
            var result = await controller.ExportExcelDetails(criteria);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal($"{logStatisticsDetail.ExcelFileName}.xlsx", excelResult.FileDownloadName);
        }

        #region Helpers

        private LogStatisticsController GetController()
        {
            logStatisticsService = Substitute.For<ILogStatisticsService>();
            settingService = Substitute.For<ISettingService>();
            excelService = Substitute.For<IExportExcelService>();

            return new LogStatisticsController(logStatisticsService, settingService, excelService);
        }

        #endregion Helpers
    }
}
