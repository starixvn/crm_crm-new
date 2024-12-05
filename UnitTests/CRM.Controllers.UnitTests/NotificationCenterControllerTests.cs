namespace CRM.Controllers.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.NotificationCenter;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Models.NotificationCenter;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.NotificationCenter;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class NotificationCenterControllerTests
    {
        private INotificationCenterService notificationCenterService;
        private IExportExcelService excelService;
        private IPermissionService permissionService;
        private IWebHostEnvironment hostingEnvironment;


        private readonly Fixture fixture = new Fixture();

        [Fact]
        public async Task GetResultAdmNotification_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var param = fixture.Create<GetResultAdmNotification>();
            var expected = fixture.Create<(IEnumerable<ResultAdmNotification>, IEnumerable<ResultAdmSite>)>();
            notificationCenterService.GetResultAdmNotificationAsync(param).Returns(expected);

            // Act
            var result = await controller.GetResultAdmNotification(param) as JsonResult;
            var notifications = result.Value.GetType().GetProperty("data").GetValue(result.Value);
            var allSite = result.Value.GetType().GetProperty("allSite").GetValue(result.Value);
            var totalItems = result.Value.GetType().GetProperty("totalItems").GetValue(result.Value);

            // Assert
            Assert.Equal(expected.Item1, notifications);
            Assert.Equal(expected.Item2, allSite);
            Assert.Equal(param.TotalRows, totalItems);
        }

        [Fact]
        public async Task GetResultAdmNotificationById_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var id = fixture.Create<int>();
            var sitePermission = fixture.Create<string>();
            var licenseeType = fixture.Create<short>();
            var expected = fixture.Create<(IEnumerable<ResultAdmNotificationDetail>, IEnumerable<ResultAdmSite>)>();
            permissionService.GetCurrentUserCreditPermissionsAsync().Returns(sitePermission);
            permissionService.GetCurrentUserLicenseeTypeAsync().Returns(licenseeType);
            notificationCenterService.GetResultAdmNotificationByIdAsync(id, sitePermission, licenseeType).Returns(expected);

            // Act
            var result = await controller.GetResultAdmNotificationById(id) as JsonResult;
            var notificationDetails = result.Value.GetType().GetProperty("notificationDetails").GetValue(result.Value);
            var sites = result.Value.GetType().GetProperty("sites").GetValue(result.Value);

            // Assert
            Assert.Equal(expected.Item1, notificationDetails);
            Assert.Equal(expected.Item2, sites);
        }

        [Fact]
        public async Task EditResultAdmNotification_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var param = fixture.Create<EditResultAdmNotification>();
            var expected = fixture.Create<CommandResult>();
            notificationCenterService.EditResultAdmNotificationAsync(param).Returns(expected);

            // Act
            var result = await controller.EditResultAdmNotification(param) as JsonResult;
            Assert.Equal(expected, result.Value);
        }

        [Fact]
        public async Task EditResultAdmStatus_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var param = fixture.Create<EditResultAdmNotiStatus>();
            var expected = fixture.Create<CommandResult>();
            notificationCenterService.EditResultAdmStatusAsync(param).Returns(expected);

            // Act
            var result = await controller.EditResultAdmStatus(param) as JsonResult;
            Assert.Equal(expected, result.Value);
        }

        [Fact]
        public async Task GetSiteTicketsById_WhenCalled_ExpectReturnsJson()
        {
            // Arrange
            var controller = GetController();
            var id = fixture.Create<int>();
            var sitePermission = fixture.Create<string>();
            var licenseeType = fixture.Create<short>();
            var expected = fixture.Create<IEnumerable<AdmSiteTicket>>();
            permissionService.GetCurrentUserCreditPermissionsAsync().Returns(sitePermission);
            permissionService.GetCurrentUserLicenseeTypeAsync().Returns(licenseeType);
            notificationCenterService.GetSiteTicketsByIdAsync(id, sitePermission, licenseeType).Returns(expected);

            // Act
            var result = await controller.GetSiteTicketsById(id) as JsonResult;

            // Assert
            Assert.Equal(expected, result.Value);
        }

        [Fact]
        public async Task ExportExcel_WhenCalled_ExpectReturnsFile()
        {
            // Arrange
            var controller = GetController();
            var param = fixture.Create<ExcelSiteTicket>();
            var sitePermission = fixture.Create<string>();
            var licenseeType = fixture.Create<short>();
            var data = fixture.Create<IEnumerable<AdmSiteTicket>>();
            var expected = fixture.Create<byte[]>();
            var eventTime = param.EventTime.ToShortDateFormatDash();
            var reportName = string.Format(ViewResources.MncAffectedTicketFileName, eventTime);
            var fileName = $"{reportName}.xlsx";
            permissionService.GetCurrentUserCreditPermissionsAsync().Returns(sitePermission);
            permissionService.GetCurrentUserLicenseeTypeAsync().Returns(licenseeType);
            notificationCenterService.GetSiteTicketsByIdAsync(param.NotificationId, sitePermission, licenseeType).Returns(data);
            excelService.ExportSiteTicket(data, eventTime, param.EventName).Returns(expected);

            // Act
            var result = await controller.ExportExcel(param) as FileContentResult;

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(expected, result.FileContents);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        #region helper
        public NotificationCenterController GetController()
        {
            notificationCenterService = Substitute.For<INotificationCenterService>();
            excelService = Substitute.For<IExportExcelService>();
            permissionService = Substitute.For<IPermissionService>();
            hostingEnvironment = Substitute.For<IWebHostEnvironment>();

            return new NotificationCenterController(
                notificationCenterService,
                excelService,
                permissionService,
                hostingEnvironment
            );
        }
        #endregion helper
    }
}
