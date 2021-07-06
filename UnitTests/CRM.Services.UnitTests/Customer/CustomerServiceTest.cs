namespace CRM.Services.UnitTests.Customer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Criteria.Setting;
    using CRM.Models.Customer;
    using CRM.Models.Setting;
    using CRM.Services.Customer;
    using NSubstitute;
    using Xunit;

    public class CustomerServiceTest
    {
        private IBaseService baseService;
        private ISettingService settingService;

        [Fact]
        public async Task GetCustomerInfoAsync_WhenCalledWithIsNotGuest_ReturnExpectedCustomerInfo()
        {
            //Arrange
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var param = new GetCustomerInfoByUsernameCriteria { Username = "test", IsGuest = false };
            var customerInfo = fixture.Create<IEnumerable<CustomerInfo>>();
            var languages = fixture.Create<List<int>>();
            var setting = fixture.Create<SiteSetting>();
            var paramSetting = fixture.Create<GetSettingByIdCriteria>();
            var tuple = new ValueTuple<IEnumerable<CustomerInfo>, List<int>>
                (customerInfo, languages);
            var service = GetCustomerService();
            baseService.FetchMultipleAsync<CustomerInfo, int>(Arg.Do<GetCustomerInfoByUsernameCriteria>(x => param = x)).Returns(tuple);
            settingService.GetSettingById(Arg.Do<GetSettingByIdCriteria>(x => paramSetting = x)).Returns(setting);
            var expected = customerInfo.First();
            //Act
            var actual = await service.GetCustomerInfoAsync(param);

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetCustomerInfoAsync_WhenCalledWithIsGuest_ReturnExpectedCustomerInfo()
        {
            //Arrange
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var param = new GetCustomerInfoByUsernameCriteria { Username = "test", IsGuest = true };
            var customerInfo = fixture.Create<IEnumerable<CustomerInfo>>();
            var languages = fixture.Create<List<int>>();
            var setting = fixture.Create<SiteSetting>();
            var paramSetting = fixture.Create<GetSettingByIdCriteria>();
            var tuple = new ValueTuple<IEnumerable<CustomerInfo>, List<int>>
                (customerInfo, languages);
            var service = GetCustomerService();
            baseService.FetchMultipleAsync<CustomerInfo, int>(Arg.Do<GetCustomerInfoByUsernameCriteria>(x => param = x)).Returns(tuple);
            settingService.GetSettingById(Arg.Do<GetSettingByIdCriteria>(x => paramSetting = x)).Returns(setting);
            var expected = customerInfo.First();

            //Act
            var actual = await service.GetCustomerInfoAsync(param);

            //Assert
            Assert.Equal(expected, actual);
            Assert.Equal(setting.Name, actual.SiteSetting.Name);
            Assert.Equal(new List<CustomerInfo>(), actual.UplineInfo);
        }


        [Fact]
        public async Task UpdateCustomerInfoAsync_WhenCall_ReturnExpectedCommand()
        {
            //Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var service = GetCustomerService();
            var param = fixture.Create<UpdateCustomerInfoCommand>();
            baseService.ExecuteNonQueryAsync(Arg.Do<UpdateCustomerInfoCommand>(x => param = x)).Returns(expected);

            //Act
            var actual = await service.UpdateCustomerInfoAsync(param);

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetCustomerAutoSuggestionAsync_WhenCall_ReturnExpectedCommand()
        {
            //Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<IEnumerable<string>>();
            var service = GetCustomerService();
            var param = fixture.Create<CustomerSuggestionCriteria>();
            baseService.GetDataAsync<string>(Arg.Do<CustomerSuggestionCriteria>(x => param = x)).Returns(expected);

            //Act
            var actual = await service.GetCustomerAutoSuggestionAsync(param);

            //Assert
            Assert.Equal(expected, actual);
        }

        #region Helpers

        private CustomerService GetCustomerService()
        {
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            var service = new CustomerService(baseService, settingService);

            return service;
        }

        #endregion Helpers
    }
}