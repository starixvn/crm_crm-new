namespace CRM.Controllers.UnitTests.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Constants;
    using CRM.Criteria.Feedback.ManageFeedback;
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

    public class ManageFeedbackControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private ISettingService settingService;
        private IFeedbackService feedbackService;
        private IExportExcelService exportExcelService;

        [Fact]
        public void Index_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(true);

            // Act
            var actual = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(actual);
            var viewModel = Assert.IsType<bool>(viewResult.Model);
            Assert.True(viewModel);
        }

        [Fact]
        public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange            
            var responses = new List<SettingRelation> { new SettingRelation { Id = 1, IsActive = false }, };
            var mainCategories = new List<Setting> { new Setting { Id = 1 } };
            var subCategories = new List<Setting> { new Setting { Id = 1 } };
            var communications = new List<Setting> { new Setting { Id = 1 } };
            var customerTypes = new List<Setting> { new Setting { Id = 1 } };
            var status = new List<FeedbackStatus> { new FeedbackStatus { StatusId = 1 } };
            var controller = GetController();
            settingService.GetAllCustomerTypes().Returns(customerTypes);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response).Returns(responses);
            settingService.GetMainCategoryAsync().Returns(mainCategories);
            settingService.GetSubCategoryAsync().Returns(subCategories);
            settingService.GetCommunicationToolAsync(isIncludeNA: true).Returns(communications);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(status);

            // Act
            var result = await controller.GetAllSettings();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var settingsResult = jsonResult.Value;

            var expected = new
            {
                CustomerTypes = customerTypes,
                Responses = responses,
                MainCategories = mainCategories,
                SubCategories = subCategories,
                Communications = communications,
                Statuses = status
            };
            expected.Equals(settingsResult);
        }

        [Fact]
        public async Task SearchManageFeedback_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);
            var criteria = fixture.Create<ManageFeedbackCriteria>();
            criteria.PageIndex = 1;
            criteria.PageSize = 100;
            var controller = GetController();
            feedbackService.GetManageFeedbackAsync(criteria).Returns(feedbacks);
            settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

            // Act
            var result = await controller.SearchManageFeedback(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var manageFeedbacks = (IEnumerable<DeletedFeedback>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(feedbacksOrder, manageFeedbacks);
            Assert.Equal(mainCategories, categories);
            Assert.Equal(criteria.TotalRows, totalItems);
        }

        [Fact]
        public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var feedbacks = fixture.Create<IEnumerable<DeletedFeedback>>();
            var criteria = fixture.Create<ManageFeedbackCriteria>();
            criteria.PageIndex = 1;
            criteria.PageSize = 100;
            var fileName = $"{ViewResources.Feedback}.xlsx";
            var controller = GetController();
            feedbackService.GetManageFeedbackAsync(criteria).Returns(feedbacks);
            settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

            // Act
            var result = await controller.ExportExcel(criteria);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        private ManageFeedbackController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            settingService = Substitute.For<ISettingService>();
            userService = Substitute.For<IUserService>();
            settingService = Substitute.For<ISettingService>();
            settingService = Substitute.For<ISettingService>();
            feedbackService = Substitute.For<IFeedbackService>();
            exportExcelService = Substitute.For<IExportExcelService>();
            return new ManageFeedbackController(napSession, napSettings, userService, settingService, feedbackService, exportExcelService);
        }
    }
}
