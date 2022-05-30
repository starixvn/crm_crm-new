namespace CRM.Controllers.UnitTests.Report.Statistics
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Report.Statistics;
    using CRM.Core.Constants;
    using CRM.Criteria.Report;
    using CRM.Models.Report;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Report;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class IssueStatisticsControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private IIssueStatisticsService issueStatisticsService;
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
            Assert.Equal("../Report/IssueStatistics/Index", viewResult.ViewName);
        }

        [Fact]
        public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting> { new Setting { Id = 1, Name = "MainCategory" } };
            var subCategories = new List<Setting> { new Setting { Id = 1, Name = "SubCategory" } };
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

        #region Helpers

        private IssueStatisticsController GetController()
        {
            issueStatisticsService = Substitute.For<IIssueStatisticsService>();
            settingService = Substitute.For<ISettingService>();
            excelService = Substitute.For<IExportExcelService>();

            return new IssueStatisticsController(issueStatisticsService, settingService, excelService);
        }

        #endregion Helpers
    }
}