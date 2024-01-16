namespace CRM.Services.UnitTests.Report
{
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Report.CategoriesSummaryReport;
    using CRM.Models.Report.CategoriesSummaryReport;
    using CRM.Services.Report.CategoriesSummaryReport;
    using NSubstitute;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Xunit;

    public class SummaryReportServiceTests
    {
        private IBaseService baseService;
        private ISettingService settingService;
        private IPermissionService permissionService;

        [Fact]
        public async Task GetAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<GetSummaryReportCriteria>();
            criteria.Year = 2020;
            criteria.Categories = "1";
            var service = GetService();
            var expected = new SummaryReportModel
            {
                GrandTotals = new List<Summary>()
                {
                    new Summary() {
                        Amount = 1,
                        Month = "FEB"
                    }
                },
                CategorySummaries = new List<CategorySummary>
                {
                    new CategorySummary
                    {
                        Id = 1,
                        Name = "MainCategory"
                    }
                },
                Months = new List<string> { "FEB" },
                ReportTitle = "Categories Summary Report For Year 2020"
            };
            var summaryRawData = new List<SummaryRawData>
            {
                new SummaryRawData
                {
                    M = 1,
                    Month = "FEB",
                    MainCategoryId = Convert.ToInt32(criteria.Categories),
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
            Assert.Equal(expected.GrandTotals.First().Month, result.GrandTotals.First().Month);
            Assert.Equal(expected.CategorySummaries.First().Name, result.CategorySummaries.First().Name);
            Assert.Equal(expected.Months, result.Months);
            Assert.Equal(expected.ReportTitle, result.ReportTitle);
        }

        [Fact]
        public async Task GetAllSettingAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var fixture = new Fixture();
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior(1));
            var allSettings = fixture.Create<AllSetting>();
            var service = GetService();
            settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(allSettings.Categories);
            // Act
            var result = await service.AllSettings();

            //Assert
            Assert.Equal("2011", result.YearRange.First().Value);
            Assert.Equal(DateTime.Now.Year.ToString(), result.YearRange.Last().Value);
            Assert.Equal(4, result.SiteTypes.Count());
            Assert.Equal("All", result.SiteTypes.First().Name);
            Assert.Equal("Licensee", result.SiteTypes.Last().Name);
            Assert.Equal(result.Categories.First().MainCategoryID, allSettings.Categories.First().MainCategoryID);
        }

        #region Helpers

        private SummaryReportService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            permissionService = Substitute.For<IPermissionService>();

            return new SummaryReportService(baseService, settingService, permissionService);
        }

        #endregion Helpers
    }
}