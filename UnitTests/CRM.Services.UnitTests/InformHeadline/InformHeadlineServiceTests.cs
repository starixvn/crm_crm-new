namespace CRM.Services.UnitTests.InformHeadline
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Criteria.InformHeadline;
    using CRM.Models.InformHeadline;
    using CRM.Services.InformHeadline;
    using NSubstitute;
    using Xunit;

    public class InformHeadlineServiceTests
    {
        private readonly IFixture fixture = new Fixture();
        private IBaseService baseService;
        private ICommonService commonService;

        [Fact]
        public async Task GetInformAsync_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var informs = fixture.Create<IEnumerable<InformHeadlineModel>>();
            var criteria = fixture.Create<GetInformHeadlinesCriteria>();
            foreach (var inform in informs)
            {
                inform.Title = "&lt;";
            }
            var service = GetService();
            baseService.GetDataAsync<InformHeadlineModel>(Arg.Do<GetInformHeadlinesCriteria>(x => criteria = x)).Returns(informs);

            // Act
            var actual = await service.GetInformAsync();

            // Assert
            Assert.Equal(informs, actual);
            Assert.All(actual, item =>
            {
                Assert.Equal("<", item.Title);
                Assert.Equal("Jan 01, 0001", item.ClientCreatedDate);
            });
        }

        [Fact]
        public async Task GetTitleDetailAsync_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var titleDetail = fixture.Create<InformTitleDetail>();
            var criteria = fixture.Create<GetInformTitleDetailCriteria>();
            var param = fixture.Create<int>();
            var service = GetService();
            baseService.GetDataEntityAsync<InformTitleDetail>(Arg.Do<GetInformTitleDetailCriteria>(x => criteria = x)).Returns(titleDetail);

            // Act
            var actual = await service.GetTitleDetailAsync(param);

            // Assert
            Assert.Equal(titleDetail, actual);
        }

        [Fact]
        public async Task GetInformStatuses_WhenCalled_ReturnExpectResult()
        {
            // Arrange
            var informStatus = fixture.Create<IEnumerable<InformStatus>>();
            var criteria = fixture.Create<GetInformStatusesCriteria>();
            var service = GetService();
            baseService.GetDataAsync<InformStatus>(Arg.Do<GetInformStatusesCriteria>(x => criteria = x)).Returns(informStatus);

            // Act
            var actual = await service.GetInformStatusesAsync(true);

            // Assert
            Assert.Equal(informStatus, actual);
            Assert.True(criteria.IsIncludeKeptForRefence);
        }

        [Fact]
        public async Task GetContactInforms_WhenCalled_ReturnExpectResult()
        {
            // Arrange
            var contactInforms = fixture.Create<IEnumerable<UpdateInform>>();
            var criteria = fixture.Create<GetContactInformsCriteria>();
            var param = fixture.Create<GetContactInformParam>();
            foreach (var contactInform in contactInforms)
            {
                contactInform.Remark = "&lt;";
            }
            var service = GetService();
            baseService.GetDataAsync<UpdateInform>(Arg.Do<GetContactInformsCriteria>(x => criteria = x)).Returns(contactInforms);

            // Act
            var actual = await service.GetContactInformsAsync(param);

            // Assert
            Assert.Equal(contactInforms, actual);
            Assert.All(actual, item =>
            {
                Assert.Equal("<", item.Remark);
                Assert.Equal("Jan 01, 0001 12:00:00 AM", item.ClientUpdatedTime);
            });
        }

        [Fact]
        public async Task GetSearchInforms_WhenCalled_ReturnExpectResult()
        {
            // Arrange
            var searchInforms = fixture.Create<IEnumerable<UpdateInform>>();
            var criteria = fixture.Create<GetSearchInformsCriteria>();
            var param = fixture.Create<GetSearchInformParam>();
            foreach (var searchInform in searchInforms)
            {
                searchInform.Remark = "&lt;";
            }
            var service = GetService();
            baseService.GetDataAsync<UpdateInform>(Arg.Do<GetSearchInformsCriteria>(x => criteria = x)).Returns(searchInforms);

            // Act
            var actual = await service.GetSearchInformsAsync(param);

            // Assert
            Assert.Equal(searchInforms, actual);
            Assert.All(actual, item =>
            {
                Assert.Equal("<", item.Remark);
                Assert.Equal("Jan 01, 0001 12:00:00 AM", item.ClientUpdatedTime);
            });
        }

        [Fact]
        public async Task GetRemovedAccountLogAsync_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var removeAccountLogs = fixture.Create<(IEnumerable<RemovedAccountLog> listRemoveAccount, int totalRows)>();
            var totalRows = fixture.Create<int>();
            var criteria = fixture.Create<GetRemovedAccountLogsCriteria>();
            var param = fixture.Create<GetRemovedAccountLogParam>();
            var service = GetService();
            baseService.GetDataAsync<RemovedAccountLog>(Arg.Do<GetRemovedAccountLogsCriteria>(x => criteria = x)).Returns(removeAccountLogs.listRemoveAccount);
            baseService.When(x => x.GetDataAsync<RemovedAccountLog>(Arg.Do<GetRemovedAccountLogsCriteria>(y => criteria = y)))
                .Do(x => criteria.TotalRows = totalRows);
            
            // Act
            var actual = await service.GetRemovedAccountLogAsync(param);

            // Assert
            Assert.Equal(removeAccountLogs.listRemoveAccount, actual.listRemoveAccount);
            Assert.Equal(criteria.TotalRows, actual.totalRows);
            Assert.All(actual.listRemoveAccount, item =>
            {
                Assert.Equal("Jan 01, 0001 12:00:00 AM", item.ClientLogDate);
            });
        }

        [Fact]
        public async Task GetRemovedAccountLogDetailAsync_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var removeAccountLogs = fixture.Create<(IEnumerable<RemovedAccountLogDetail> listRemoveAccountDetail, int totalRows)>();
            var totalRows = fixture.Create<int>();
            var criteria = fixture.Create<GetRemovedAccountLogDetailsCriteria>();
            var param = fixture.Create<GetRemovedAccountLogDetailParam>();
            var service = GetService();
            baseService.GetDataAsync<RemovedAccountLogDetail>(Arg.Do<GetRemovedAccountLogDetailsCriteria>(x => criteria = x)).Returns(removeAccountLogs.listRemoveAccountDetail);
            baseService.When(x => x.GetDataAsync<RemovedAccountLogDetail>(Arg.Do<GetRemovedAccountLogDetailsCriteria>(y => criteria = y)))
                .Do(x => criteria.TotalRows = totalRows);

            // Act
            var actual = await service.GetRemovedAccountLogDetailAsync(param);

            // Assert
            Assert.Equal(removeAccountLogs.listRemoveAccountDetail, actual.listRemoveAccountDetail);
            Assert.Equal(criteria.TotalRows, actual.totalRows);
            Assert.All(actual.listRemoveAccountDetail, item =>
            {
                Assert.Equal("Jan 01, 0001 12:00:00 AM", item.ClientUpdatedTime);
            });
        }

        [Fact]
        public async Task GetNewInformsAsync_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var newInforms = fixture.Create<IEnumerable<NewInform>>();
            var title = fixture.Create<string>();
            var criteria = fixture.Create<GetNewInformsCriteria>();
            var param = fixture.Create<GetNewInformParam>();
            var service = GetService();
            baseService.GetDataAsync<NewInform>(Arg.Do<GetNewInformsCriteria>(x => criteria = x)).Returns(newInforms);
            baseService.When(x => x.GetDataAsync<NewInform>(Arg.Do<GetNewInformsCriteria>(y => criteria = y)))
                .Do(x => criteria.Title = title);

            // Act
            var actual = await service.GetNewInformsAsync(param);

            // Assert
            Assert.Equal(newInforms, actual);
        }

        private InformHeadlineService GetService()
        {
            baseService = Substitute.For<IBaseService>();
            commonService = Substitute.For<ICommonService>();

            return new InformHeadlineService(baseService, commonService);
        }
    }
}
