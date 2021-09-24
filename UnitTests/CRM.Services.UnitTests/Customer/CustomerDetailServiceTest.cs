namespace CRM.Services.UnitTests.Customer
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models.Customer;
    using CRM.Models.Setting;
    using CRM.Services.Customer;
    using NSubstitute;
    using Xunit;

    public class CustomerDetailServiceTest
    {
        private IBaseService baseService;
        private ISettingService settingService;

        [Fact]
        public async Task GetCustomerInfoDetailByIdAsync_WhenCalled_ReturnExpectedCustomerInfo()
        {
            //Arrange
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var param = fixture.Create<GetCustomerInfoDetailByIdCriteria>();
            var customerInfoDetail = fixture.Create<IEnumerable<CustomerInfo>>();
            var customerLanguageInfo = fixture.Create<IEnumerable<CustomerLanguageInfo>>();

            var site = fixture.Create<SiteSetting>();
            var tuple = (customerInfoDetail, customerLanguageInfo);
            var service = GetCustomerService();
            baseService.FetchMultipleAsync<CustomerInfo, CustomerLanguageInfo>(Arg.Do<GetCustomerInfoDetailByIdCriteria>(x => param = x)).Returns(tuple);
            settingService.GetSiteByIdAsync(Arg.Any<int>()).Returns(site);
            var expected = customerInfoDetail.First();

            //Act
            var actual = await service.GetCustomerInfoDetailByIdAsync(param);

            //Assert
            Assert.Equal(expected, actual);
        }

        #region Helpers
        private CustomerDetailService GetCustomerService()
        {
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            return new CustomerDetailService(baseService, settingService);
        }

        #endregion Helpers
    }
}
