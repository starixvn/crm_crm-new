namespace CRM.Controllers.UnitTests.Communication
{
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Communication;
    using CRM.Controllers.InformHeadline;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Communication;
    using CRM.Criteria.InformHeadline;
    using CRM.Models;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Customer;
    using CRM.Models.InformHeadline;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Communication;
    using CRM.Services.InformHeadline;
    using CRM.ViewModels.Feedback;
    using CRM.ViewModels.InformHeadline;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class CommunicationLogControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private IBaseService baseService;
        private ISettingService settingService;
        private ICommunicationService communicationService;

        [Fact]
        public void Index_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo).Returns(2);
            userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo).Returns(2);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var permission = (GetPermissionCustomer)viewResult.Model;
            Assert.Equal(2, permission.CustomerInfoPolicy);
            Assert.Equal(2, permission.CreateUpdateFeedbackPermission);
        }

        [Fact]
        public async Task GetLogsByCustomerId_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var logs = fixture.Create<IEnumerable<CommunicationLog>>();
            var param = fixture.Create<GetLogsByCustomerIdCriteria>();
            var controller = GetController();
            communicationService.GetLogsByCustomerIdAsync(param).Returns(logs);
            settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

            // Act
            var result = await controller.GetLogsByCustomerId(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var communicationLogs = (IEnumerable<CommunicationLog>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
            Assert.Equal(logs, communicationLogs);
            Assert.Equal(mainCategories, categories);
        }

        [Fact]
        public async Task GetAllStatus_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
            var controller = GetController();
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);

            // Act
            var result = await controller.GetAllStatus(false);
            var jsonResult = Assert.IsType<JsonResult>(result);
            var statusResult = jsonResult.Value;
            Assert.Equal(statusResult, statuses);
        }

        #region EditCommunicationLog

        [Fact]
        public async Task EditCommunicationLog_DoNotHaveEditPermission_ReturnAsExpectedResult()
        {
            // Arrange
            var command = fixture.Create<EditCommunicationLogCommand>();
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(false);

            // Act
            var result = await controller.EditCommunicationLog(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(1, commandResult.Code);
            Assert.Equal("You don't have permission to update.", commandResult.Message);
        }

        [Fact]
        public async Task EditCommunicationLog_DoNotHaveReviewPermission_ReturnAsExpectedResult()
        {
            // Arrange
            var command = new EditCommunicationLogCommand { UpdateReviewedMode = 1 };
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(true);
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host).Returns(false);

            // Act
            var result = await controller.EditCommunicationLog(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(1, commandResult.Code);
            Assert.Equal("You don't have permission to update.", commandResult.Message);
        }

        [Fact]
        public async Task EditCommunicationLog_DoNotHaveDeletePermission_ReturnAsExpectedResult()
        {
            // Arrange
            var command = new EditCommunicationLogCommand { IsDeletedFeedbackView = false, StatusId = 11004 };
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(false);

            // Act
            var result = await controller.EditCommunicationLog(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(1, commandResult.Code);
            Assert.Equal("You don't have permission to delete.", commandResult.Message);
        }

        [Fact]
        public async Task EditCommunicationLog_IsReviewed_ReturnAsExpectedResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var command = new EditCommunicationLogCommand { IsReviewed = true, Review = "review" };
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(true);
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

            // Act
            var result = await controller.EditCommunicationLog(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult, actual);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(napSession.UserId, command.ReviewerId);
            Assert.NotEmpty(command.Review);
        }

        [Fact]
        public async Task EditCommunicationLog_NotReview_ReturnAsExpectedResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var command = new EditCommunicationLogCommand { Review = "review" };
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host).Returns(true);
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

            // Act
            var result = await controller.EditCommunicationLog(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult, actual);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Empty(command.Review);
        }

        #endregion EditCommunicationLog

        [Fact]
        public async Task GetInsertSettings_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var extentions = fixture.Create<IEnumerable<SettingRelation>>();
            var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
            var communicationTools = new List<Setting> { new Setting { Id = 1 } };
            var languages = fixture.Create<IEnumerable<Language>>();
            var responses = fixture.Create<IEnumerable<SettingRelation>>();
            var roles = fixture.Create<IEnumerable<SettingRelation>>();
            var sites = new List<SiteInfo> { new SiteInfo { IsLicensee = true } };
            var countries = fixture.Create<IEnumerable<Country>>();
            var mainCategories = new List<Setting> { new Setting { Id = 1 } };
            var subCategories = new List<Setting> { new Setting { Id = 1 } };
            var licenseeTypes = fixture.Create<IEnumerable<BaseModel>>();
            var bettypes = new List<Product> { new Product { Id = 1 } };
            var products = new List<Product> { new Product { Id = 1 } };
            var subProducts = new List<Product> { new Product { Id = 1 } };

            var controller = GetController();
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extentions);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
            settingService.GetCommunicationToolAsync(SettingConstants.Active).Returns(communicationTools);
            settingService.GetLanguageAsync(SettingConstants.Active, true).Returns(languages);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(responses);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role).Returns(roles);
            settingService.GetAllSitesWithGroupAsync().Returns(sites);
            settingService.GetCountryAsync(SettingConstants.Active, true).Returns(countries);
            settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
            settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategories);
            settingService.GetLicenseeTypeAsync().Returns(licenseeTypes);
            settingService.GetBetTypeAsync(active: SettingConstants.Active).Returns(bettypes);
            settingService.GetProductAsync(SettingConstants.Active).Returns(products);
            settingService.GetSubProductAsync(active: SettingConstants.Active).Returns(subProducts);

            // Act
            var result = await controller.GetInsertSettings();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var insertSettings = (CreateFeedbackViewModel)jsonResult.Value;
            Assert.Equal(extentions, insertSettings.Extensions);
            Assert.Equal(statuses, insertSettings.Statuses);
            Assert.Equal(communicationTools, insertSettings.CommunicationTools);
            Assert.Equal(languages, insertSettings.Languages);
            Assert.Equal(responses, insertSettings.Responses);
            Assert.Equal(roles, insertSettings.Roles);
            Assert.Equal(sites, insertSettings.Sites);
            Assert.Equal(countries, insertSettings.Countries);
            Assert.Equal(mainCategories, insertSettings.MainCategories);
            Assert.Equal(subCategories, insertSettings.SubCategories);
            Assert.Equal(licenseeTypes, insertSettings.LicenseeTypes);
            Assert.Equal(bettypes, insertSettings.Bettypes);
            Assert.Equal(products, insertSettings.Products);
            Assert.Equal(subProducts, insertSettings.SubProducts);
        }

        [Fact]
        public async Task InsertCommunicationLog_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var command = fixture.Create<InsertCommunicationLogCommand>();
            var commandResult = fixture.Create<CommandResult>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            var controller = GetController();
            controller.ControllerContext.HttpContext = clientIP;
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);

            // Act
            var result = await controller.InsertCommunicationLog(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(commandResult, actual);
        }

        #region Helpers

        private CommunicationLogController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            communicationService = Substitute.For<ICommunicationService>();
            return new CommunicationLogController(napSession, napSettings, userService, communicationService, settingService, baseService);
        }

        #endregion Helpers
    }
}
