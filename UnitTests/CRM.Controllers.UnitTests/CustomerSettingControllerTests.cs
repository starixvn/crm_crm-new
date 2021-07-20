namespace CRM.Controllers.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models.Customer;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class CustomerSettingControllerTests
    {
        private IBaseService baseService;
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task VerifyUsername_WhenCalled_ReturnExpectedJsonResult()
        {
            // Arrange
            var controler = GetController();
            var criteria = fixture.Create<VerifyRelatedCustomerCriteria>();
            var expected = fixture.Create<IEnumerable<RelatedCustomer>>();
            baseService.GetDataAsync<RelatedCustomer>(criteria).Returns(expected);

            // Act
            var result = await controler.VerifyUsername(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<RelatedCustomer>>(jsonResult.Value);
            Assert.Equal(expected, actual);
        }

        #region Helpers

        private CustomerSettingController GetController()
        {
            baseService = Substitute.For<IBaseService>();
            return new CustomerSettingController(baseService);
        }

        #endregion Helpers
    }
}