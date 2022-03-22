namespace CRM.Services.UnitTests.Report
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Criteria.Report.LogStatistics;
    using CRM.Models;
    using CRM.Models.Report.LogStatistics;
    using CRM.Services.Report;
    using NSubstitute;

    public class LogStatisticsServiceTests
    {
        private readonly IFixture fixture = new Fixture();
        private IBaseService baseService;
        private ICommonService commonService;

        public async Task GetReportDataAsync_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var clientDate = fixture.Create<DateTime>();
            var serverDate = fixture.Create<DateTime>();
            fixture.Customize<LogStatisticsCriteria>(x => x.With(b => b.SiteType, 0));
            var criteria = fixture.Create<LogStatisticsCriteria>();
            var expected = new LogStatisticsViewModel
            {
                Name = "test",
                ExcelFileName = "test",
                CommunicationColumns = new List<BaseModel> { new BaseModel { Id = 1, Name = "test" } },
                ProductColumns = new List<BaseModel> { new BaseModel { Id = 1, Name = "test" } },
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
            commonService.ConvertToServerDateTime(Arg.Any<DateTime>()).Returns(serverDate);

            // Act
            var actual = await service.GetReportDataAsync(criteria);

            // Assert
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
