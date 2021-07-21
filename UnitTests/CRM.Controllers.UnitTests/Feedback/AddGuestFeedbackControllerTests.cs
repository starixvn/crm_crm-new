namespace CRM.Controllers.UnitTests.Feedback
{
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.AddGuestFeedback;
    using CRM.Models;
    using CRM.Models.Feedback.AddGuessFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class AddGuestFeedbackControllerTests
    {
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private ISettingService settingService;
        private IBaseService baseService;
        private readonly Fixture fixture = new Fixture();

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            // Arrange
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
        public async Task AllSetting_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var controller = GetController();
            var settings = new AllSettingToAddFeedback
            {
                Extensions = fixture.Create<IEnumerable<SettingRelation>>(),
                Countries = fixture.Create<IEnumerable<Country>>(),
                Provinces = fixture.Create<IEnumerable<Province>>(),
                CommunicationTools = new List<Setting> { new Setting { Id = 1, Name = "CommunicationTools", ChildSettings = new List<Setting>()} },
                Languages = fixture.Create<IEnumerable<Language>>(),
                MainCategories = new List<Setting> { new Setting { Id = 1, Name = "MainCategories", ChildSettings = new List<Setting>()}},
                SubCategories = new List<Setting> { new Setting { Id = 1, Name= "SubCategories", ChildSettings = new List<Setting>()}},
                Products = new List<Product> { new Product { Id = 1, Name = "Products", ParentId = 2, ChildSettings = new List<Product>() } },
                SubProducts = new List<Product> { new Product { Id = 1, Name = "SubProducts", ParentId = 2, ChildSettings = new List<Product>() } },
                Bettypes = new List<Product> { new Product { Id = 1, Name = "Bettypes", ParentId = 2, ChildSettings = new List<Product>() } },
                Sites = fixture.Create<IEnumerable<SiteSetting>>(),
                Responses = fixture.Create<IEnumerable<SettingRelation>>(),
                Status = fixture.Create<IEnumerable<FeedbackStatus>>(),
                Titles = fixture.Create<IEnumerable<SettingRelation>>(),
                Roles = fixture.Create<IEnumerable<SettingRelation>>(),
                LicenseeType = fixture.Create<IEnumerable<BaseModel>>()
            };

            settingService.GetLanguageAsync(SettingConstants.Active, true).Returns(settings.Languages);
            settingService.GetCountryAsync(SettingConstants.Active, true).Returns(settings.Countries);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(settings.Extensions);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(settings.Status);
            settingService.GetProvinceAsync().Returns(settings.Provinces);
            settingService.GetCommunicationToolAsync(SettingConstants.Active).Returns(settings.CommunicationTools);
            settingService.GetSiteAsync().Returns(settings.Sites);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(settings.Responses);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active).Returns(settings.Titles);
            settingService.GetLicenseeTypeAsync().Returns(settings.LicenseeType);
            settingService.GetProductAsync(SettingConstants.Active).Returns(settings.Products);
            settingService.GetSubProductAsync(active: SettingConstants.Active).Returns(settings.SubProducts);
            settingService.GetBetTypeAsync(active: SettingConstants.Active).Returns(settings.Bettypes);
            settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(settings.MainCategories);
            settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(settings.SubCategories);

            // Act
            var result = await controller.AllSetting() as JsonResult;
            var Extensions = (IEnumerable<SettingRelation>)result.Value.GetType().GetProperty("Extensions").GetValue(result.Value);
            var Countries = (IEnumerable<Country>)result.Value.GetType().GetProperty("Countries").GetValue(result.Value);
            var Provinces = (IEnumerable<Province>)result.Value.GetType().GetProperty("Provinces").GetValue(result.Value);
            var CommunicationTools = (IEnumerable<Setting>)result.Value.GetType().GetProperty("CommunicationTools").GetValue(result.Value);
            var Languages = (IEnumerable<Language>)result.Value.GetType().GetProperty("Languages").GetValue(result.Value);
            var MainCategories = (IEnumerable<Setting>)result.Value.GetType().GetProperty("MainCategories").GetValue(result.Value);
            var SubCategories = (IEnumerable<Setting>)result.Value.GetType().GetProperty("SubCategories").GetValue(result.Value);
            var Products = (IEnumerable<Product>)result.Value.GetType().GetProperty("Products").GetValue(result.Value);
            var SubProducts = (IEnumerable<Product>)result.Value.GetType().GetProperty("SubProducts").GetValue(result.Value);
            var Bettypes = (IEnumerable<Product>)result.Value.GetType().GetProperty("Bettypes").GetValue(result.Value);
            var Sites = (IEnumerable<SiteSetting>)result.Value.GetType().GetProperty("Sites").GetValue(result.Value);
            var Responses = (IEnumerable<SettingRelation>)result.Value.GetType().GetProperty("Responses").GetValue(result.Value);
            var Status = (IEnumerable<FeedbackStatus>)result.Value.GetType().GetProperty("Status").GetValue(result.Value);
            var Titles = (IEnumerable<SettingRelation>)result.Value.GetType().GetProperty("Titles").GetValue(result.Value);
            var LicenseeType = (IEnumerable<BaseModel>)result.Value.GetType().GetProperty("LicenseeType").GetValue(result.Value);
            var ProductNA = result.Value.GetType().GetProperty("ProductNA").GetValue(result.Value);
            var SubProductNA = result.Value.GetType().GetProperty("SubProductNA").GetValue(result.Value);
            var BettypeNA = result.Value.GetType().GetProperty("BettypeNA").GetValue(result.Value);
            var ExtensionNA = result.Value.GetType().GetProperty("ExtensionNA").GetValue(result.Value);

            // Assert
            Assert.Equal(settings.Extensions, Extensions);
            Assert.Equal(settings.Extensions, Extensions);
            Assert.Equal(settings.Countries, Countries);
            Assert.Equal(settings.Provinces, Provinces);
            Assert.Equal(settings.CommunicationTools, CommunicationTools);
            Assert.Equal(settings.Languages, Languages);
            Assert.Equal(settings.MainCategories, MainCategories);
            Assert.Equal(settings.SubCategories, SubCategories);
            Assert.Equal(settings.Products, Products);
            Assert.Equal(settings.SubProducts, SubProducts);
            Assert.Equal(settings.Bettypes, Bettypes);
            Assert.Equal(settings.Sites, Sites);
            Assert.Equal(settings.Responses, Responses);
            Assert.Equal(settings.Status, Status);
            Assert.Equal(settings.Titles, Titles);
            Assert.Equal(settings.LicenseeType, LicenseeType);
            Assert.Equal(settings.ProductNA, ProductNA);
            Assert.Equal(settings.SubProductNA, SubProductNA);
            Assert.Equal(settings.BettypeNA, BettypeNA);
            Assert.Equal(settings.ExtensionNA, ExtensionNA);
        }

        [Fact]
        public async Task Create_WhenCalled_ReturnExpectedCommandResult()
        {
            // Arrange
            var controller = GetController();
            var command = fixture.Create<AddGuestFeedbackCommand>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            var commandResult = fixture.Create<CommandResult>();
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DeleteFeedback, Policy.Host).Returns(true);

            // Act
            var result = await controller.Create(command) as JsonResult;

            // Assert
            var actualCommandResult = (CommandResult)result.Value;
            Assert.Equal(commandResult, actualCommandResult);
        }

        [Fact]
        public async Task Create_StatusIsDelete_ReturnExpectedCommandResult()
        {
            // Arrange
            var controller = GetController();
            fixture.Customize<AddGuestFeedbackCommand>(x=>x.With(b=>b.StatusId, 11004));
            var command = fixture.Create<AddGuestFeedbackCommand>();
            var clientIP = new DefaultHttpContext
            {
                Connection =
                {
                    RemoteIpAddress = new IPAddress(123456)
                }
            };

            controller.ControllerContext.HttpContext = clientIP;
            var commandResult = new CommandResult
            {
                Code = (int)HttpStatusCode.Forbidden,
                Message = ViewResources.AddCustomerFeedbackPermission
            };
            baseService.ExecuteNonQueryAsync(command).Returns(commandResult);
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DeleteFeedback, Policy.Host).Returns(false);
            // Act
            var result = await controller.Create(command) as JsonResult;

            // Assert
            var actualCommandResult = (CommandResult)result.Value;
            Assert.Equal(commandResult.Code, actualCommandResult.Code);
            Assert.Equal(commandResult.IsSuccessful, actualCommandResult.IsSuccessful);
            Assert.Equal(commandResult.Message, actualCommandResult.Message);
        }

        #region Helpers

        private AddGuestFeedbackController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            settingService = Substitute.For<ISettingService>();
            baseService = Substitute.For<IBaseService>();

            return new AddGuestFeedbackController(napSession, napSettings, userService, settingService, baseService);
        }

        #endregion Helpers
    }
}
