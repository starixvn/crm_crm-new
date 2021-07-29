namespace CRM.Controllers.UnitTests.Feedback
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Constants;
    using CRM.Models.Feedback;
    using CRM.Models.DeletedFeedback;
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
    using CRM.Resources;

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
        public async Task GetAllSettings_WhenCalled_ReturnAsExpectedJson()
        {
            // Arrange
            var customerType = new List<Setting> { new Setting { Id = 1 } };
            var customerResponse = new List<SettingRelation>{ new SettingRelation { Id = 1, IsActive = false },};
            var mainCategory = new List<Setting> { new Setting { Id = 1 } };
            var subCategory = new List<Setting> { new Setting { Id = 1 } };
            var communication = new List<Setting> { new Setting { Id = 1 } };
            var status = new List<FeedbackStatus>{ new FeedbackStatus { StatusId = 11002, Name = "Closed", IsActive = true }};
            var controller = GetController();
            settingService.GetAllCustomerTypes().Returns(customerType);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(customerResponse);
            settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategory);
            settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategory);
            settingService.GetCommunicationToolAsync(SettingConstants.Active, true).Returns(communication);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(status);
            
            // Act
            var result = await controller.GetAllSettings();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var settingsResult = jsonResult.Value;

            var expected = new
            {
                customerType,
                customerResponse,
                mainCategory,
                subCategory,
                communication,
                status
            };
            expected.Equals(settingsResult);  
        }
        
        [Fact]
        public async Task SearchDeletedFeedback_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var subCategories = new List<Setting>
            {
                new Setting { SettingId = 1, MainCategoryID = 1, Name = "MA Notification" }
            };
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var param = fixture.Create<GetDeletedFeedbackParam>();
            var controller = GetController();
            feedbackService.GetDeletedFeedbackAsync(param).Returns(feedbacks);
            settingService.GetSubCategoryAsync().Returns(subCategories);
            settingService.GetSettingAsync(SettingName.MainCategory, true).Returns(mainCategories);
            

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
            var subCategories = new List<Setting>
            {
                new Setting { SettingId = 1, MainCategoryID = 1, Name = "MA Notification" }
            };
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var param = fixture.Create<GetDeletedFeedbackParam>();
            var fileName = $"{ViewResources.DeletedFeedbackReport_Title}.xlsx";
            var controller = GetController();
            feedbackService.GetDeletedFeedbackAsync(param).Returns(feedbacks);
            settingService.GetSettingAsync(SettingName.MainCategory, true).Returns(mainCategories);
            settingService.GetSubCategoryAsync().Returns(subCategories);

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
