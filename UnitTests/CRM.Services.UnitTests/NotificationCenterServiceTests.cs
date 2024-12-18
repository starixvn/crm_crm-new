namespace CRM.Services.UnitTests
{
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.NotificationCenter;
    using CRM.Models.NotificationCenter;
    using CRM.Services.NotificationCenter;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using NSubstitute;
    using Xunit;

    public class NotificationCenterServiceTests
    {
        private INapSession napSession;
        private IBaseService baseService;
        private IConfiguration configuration;
        private readonly Fixture fixture = new Fixture();

        [Fact]
        public async Task GetResultAdmNotificationAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var service = GetService();
            var param = fixture.Create<GetResultAdmNotification>();
            var expected = fixture.Create<(IEnumerable<ResultAdmNotification>, IEnumerable<ResultAdmSite>)>();
            var criteria = fixture.Create<GetResultAdmNotificationCriteria>();
            baseService.FetchMultipleAsync<ResultAdmNotification, ResultAdmSite>(Arg.Do<GetResultAdmNotificationCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetResultAdmNotificationAsync(param);

            // Assert
            Assert.Equal(expected.Item1, actual.notifications);
            Assert.Equal(expected.Item2, actual.allSite);
        }

        [Fact]
        public async Task GetResultAdmNotificationByIdAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var service = GetService();
            var id = fixture.Create<int>();
            var sitePermission = fixture.Create<string>();
            var licenseeType = fixture.Create<short>();
            var criteria = fixture.Create<GetResultAdmNotiByIdCriteria>();
            var expected = fixture.Create<(IEnumerable<ResultAdmNotificationDetail>, IEnumerable<ResultAdmSite>)>();
            baseService.FetchMultipleAsync<ResultAdmNotificationDetail, ResultAdmSite>(Arg.Do<GetResultAdmNotiByIdCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetResultAdmNotificationByIdAsync(id, sitePermission, licenseeType);

            // Assert
            Assert.Equal(expected.Item1, actual.notificationDetails);
            Assert.Equal(expected.Item2, actual.sites);
        }

        [Fact]
        public async Task EditResultAdmNotificationAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            byte[] fileBytes = new byte[128];

            IFormFile file = new FormFile(
                baseStream: new MemoryStream(fileBytes),
                baseStreamOffset: 0,
                length: fileBytes.Length,
                name: "myFile",
                fileName: "myFile.txt");

            var service = GetService();
            var param = new EditResultAdmNotification
            {
                NotificationId = 1,
                FormFile = new List<IFormFile> { file }
            };
            var expected = fixture.Create<CommandResult>();
            var command = fixture.Create<EditResultAdmNotificationCommand>();
            baseService.ExecuteNonQueryAsync(Arg.Do<EditResultAdmNotificationCommand>(x => command = x)).Returns(expected);

            // Act
            var actual = await service.EditResultAdmNotificationAsync(param);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task EditResultAdmStatusAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var service = GetService();
            var param = fixture.Create<EditResultAdmNotiStatus>();
            var expected = fixture.Create<CommandResult>();
            var command = fixture.Create<EditResultAdmNotiStatusCommand>();
            baseService.ExecuteNonQueryAsync(Arg.Do<EditResultAdmNotiStatusCommand>(x => command = x)).Returns(expected);

            // Act
            var actual = await service.EditResultAdmStatusAsync(param);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task GetSiteTicketsByIdAsync_WhenCalled_ReturnExpected()
        {
            // Arrange
            var service = GetService();
            var id = fixture.Create<int>();
            var sitePermission = fixture.Create<string>();
            var licenseeType = fixture.Create<short>();
            var criteria = fixture.Create<GetSiteTicketByIdCriteria>();
            var expected = fixture.Create<IEnumerable<AdmSiteTicket>>();
            baseService.GetDataAsync<AdmSiteTicket>(Arg.Do<GetSiteTicketByIdCriteria>(x => criteria = x)).Returns(expected);

            // Act
            var actual = await service.GetSiteTicketsByIdAsync(id, sitePermission, licenseeType);

            // Assert
            Assert.Equal(expected, actual);
        }

        #region Helpers
        private NotificationCenterService GetService()
        {
            napSession = Substitute.For<INapSession>();
            baseService = Substitute.For<IBaseService>();
            configuration = Substitute.For<IConfiguration>();

            return new NotificationCenterService(napSession, baseService, configuration);
        }
        #endregion Helpers
    }
}
