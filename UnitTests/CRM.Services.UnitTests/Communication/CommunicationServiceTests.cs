namespace CRM.Services.UnitTests.Communication
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Services;
    using CRM.Criteria.Communication;
    using CRM.Models.CommunicationLogs;
    using CRM.Services.Communication;
    using NSubstitute;
    using Xunit;

    public class CommunicationServiceTests
    {
        private readonly IFixture fixture = new Fixture();
        private IBaseService baseService;
        private ICommonService commonService;

        [Fact]
        public async Task GetLogsByCustomerIdAsync_WhenCalled_ReturnExpectedResult()
        {
            //Arrange
            var param = fixture.Create<GetLogsByCustomerIdCriteria>();
            var communicationLogInfos = fixture.Create<IEnumerable<CommunicationLog>>();
            var settingItems = fixture.Create<IEnumerable<CommunicationSettingRelation>>();

            var tuple = (communicationLogInfos, settingItems);
            var service = GetCommunicationService();
            baseService.FetchMultipleAsync<CommunicationLog, CommunicationSettingRelation>(Arg.Do<GetLogsByCustomerIdCriteria>(x => param = x)).Returns(tuple);

            //Act
            var actual = await service.GetLogsByCustomerIdAsync(param);

            //Assert
            Assert.Equal(communicationLogInfos, actual);
        }

        #region Helpers
        private CommunicationService GetCommunicationService()
        {
            baseService = Substitute.For<IBaseService>();
            commonService = Substitute.For<ICommonService>();
            return new CommunicationService(baseService, commonService);
        }

        #endregion Helpers
    }
}
