namespace CRM.Services.UnitTests.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core;
    using CRM.Core.Services;
    using CRM.Criteria.Report.LogStatistics;
    using CRM.Models;
    using CRM.Models.Report.LogStatistics;
    using CRM.Resources;
    using CRM.Services.Report;
    using NSubstitute;
    using Xunit;

    public class LogStatisticsServiceTests
    {
        private readonly IFixture fixture = new Fixture();
        private IBaseService baseService;
        private ICommonService commonService;

        [Fact]
        public async Task GetReportDataAsync_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var clientDate = fixture.Create<DateTime>();
            fixture.Customize<LogStatisticsCriteria>(x => x.With(b => b.SiteType, 0));
            var criteria = fixture.Create<LogStatisticsCriteria>();
            var reportTitle = string.Format(
               ViewResources.LogStatistics_ExcelTitle,
               ViewResources.MBCDailyLogStatistics,
               clientDate.ToShortDateFormat(),
               clientDate.ToShortDateFormat());

            var excelFileName = string.Format(
               ViewResources.LogStatistics_ExcelFileName,
               ViewResources.MBCDailyLogStatisticsFileName,
               clientDate.ToShortDateFormatDash(),
               clientDate.ToShortDateFormatDash());
            var expected = new LogStatisticsViewModel
            {
                Id = 0,
                Name = reportTitle,
                ExcelFileName = excelFileName,
                CommunicationColumns = new List<BaseModel> { new BaseModel { Id = 1, Name = "CommunicationId" } },
                ProductColumns = new List<BaseModel> { new BaseModel { Id = 1, Name = "Product" } },
            };

            var logStatisticEntities = new List<LogStatisticsEntity>
            {
                new LogStatisticsEntity
                {
                    MainCategoryId = 1,
                    MainCategory = "MainCategory",
                    SubCategoryId = 1,
                    SubCategory = "SubCategory",
                    CommunicationId = 1,
                    Communication = "CommunicationId",
                    ProductId = 1,
                    Product = "Product",
                    Total = 1
                }
            };
            var service = GetService();
            baseService.GetDataAsync<LogStatisticsEntity>(criteria).Returns(logStatisticEntities);
            commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientDate);

            // Act
            var actual = await service.GetReportDataAsync(criteria);

            // Assert
            Assert.Equal(actual.GrandTotalOfCommunicationCount.Count(), expected.GrandTotalOfCommunicationCount.Count());
            Assert.Equal(actual.GrandTotalOfCommunicationSumByProduct.Count(), expected.GrandTotalOfCommunicationSumByProduct.Count());
            Assert.Equal(actual.Id, expected.Id);
            Assert.Equal(actual.Name, expected.Name);
            Assert.Equal(actual.ExcelFileName, expected.ExcelFileName);
            Assert.Collection(actual.CommunicationColumns,
                item => Assert.Equal(expected.CommunicationColumns.First().Name, item.Name));
            Assert.Collection(actual.ProductColumns,
               item => Assert.Equal(expected.ProductColumns.First().Name, item.Name));
        }


        [Fact]
        public async Task GetReportDetailsAsync_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var clientDate = fixture.Create<DateTime>();
            var reportTitle = string.Format(
                       ViewResources.LogStatistics_Detail_ExcelTitle,
                       ViewResources.MBCDailyLogStatisticsDetail,
                       clientDate.ToShortDateFormat(),
                       clientDate.ToShortDateFormat());

            var excelFileName = string.Format(
                       ViewResources.LogStatistics_Detail_ExcelFileName,
                       ViewResources.MBCDailyLogStatisticsDetail_FileName,
                       clientDate.ToShortDateFormatDash(),
                       clientDate.ToShortDateFormatDash());
            fixture.Customize<LogStatisticsDetailCriteria>(x => x.With(b => b.SiteType, 0));
            var criteria = fixture.Create<LogStatisticsDetailCriteria>();
            var logStatisticEntities = new List<StatisticsDetailbyDateModel>
            {
                new StatisticsDetailbyDateModel
                {
                    Bbm= "---",
                    CreatorName= null,
                    Email= "---",
                    Fax= "---",
                    Language= "Mandarin",
                    Line= "---",
                    MobilePhone= "---",
                    MobilePhoneAreaCode= "",
                    MobilePhoneCountryCode= "",
                    MSN= "---",
                    WhatsApp= "---",
                    Yahoo= "--"
                }
            };

            var expected = new StatisticsDetailReportByDateModel
            {
                Id = 0,
                ChildReports = logStatisticEntities,
                Name = reportTitle,
                ExcelFileName = excelFileName
            };
            var service = GetService();
            baseService.GetDataAsync<StatisticsDetailbyDateModel>(criteria).Returns(logStatisticEntities);
            commonService.ConvertToClientDateTime(Arg.Any<DateTime>()).Returns(clientDate);

            // Act
            var actual = await service.GetReportDetailsAsync(criteria);

            // Assert
            Assert.Equal(actual.Id, expected.Id);
            Assert.Equal(actual.ChildReports, expected.ChildReports);
            Assert.Equal(actual.Name, expected.Name);
            Assert.Equal(actual.ExcelFileName, expected.ExcelFileName);
        }

        #region Helpers
        private LogStatisticsService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            commonService = Substitute.For<ICommonService>();

            return new LogStatisticsService(baseService, commonService);
        }
        #endregion Helpers
    }
}
