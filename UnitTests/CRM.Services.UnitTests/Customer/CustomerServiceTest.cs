namespace CRM.Services.UnitTests.Customer
{
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models;
    using CRM.Models.Customer;
    using CRM.Services.Customer;
    using NSubstitute;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Xunit;

    public class CustomerServiceTest
    {
        private IBaseService baseService;

        [Fact]
        public async Task GetCustomerInfoAsync_WhenCalledWithIsNotGuest_ReturnExpectedCustomerInfo()
        {
            //Arrange
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var param = new GetCustomerInfoByUsernameCriteria { Username = "test", IsGuest = false };
            var customerInfo = fixture.Create<IEnumerable<CustomerInfo>>();
            var languages = fixture.Create<List<int>>();
            var tuple = new ValueTuple<IEnumerable<CustomerInfo>, List<int>>
                (customerInfo, languages);
            var service = GetCustomerService();
            baseService.FetchMultipleAsync<CustomerInfo, int>(Arg.Do<GetCustomerInfoByUsernameCriteria>(x => param = x)).Returns(tuple);
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
            var tuple = new ValueTuple<IEnumerable<CustomerInfo>, List<int>>
                (customerInfo, languages);
            var service = GetCustomerService();
            baseService.FetchMultipleAsync<CustomerInfo, int>(Arg.Do<GetCustomerInfoByUsernameCriteria>(x => param = x)).Returns(tuple);
            var expected = customerInfo.First();
            
            //Act
            var actual = await service.GetCustomerInfoAsync(param);

            //Assert
            Assert.Equal(expected, actual);
            Assert.Equal(new List<CustomerInfo>(), actual.UplineInfo);
        }

        [Fact]
        public async Task GetUplineInfoOfUser_WhenCall_ReturnExpectedUplineInfo()
        {
            //Arrange
            var fixture = new Fixture();
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var expected = fixture.Create<IEnumerable<CustomerInfo>>();
            var service = GetCustomerService();
            var criteria = new GetUplineInfoOfUserCriteria();
            var param = fixture.Create<GetUplineInfoOfUserCriteria>();
            baseService.GetDataAsync<CustomerInfo>(Arg.Do<GetUplineInfoOfUserCriteria>(x => param = x)).Returns(expected);

            //Act
            var actual = await service.GetUplineInfoOfUser(param);

            //Assert
            Assert.Equal(expected, actual);
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

        

        #region Helpers

        private CustomerService GetCustomerService()
        {
            baseService = Substitute.For<IBaseService>();
            var service = new CustomerService(baseService);

            return service;
        }

        #endregion Helpers
    }
}
