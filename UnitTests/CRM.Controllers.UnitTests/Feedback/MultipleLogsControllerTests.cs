namespace CRM.Controllers.UnitTests.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Feedback.MultipleLogs;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.Services.Feedback;
    using CRM.ViewModels.Feedback;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using NSubstitute;
    using Xunit;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    public class MultipleLogsControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private INapSession napSession;
        private IBaseService baseService;
        private ISettingService settingService;
        private IFeedbackService feedbackService;
        private ICommonService commonService;
        private IPermissionService permissionService;

        [Fact]
        public async Task Create_Post_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var command = new CreateMultipleLogsCommand();
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            baseService.ExecuteNonQueryAsync(Arg.Do<CreateMultipleLogsCommand>(x => command = x)).Returns(commandResult);

            // Act
            var result = await controller.Create(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult, actual);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal(napSession.UserId, command.CreatorId);
            Assert.Equal("1.0.0.0", command.IP);
        }

        [Fact]
        public async Task GetAllSettingAsync_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var extentions = new List<SettingRelation>
            {
                new SettingRelation { Id = 1 },
                new SettingRelation { Id = 2022 }
            };
            var communicationTools = new List<Setting> { new Setting { Id = 1 } };
            var statuses = new List<FeedbackStatus>
            {
                new FeedbackStatus { StatusId = 1, Name = "Pending" },
                new FeedbackStatus { StatusId = 11004, Name = "Deleted" }
            };
            var responses = fixture.Create<IEnumerable<SettingRelation>>();
            var languages = fixture.Create<IEnumerable<Language>>();
            var countries = fixture.Create<IEnumerable<Country>>();
            var mainCategories = new List<Setting> { new Setting { Id = 1 } };
            var subCategories = new List<Setting> { new Setting { Id = 1 } };
            var products = new List<Product> { new Product { Id = 1 }, new Product { Id = 46004 } };
            var subProducts = new List<Product> { new Product { Id = 1 }, new Product { Id = 8063 } };
            var bettypes = new List<Product> { new Product { Id = 1 }, new Product { Id = 9144 } };

            var controller = GetController();
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extentions);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
            settingService.GetProductAsync(SettingConstants.Active).Returns(products);
            settingService.GetSubProductAsync(active: SettingConstants.Active).Returns(subProducts);
            settingService.GetBetTypeAsync(active: SettingConstants.Active).Returns(bettypes);
            settingService.GetCommunicationToolAsync(SettingConstants.Active).Returns(communicationTools);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(responses);
            settingService.GetLanguageAsync(SettingConstants.Active, true).Returns(languages);
            settingService.GetCountryAsync(SettingConstants.Active, true).Returns(countries);
            settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
            settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategories);

            // Act
            var result = await controller.GetSettings();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var viewModel = Assert.IsAssignableFrom<CreateFeedbackViewModel>(jsonResult.Value);
            Assert.Equal(communicationTools, viewModel.CommunicationTools);
            Assert.Equal(responses, viewModel.Responses);
            Assert.Equal(languages, viewModel.Languages);
            Assert.Equal(countries, viewModel.Countries);
            Assert.Equal(mainCategories, viewModel.MainCategories);
            Assert.Equal(subCategories, viewModel.SubCategories);

            Assert.Single(viewModel.Extensions);
            Assert.Collection(viewModel.Extensions, item =>
            {
                Assert.Equal(extentions[0], item);
            });

            Assert.Single(viewModel.Statuses);
            Assert.Collection(viewModel.Statuses, item =>
            {
                Assert.Equal(statuses[0], item);
            });

            Assert.Single(viewModel.Products);
            Assert.Collection(viewModel.Products, item =>
            {
                Assert.Equal(products[0], item);
            });

            Assert.Single(viewModel.SubProducts);
            Assert.Collection(viewModel.SubProducts, item =>
            {
                Assert.Equal(subProducts[0], item);
            });

            Assert.Single(viewModel.Bettypes);
            Assert.Collection(viewModel.Bettypes, item =>
            {
                Assert.Equal(bettypes[0], item);
            });

            Assert.Equal(products[1], viewModel.ProductNA);
            Assert.Equal(subProducts[1], viewModel.SubProductNA);
            Assert.Equal(bettypes[1], viewModel.BettypeNA);
            Assert.Equal(extentions[1], viewModel.ExtensionNA);
        }

        [Fact]
        public async Task VerifyCustomer_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<VerifyCustomerCriteria>();
            var customers = fixture.Create<IEnumerable<VerifyCustomerResult>>();
            var controller = GetController();
            baseService.GetDataAsync<VerifyCustomerResult>(criteria).Returns(customers);

            // Act
            var result = await controller.VerifyCustomer(criteria);

            // Arrange
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<VerifyCustomerResult>>(jsonResult.Value);
            Assert.Equal(customers, actual);
        }

        [Fact]
        public async Task VerifyRelatedCustomer_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<VerifyRelatedCustomerCriteria>();
            var customers = fixture.Create<IEnumerable<VerifyRelatedCustomerResult>>();
            var controller = GetController();
            baseService.GetDataAsync<VerifyRelatedCustomerResult>(criteria).Returns(customers);

            // Act
            var result = await controller.VerifyRelatedCustomer(criteria);

            // Arrange
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<VerifyRelatedCustomerResult>>(jsonResult.Value);
            Assert.Equal(customers, actual);
        }

        [Fact]
        public async Task CheckNotExistCommunicationToolSetting_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var criteria = fixture.Create<CheckNotExistCommunicationToolSettingCriteria>();
            var customers = fixture.Create<IEnumerable<VerifyCommunicationToolSetting>>();
            var controller = GetController();
            baseService.GetDataAsync<VerifyCommunicationToolSetting>(criteria).Returns(customers);

            // Act
            var result = await controller.CheckNotExistCommunicationToolSetting(criteria);

            // Arrange
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<IEnumerable<VerifyCommunicationToolSetting>>(jsonResult.Value);
            Assert.Equal(customers, actual);
        }

        [Fact]
        public async Task GetLogByFeedbackId_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var controller = GetController();
            var communicationLog = fixture.Create<CommunicationLog>();
            var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
            feedbackService.GetLogByFeedbackIdAsync(1).Returns(communicationLog);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.DeleteFeedback, Policy.Host).Returns(true);
            settingService.GetStatusAsync(Arg.Any<byte>()).Returns(statuses);

            // Act
            var result = await controller.GetLogByFeedbackId(1);

            // Arrange
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<dynamic>(jsonResult.Value);
            Assert.Equal(JsonConvert.SerializeObject(new { logInfo = communicationLog, statuses = statuses }), JsonConvert.SerializeObject(actual));
        }

        #region EditMultipleLogStatuses

        [Fact]
        public async Task EditMultipleLogStatuses_DoNotHaveEditPermission_ReturnAsExpectedResult()
        {
            // Arrange
            var command = fixture.Create<EditMultipleLogStatusCommand>();
            var controller = GetController();
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Read).Returns(false);

            // Act
            var result = await controller.EditMultipleLogStatuses(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(1, commandResult.Code);
            Assert.Equal("You don't have permission to review feedback.", commandResult.Message);
        }

        [Fact]
        public async Task EditMultipleLogStatuses_DoNotHaveReviewPermission_ReturnAsExpectedResult()
        {
            // Arrange
            var command = new EditMultipleLogStatusCommand();
            var controller = GetController();
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Read).Returns(true);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(false);

            // Act
            var result = await controller.EditMultipleLogStatuses(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(1, commandResult.Code);
            Assert.Equal("You don't have permission to update feedback.", commandResult.Message);
        }

        [Fact]
        public async Task EditMultipleLogStatuses_IsReviewed_ReturnAsExpectedResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var command = new EditMultipleLogStatusCommand { ReviewNote = "review" };
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host).Returns(true);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
            baseService.ExecuteNonQueryAsync(Arg.Do<EditMultipleLogStatusCommand>(x => command = x)).Returns(commandResult);

            // Act
            var result = await controller.EditMultipleLogStatuses(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult, actual);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(napSession.UserId, command.ReviewerId);
            Assert.NotEmpty(command.ReviewNote);
        }

        [Fact]
        public async Task EditCustomerFeedback_NotReview_ReturnAsExpectedResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var command = new EditMultipleLogStatusCommand { ReviewNote = "" };
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host).Returns(true);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
            baseService.ExecuteNonQueryAsync(Arg.Do<EditMultipleLogStatusCommand>(x => command = x)).Returns(commandResult);

            // Act
            var result = await controller.EditMultipleLogStatuses(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult, actual);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Empty(command.ReviewNote);
        }

        #endregion EditMultipleLogStatuses

        [Fact]
        public async Task GetLogSettingByFeedbackId_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var extentions = new List<SettingRelation>
            {
                new SettingRelation { Id = 1 },
                new SettingRelation { Id = 2022 }
            };
            var communicationTools = new List<Setting> { new Setting { Id = 1 } };
            var statuses = new List<FeedbackStatus>
            {
                new FeedbackStatus { StatusId = 1, Name = "Pending" },
                new FeedbackStatus { StatusId = 11004, Name = "Deleted" }
            };
            var responses = fixture.Create<IEnumerable<SettingRelation>>();
            var languages = fixture.Create<IEnumerable<Language>>();
            var countries = fixture.Create<IEnumerable<Country>>();
            var mainCategories = new List<Setting> { new Setting { Id = 1 } };
            var subCategories = new List<Setting> { new Setting { Id = 1 } };
            var products = new List<Product> { new Product { Id = 1 }, new Product { Id = 46004 } };
            var subProducts = new List<Product> { new Product { Id = 1 }, new Product { Id = 8063 } };
            var bettypes = new List<Product> { new Product { Id = 1 }, new Product { Id = 9144 } };
            var roles = new List<SettingRelation> { new SettingRelation { Id = 1 } };
            var sites = new List<SiteInfo> { new SiteInfo { Id = 1 } };
            var licenseeTypes = new List<BaseModel> { new BaseModel { Id = 1 } };

            var controller = GetController();
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extentions);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
            settingService.GetProductAsync(SettingConstants.Active).Returns(products);
            settingService.GetSubProductAsync(active: SettingConstants.Active).Returns(subProducts);
            settingService.GetBetTypeAsync(active: SettingConstants.Active).Returns(bettypes);
            settingService.GetCommunicationToolAsync(SettingConstants.Active).Returns(communicationTools);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(responses);
            settingService.GetLanguageAsync(SettingConstants.Active, true).Returns(languages);
            settingService.GetCountryAsync(SettingConstants.Active, true).Returns(countries);
            settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
            settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategories);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role, SettingConstants.Active).Returns(roles);
            settingService.GetAllSitesWithGroupAsync().Returns(sites);
            settingService.GetLicenseeTypeAsync().Returns(licenseeTypes);
            var communicationLog = fixture.Create<CommunicationLog>();
            feedbackService.GetLogByFeedbackIdAsync(1).Returns(communicationLog);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.DeleteFeedback, Policy.Host).Returns(true);

            // Act
            var result = await controller.GetLogSettingByFeedbackId(1);

            // Arrange
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = (CommunicationLog)jsonResult.Value.GetType().GetProperty("communicationLog").GetValue(jsonResult.Value);
            var settings = (CreateFeedbackViewModel)jsonResult.Value.GetType().GetProperty("settings").GetValue(jsonResult.Value);
            var hasReviewFeedbackPermission = (bool)jsonResult.Value.GetType().GetProperty("hasReviewFeedbackPermission").GetValue(jsonResult.Value);
            Assert.Equal(communicationLog, actual);
            Assert.True(hasReviewFeedbackPermission);
            Assert.Equal(2, settings.Statuses.Count());
            Assert.Equal(licenseeTypes, settings.LicenseeTypes);
            Assert.Equal(roles, settings.Roles);
            Assert.Equal(sites, settings.Sites);
        }

        #region EditMultipleLogs

        [Fact]
        public async Task EditMultipleLogs_NotReview_ReturnAsExpectedResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var command = new EditMultipleLogsCommand();
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Read).Returns(true);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
            baseService.ExecuteNonQueryAsync(Arg.Do<EditMultipleLogsCommand>(x => command = x)).Returns(commandResult);

            // Act
            var result = await controller.EditMultipleLogs(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult, actual);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(0, command.UserId);
            Assert.False(command.IsReviewed);
        }

        [Fact]
        public async Task EditMultipleLogs_Review_ReturnAsExpectedResult()
        {
            // Arrange
            var commandResult = fixture.Create<CommandResult>();
            var command = new EditMultipleLogsCommand { IsReviewed = true };
            var controller = GetController();
            controller.ControllerContext.HttpContext = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(1)
                }
            };
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Read).Returns(true);
            permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host).Returns(true);
            baseService.ExecuteNonQueryAsync(Arg.Do<EditMultipleLogsCommand>(x => command = x)).Returns(commandResult);

            // Act
            var result = await controller.EditMultipleLogs(command);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(commandResult, actual);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.Equal("1.0.0.0", command.IP);
            Assert.Equal(napSession.UserId, command.UserId);
            Assert.True(command.IsReviewed);
        }

        #endregion EditMultipleLogs

        #region Helpers

        private MultipleLogsController GetController()
        {
            napSession = Substitute.For<INapSession>();
            baseService = Substitute.For<IBaseService>();
            settingService = Substitute.For<ISettingService>();
            feedbackService = Substitute.For<IFeedbackService>();
            commonService = Substitute.For<ICommonService>();
            permissionService = Substitute.For<IPermissionService>();
            return new MultipleLogsController(napSession, baseService, settingService, feedbackService, commonService, permissionService);
        }

        #endregion Helpers
    }
}