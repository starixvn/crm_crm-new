namespace CRM.Controllers.UnitTests.Feedback
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Constants;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class LatestFeedbackControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private ISettingService settingService;
        private IExportExcelService excelService;
        private IFeedbackService feedbackService;

        [Fact]
        public void Index_WhenCalled_ReturnAsExpectedResult()
        {
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(true);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewModel = Assert.IsType<bool>(viewResult.Model);
            Assert.True(viewModel);
        }

        [Fact]
        public async Task GetLatestFeedback_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var subCategories = new List<Setting>
            {
                new Setting { SettingId = 1, MainCategoryID = 1, Name = "Voiding Abnormal" }
            };
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var param = fixture.Create<GetLatestFeedbackParam>();
            var controller = GetController();
            feedbackService.GetLatestFeedbackAsync(param).Returns(feedbacks);
            settingService.GetSettingAsync(SettingName.MainCategory, true).Returns(mainCategories);
            settingService.GetSubCategoryAsync().Returns(subCategories);

            // Act
            var result = await controller.GetLatestFeedback(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var latestFeedbacks = (IEnumerable<DeletedFeedback>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
            Assert.Equal(feedbacks, latestFeedbacks);
            Assert.Equal(mainCategories, categories);
        }

        [Fact]
        public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var subCategories = new List<Setting>
            {
                new Setting { SettingId = 1, MainCategoryID = 1, Name = "Voiding Abnormal" }
            };
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var param = fixture.Create<GetLatestFeedbackParam>();
            var fileName = $"Top_{param.Top}_Feedback.xlsx";
            var controller = GetController();
            feedbackService.GetLatestFeedbackAsync(param).Returns(feedbacks);
            settingService.GetSettingAsync(SettingName.MainCategory, true).Returns(mainCategories);
            settingService.GetSubCategoryAsync().Returns(subCategories);

            // Act
            var result = await controller.ExportExcel(param);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        #region Helpers

        private LatestFeedbackController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            settingService = Substitute.For<ISettingService>();
            excelService = Substitute.For<IExportExcelService>();
            feedbackService = Substitute.For<IFeedbackService>();
            return new LatestFeedbackController(napSession, napSettings, userService, excelService, settingService, feedbackService);
        }

        #endregion Helpers
    }
}