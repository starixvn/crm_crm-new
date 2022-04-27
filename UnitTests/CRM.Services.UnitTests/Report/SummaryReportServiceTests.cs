namespace CRM.Services.UnitTests.Report
{
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Criteria.Report.CategoriesSummaryReport;
    using CRM.Models.Report.CategoriesSummaryReport;
    using CRM.Services.Report.CategoriesSummaryReport;
    using NSubstitute;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Xunit;
    public class SummaryReportServiceTests
    {
        private IBaseService baseService;
        private  ISettingService settingService;

        [Fact]
        public async Task GetAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<GetSummaryReportCriteria>();
            criteria.Year = 2021;
            criteria.Categories = "3000";
            var service = GetService();
            var summaryRawData = new List<SummaryRawData>
            {
                new SummaryRawData
                {
                    M = 1,
                    Month = "FEB",
                    MainCategoryId = 1,
                    MainCategory = "MainCategory",
                    SubCategoryId = 1,
                    SubCategory = "SubCategory",
                    NoOfIssues = 1
                }
            };
            // Act
            baseService.GetDataAsync<SummaryRawData>(criteria).Returns(summaryRawData);
            var result = await service.GetSummaryReportAsync(criteria);

            // Assert
            Assert.Equal(0, result.CategorySummaries.Count);
            Assert.Equal(0, result.Months.Count);
            Assert.Equal(0, result.GrandTotals.Count);
            Assert.Equal("Categories Summary Report For Year 2021", result.ReportTitle);
        }

        #region Helpers
        private SummaryReportService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();

            return new SummaryReportService(baseService, settingService);
        }
        #endregion Helpers
    }
}
