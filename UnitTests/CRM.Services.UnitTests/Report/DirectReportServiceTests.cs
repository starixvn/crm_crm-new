namespace CRM.Services.UnitTests.Report
{
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Criteria.Report.DirectCustomerReport;
    using CRM.Services.Report;
    using NSubstitute;
    using System.Threading.Tasks;
    using Xunit;

    public class DirectReportServiceTests
    {
        private IBaseService baseService;

        [Fact]
        public async Task GetAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<DirectCustomerReportCriteria>();
            criteria.ExcludeIgnoredAcc = true;
            criteria.Username = null;
            criteria.Headline = null;
            criteria.PageIndex = 0;
            criteria.PageSize = 0;
            var service = GetService();

            // Act
            var result = await service.GetReport(criteria);

            // Assert
            Assert.Equal(criteria.TotalRows, result.TotalCustomer);
        }

        #region Helpers
        private DirectReportService GetService()
        {
            baseService = Substitute.For<IBaseService>();

            return new DirectReportService(baseService);
        }
        #endregion Helpers
    }
}
