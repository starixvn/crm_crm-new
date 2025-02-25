namespace CRM.Controllers.UnitTests.Feedback
{
    using System.Collections.Generic;
    using System.Net;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Controllers.Feedback;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.AddFeedback;
    using CRM.Models;
    using CRM.Models.Setting;
    using CRM.Services;
    using CRM.ViewModels.Feedback;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class AddGuestFeedbackControllerTests
    {
        private INapSession napSession;
        private ISettingService settingService;
        private IBaseService baseService;
        private ICommonService commonService;
        private IPermissionService permissionService;
        private readonly Fixture fixture = new Fixture();

        [Fact]
        public async Task AllSetting_WhenCalled_ReturnExpectedSettings()
        {
            // Arrange
            var controller = GetController();
            var settings = new CreateFeedbackViewModel
            {
                Extensions = fixture.Create<IEnumerable<SettingRelation>>(),
                Countries = fixture.Create<IEnumerable<Country>>(),
                CommunicationTools = new List<Setting> { new Setting { Id = 1, Name = "CommunicationTools", ChildSettings = new List<Setting>() } },
                Languages = fixture.Create<IEnumerable<Language>>(),
                MainCategories = new List<Setting> { new Setting { Id = 1, Name = "MainCategories", ChildSettings = new List<Setting>() } },
                SubCategories = new List<Setting> { new Setting { Id = 1, Name = "SubCategories", ChildSettings = new List<Setting>() } },
                Products = new List<Product> { new Product { Id = 1, Name = "Products", ParentId = 2, ChildSettings = new List<Product>() } },
                SubProducts = new List<Product> { new Product { Id = 1, Name = "SubProducts", ParentId = 2, ChildSettings = new List<Product>() } },
                Bettypes = new List<Product> { new Product { Id = 1, Name = "Bettypes", ParentId = 2, ChildSettings = new List<Product>() } },
                Responses = fixture.Create<IEnumerable<SettingRelation>>(),
                Statuses = fixture.Create<IEnumerable<FeedbackStatus>>(),
                Titles = fixture.Create<IEnumerable<SettingRelation>>(),
                Roles = fixture.Create<IEnumerable<SettingRelation>>(),
                LicenseeTypes = fixture.Create<IEnumerable<BaseModel>>()
            };

            settingService.GetLanguageAsync(SettingConstants.Active, true).Returns(settings.Languages);
            settingService.GetCountryAsync(SettingConstants.Active, true).Returns(settings.Countries);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(settings.Extensions);
            settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(settings.Statuses);
            settingService.GetCommunicationToolAsync(SettingConstants.Active).Returns(settings.CommunicationTools);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(settings.Responses);
            settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active).Returns(settings.Titles);
            settingService.GetLicenseeTypeAsync().Returns(settings.LicenseeTypes);
            settingService.GetProductAsync(SettingConstants.Active).Returns(settings.Products);
            settingService.GetSubProductAsync(active: SettingConstants.Active).Returns(settings.SubProducts);
            settingService.GetBetTypeAsync(active: SettingConstants.Active).Returns(settings.Bettypes);
            settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(settings.MainCategories);
            settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(settings.SubCategories);

            // Act
            var result = await controller.AllSetting();
            var jsonResult = Assert.IsType<JsonResult>(result);
            var viewModel = Assert.IsAssignableFrom<CreateFeedbackViewModel>(jsonResult.Value);

            // Assert
            Assert.Equal(settings.Extensions, viewModel.Extensions);
            Assert.Equal(settings.Countries, viewModel.Countries);
            Assert.Equal(settings.CommunicationTools, viewModel.CommunicationTools);
            Assert.Equal(settings.Languages, viewModel.Languages);
            Assert.Equal(settings.MainCategories, viewModel.MainCategories);
            Assert.Equal(settings.SubCategories, viewModel.SubCategories);
            Assert.Equal(settings.Products, viewModel.Products);
            Assert.Equal(settings.SubProducts, viewModel.SubProducts);
            Assert.Equal(settings.Bettypes, viewModel.Bettypes);
            Assert.Equal(settings.Sites, viewModel.Sites);
            Assert.Equal(settings.Responses, viewModel.Responses);
            Assert.Equal(settings.Statuses, viewModel.Statuses);
            Assert.Equal(settings.Titles, viewModel.Titles);
            Assert.Equal(settings.LicenseeTypes, viewModel.LicenseeTypes);
            Assert.Equal(settings.ProductNA, viewModel.ProductNA);
            Assert.Equal(settings.SubProductNA, viewModel.SubProductNA);
            Assert.Equal(settings.BettypeNA, viewModel.BettypeNA);
            Assert.Equal(settings.ExtensionNA, viewModel.ExtensionNA);
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

            // Act
            var result = await controller.Create(command) as JsonResult;

            // Assert
            var actualCommandResult = (CommandResult)result.Value;
            Assert.Equal(commandResult, actualCommandResult);
        }

        #region Helpers

        private AddGuestFeedbackController GetController()
        {
            napSession = Substitute.For<INapSession>();
            settingService = Substitute.For<ISettingService>();
            baseService = Substitute.For<IBaseService>();
            commonService = Substitute.For<ICommonService>();
            permissionService = Substitute.For<IPermissionService>();
            return new AddGuestFeedbackController(napSession, settingService, baseService, commonService, permissionService);
        }

        #endregion Helpers
    }
}