namespace CRM.BackgroundJob.UnitTests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.BackgroundJob.Criteria.WinLossLimit;
    using CRM.BackgroundJob.Models.WinLossLimit;
    using Microsoft.Extensions.Configuration;
    using CRM.Core.Services;
    using Fanex.CRM.BackgroundJob.Criteria;
    using Fanex.CRM.BackgroundJob.Models;
    using Fanex.CRM.BackgroundJob.Repositories;
    using Fanex.CRM.BackgroundJob.Services;
    using NSubstitute;
    using Xunit;
    using CRM.BackgroundJob.Models.TurnoverControll;
    using CRM.BackgroundJob.Criteria.TurnoverControll;
    using Fanex.CRM.BackgroundJob.Constants;

    public class CustomerServiceTests
    {
        private ICustomerRepository repository;
        private IBaseService baseService;
        private IConfiguration configuration;

        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task GetCustomerInfoAsync_WhenCalled_ReturnExpectedCustomer()
        {
            // Arrange
            var expected = fixture.Create<CustomerInfo>();
            var username = fixture.Create<string>();
            var isGuest = fixture.Create<bool>();
            var criteria = new GetCustomerInfoByUsernameCriteria();
            var service = GetService();
            repository.GetCustomerInfoByUsernameAsync(Arg.Do<GetCustomerInfoByUsernameCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetCustomerInfoAsync(username, isGuest);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(username, criteria.Username);
            Assert.Equal(isGuest, criteria.IsGuest);
            Assert.Equal(BackgroundJobConstants.UserRole, criteria.UserRole);
        }

        [Fact]
        public async Task GetGroupHeadlineAsync_WhenCalled_ReturnExpectedHeadlines()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<GroupHeadline>>();
            var custIds = fixture.Create<IEnumerable<int>>();
            var criteria = new GetGroupHeadlineCriteria();
            var service = GetService();
            baseService.GetDataAsync<GroupHeadline>(Arg.Do<GetGroupHeadlineCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetGroupHeadlineAsync(custIds);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(string.Join(",", custIds), criteria.CustIds);
        }

        [Fact]
        public async Task GetListSMANotificationAsync_NotExistEnviroment_ReturnDefault()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<TONotification>>();
            var criteria = new GetTOControlCustNotificationSelCriteria();
            var setting = fixture.Create<WinLossSystemSetting>();
            var service = GetService();
            baseService.GetDataAsync<TONotification>(Arg.Do<GetTOControlCustNotificationSelCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetListSMANotificationAsync(setting);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(setting.BatchSize, criteria.BatchSize);
            Assert.Equal(setting.ConfigUAT, criteria.ConfigUAT);
            Assert.Equal(setting.ConfigPRO, criteria.ConfigPRO);
            Assert.Equal(setting.LastLogId, criteria.LastLogID);
            Assert.Equal(setting.IsCredit, criteria.IsCredit);
            Assert.Equal(setting.IsDeposit, criteria.IsDeposit);
            Assert.Equal(BackgroundJobConstants.DefaultEnvironment, criteria.Environment);
        }

        [Fact]
        public async Task GetListSMANotificationAsync_ExistEnviroment_ReturnExpectedEniroment()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<TONotification>>();
            var criteria = new GetTOControlCustNotificationSelCriteria();
            var setting = fixture.Create<WinLossSystemSetting>();
            var service = GetService();
            baseService.GetDataAsync<TONotification>(Arg.Do<GetTOControlCustNotificationSelCriteria>(x => criteria = x)).Returns(expected);
            configuration.GetValue<string>("SiteEnvironment").Returns("LIVE");
            // Act
            var actual = await service.GetListSMANotificationAsync(setting);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(setting.BatchSize, criteria.BatchSize);
            Assert.Equal(setting.ConfigUAT, criteria.ConfigUAT);
            Assert.Equal(setting.ConfigPRO, criteria.ConfigPRO);
            Assert.Equal(setting.LastLogId, criteria.LastLogID);
            Assert.Equal(setting.IsCredit, criteria.IsCredit);
            Assert.Equal(setting.IsDeposit, criteria.IsDeposit);
        }


        [Fact]
        public async Task GetListCustReachLimitAsync_WhenCalled_ReturnExpectedLimitInfor()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<CustomerWinLimit>>();
            var criteria = new GetListCustomerReachLimitCriteria();
            var setting = fixture.Create<WinLossSystemSetting>();
            var service = GetService();
            baseService.GetDataAsync<CustomerWinLimit>(Arg.Do<GetListCustomerReachLimitCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetListCustReachLimitAsync(setting);

            // Assert
            Assert.Equal(expected, actual);
            Assert.Equal(setting.BatchSize, criteria.BatchSize);
            Assert.Equal(setting.ConfigUAT, criteria.ConfigUAT);
            Assert.Equal(setting.ConfigPRO, criteria.ConfigPRO);
            Assert.Equal(setting.LastLogId, criteria.LastLogID);
            Assert.Equal(setting.IsCredit, criteria.IsCredit);
            Assert.Equal(setting.IsDeposit, criteria.IsDeposit);
            Assert.Equal(BackgroundJobConstants.DefaultEnvironment, criteria.Environment);
        }

        [Fact]
        public async Task GetListCustOutStandingAsync_WhenCalled_ReturnExpectedOutStanding()
        {
            // Arrange
            var expected = fixture.Create<IEnumerable<CustOutStanding>>();
            var criteria = new GetTOControllCustOutstandingCriteria();
            var custNotifications = fixture.Create<IEnumerable<TONotification>>();
            var service = GetService();
            baseService.GetDataAsync<CustOutStanding>(Arg.Do<GetTOControllCustOutstandingCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetListCustOutStandingAsync(custNotifications);

            // Assert
            Assert.Equal(expected, actual);
        }
        #region Helpers

        private CustomerService GetService()
        {
            repository = Substitute.For<ICustomerRepository>();
            baseService = Substitute.For<IBaseService>();
            configuration = Substitute.For<IConfiguration>();

            return new CustomerService(repository, baseService, configuration);
        }

        #endregion Helpers
    }
}