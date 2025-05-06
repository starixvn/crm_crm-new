using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Constants;
using CRM.Controllers.HeadlineNotification;
using CRM.Models;
using CRM.Models.ManageSmaFeedback;
using CRM.Services;
using CRM.Services.ExportExcel;
using CRM.Services.Interfaces;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Xunit;

namespace CRM.Controllers.UnitTests
{
    public class ManageSmaFeedbackControllerTests
    {
        private IManageSmaFeedbackService manageSmaFeedbackService;
        private IExportExcelService excelService;
        private IPermissionService permissionService;
        private ISettingService settingService;
        private INapSession napSession;
        private readonly IFixture fixture = new Fixture();

        [Fact]
        public async Task GetSmaFeedback_ShouldReturnJsonResult()
        {
            // Arrange
            var controller = GetController();
            var param = fixture.Create<GetSmaFeedbackInfo>();
            param.TotalRows = 1;
            var feedbackInfos = new List<SmaFeedbackInfo>
            {
                new SmaFeedbackInfo { CustID = 1, Username = "testuser" }
            };
            manageSmaFeedbackService.GetSmaFeedbackAsync(param).Returns(feedbackInfos);

            // Act
            var result = await controller.GetSmaFeedback(param);

            // Assert
            Assert.NotNull(result);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(1, totalItems);
        }

        [Fact]
        public async Task EditSmaFeedback_ShouldReturnJsonResult()
        {
            // Arrange
            var controller = GetController();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            controller.ControllerContext.HttpContext = clientIP;
            var param = new EditSmaFeedback
            {
                CustID = 1,
                ReviewStatusID = 1,
                Discussion = "Solution discussed"
            };
            var commandResult = new CommandResult { Code = 0, Message = "Success" };
            manageSmaFeedbackService.EditSmaFeedbackAsync(param).Returns(commandResult);

            // Act
            var result = await controller.EditSmaFeedback(param) as JsonResult;

            // Assert
            Assert.NotNull(result);
            var jsonResult = result.Value as CommandResult;
            Assert.True(jsonResult.IsSuccessful);
            Assert.Equal(0, jsonResult.Code);
            Assert.Equal("Success", jsonResult.Message);
        }

        [Fact]
        public async Task ExportExcel_ShouldReturnFileResult()
        {
            // Arrange
            var controller = GetController();
            var param = fixture.Create<GetSmaFeedbackInfo>();
            var feedbackInfos = new List<SmaFeedbackInfo>
            {
                new SmaFeedbackInfo { CustID = 1, Username = "testuser" }
            };
            var expected = fixture.Create<byte[]>();
            manageSmaFeedbackService.GetSmaFeedbackAsync(param).Returns(feedbackInfos);
            excelService.ExportManageSMAFeedback(Arg.Any<IEnumerable<SmaFeedbackInfo>>(), Arg.Any<string>()).Returns(expected);

            // Act
            var result = await controller.ExportExcel(param) as FileContentResult;

            // Assert
            Assert.Equal(expected, result.FileContents);
            Assert.Equal(MimeType.XLSX, result.ContentType);
        }

        #region helper

        private ManageSmaFeedbackController GetController()
        {
            manageSmaFeedbackService = Substitute.For<IManageSmaFeedbackService>();
            excelService = Substitute.For<IExportExcelService>();
            permissionService = Substitute.For<IPermissionService>();
            settingService = Substitute.For<ISettingService>();
            napSession = Substitute.For<INapSession>();

            return new ManageSmaFeedbackController(
                manageSmaFeedbackService,
                permissionService,
                napSession,
                settingService,
                excelService
            );
        }

        #endregion helper
    }
}
