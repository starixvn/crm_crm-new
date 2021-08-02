namespace CRM.Controllers.UnitTests.Feedback
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Constants;
    using CRM.Models.DeletedFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class DeletedFeedbackControllerTests
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
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DeleteFeedback, Policy.Host).Returns(true);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewModel = Assert.IsType<bool>(viewResult.Model);
            Assert.True(viewModel);
        }

        [Fact]
        public async Task SearchDeletedFeedback_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var param = fixture.Create<GetDeletedFeedbackParam>();
            var controller = GetController();
            feedbackService.GetDeletedFeedbackAsync(param).Returns(feedbacks);
            settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

            // Act
            var result = await controller.SearchDeletedFeedback(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var deletedFeedbacks = (IEnumerable<DeletedFeedback>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
            Assert.Equal(feedbacks, deletedFeedbacks);
            Assert.Equal(mainCategories, categories);
        }

        [Fact]
        public async Task ExportDeletedFeedbackReport_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var param = fixture.Create<GetDeletedFeedbackParam>();
            var fileName = $"{ViewResources.DeletedFeedbackReport_Title}.xlsx";
            var controller = GetController();
            feedbackService.GetDeletedFeedbackAsync(param).Returns(feedbacks);
            settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

            // Act
            var result = await controller.ExportDeletedFeedbackReport(param);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        private DeletedFeedbackController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            settingService = Substitute.For<ISettingService>();
            excelService = Substitute.For<IExportExcelService>();
            feedbackService = Substitute.For<IFeedbackService>();
            return new DeletedFeedbackController(napSession, napSettings, userService, excelService, settingService, feedbackService);
        }
    }
}