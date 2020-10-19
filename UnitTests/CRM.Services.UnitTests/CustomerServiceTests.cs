namespace CRM.Services.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models;
    using NSubstitute;
    using Xunit;

    public class CustomerServiceTests
    {
        private IBaseService baseService;
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task VerifyUsernameAsync_WhenCalled_ReturnAsExpected()
        {
            // Arrange
            var criteria = fixture.Create<VerifyRelatedCustomerCriteria>();
            var expected = fixture.Create<IEnumerable<BaseModel>>();
            var service = GetService();
            baseService.GetDataAsync<BaseModel>(criteria).Returns(expected);

            // Act
            var actual = await service.VerifyUsernameAsync(criteria);

            // Assert
            Assert.Equal(expected, actual);
        }

        #region Helpers

        private CustomerService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            return new CustomerService(baseService);
        }

        #endregion Helpers
    }
}