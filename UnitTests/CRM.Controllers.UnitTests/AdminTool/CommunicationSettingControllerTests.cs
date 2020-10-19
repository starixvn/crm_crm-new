namespace CRM.Controllers.UnitTests.AdminTool
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Models.AdminTool.CommunicationToolSetting;
    using CRM.Models.Setting;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class CommunicationSettingControllerTests : Controller

    {
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
        private ISettingService settingService;
        private ICommunicationToolSettingService communicationToolService;

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            // Arrange
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DefaultCommunicationSetting, Policy.Host).Returns(true);

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewModel = Assert.IsType<bool>(viewResult.Model);
            Assert.True(viewModel);
        }

        [Fact]
        public async Task GetAllSettings_WhenCalled_ReturnExpectedDataAsync()
        {
            //Arrange

            var fixture = new Fixture();
            var communicationTools = fixture.Create<IEnumerable<Setting>>();
            var mainCategories = fixture.Create<IEnumerable<Setting>>();
            var subCategories = fixture.Create<IEnumerable<Setting>>();
            var controller = GetController();
            settingService.GetAllCommunicationToolAsync().Returns(communicationTools);
            settingService.GetMainCategoryAsync().Returns(mainCategories);
            settingService.GetSubCategoryAsync().Returns(subCategories);
            var expected = new
            {
                communicationTools,
                mainCategories,
                subCategories
            };

            // Act
            var result = await controller.GetAllSettings();

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var settingsResult = jsonResult.Value;
            expected.Equals(settingsResult);
        }

        [Fact]
        public async Task GetCommunicationToolSetting_WhenCalled_ReturnExpectedDataAsync()
        {
            // Arrange
            var fixture = new Fixture();
            var communications = fixture.Create<IEnumerable<CommunicationToolSetting>>();
            var param = fixture.Create<GetGridDataParam>();
            var controller = GetController();
            communicationToolService.GetAllAsync(param).Returns(communications);

            // Act
            var result = await controller.GetCommunicationToolSetting(param);

            //Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var communicationSettings = (IEnumerable<CommunicationToolSetting>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
            Assert.Equal(communications, communicationSettings);
            Assert.Equal(param.TotalRows, totalItems);
        }

        [Fact]
        public async Task GetById_CommunicationToolIsNotExist_ReturnNotFound()
        {
            // Arrange
            var fixture = new Fixture();
            CommunicationToolSetting communicationTool = null;
            var id = fixture.Create<int>();
            var controller = GetController();
            communicationToolService.GetByIdAsync(id).Returns(communicationTool);

            // Act
            var result = await controller.GetById(id);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task GetById__CommunicationToolIsExist_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommunicationToolSetting>();
            var id = fixture.Create<int>();
            var controller = GetController();
            communicationToolService.GetByIdAsync(id).Returns(expected);

            // Act
            var result = await controller.GetById(id);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var template = Assert.IsAssignableFrom<CommunicationToolSetting>(jsonResult.Value);
            Assert.Equal(expected, template);
        }

        [Fact]
        public async Task Create_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var model = fixture.Create<CreateCommunicationToolSetting>();
            var controller = GetController();
            communicationToolService.CreateAsync(model).Returns(expected);

            // Act
            var result = await controller.Create(model);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(expected, commandResult);
        }

        [Fact]
        public async Task Edit_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var model = fixture.Create<EditCommunicationToolSetting>();
            var controller = GetController();
            communicationToolService.EditAsync(model).Returns(expected);

            // Act
            var result = await controller.Edit(model);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(expected, commandResult);
        }

        [Fact]
        public async Task Delete_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var expected = fixture.Create<CommandResult>();
            var id = fixture.Create<int>();
            var controller = GetController();
            communicationToolService.DeleteAsync(id).Returns(expected);

            // Act
            var result = await controller.Delete(id);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
            Assert.Equal(expected, commandResult);
        }

        #region Helpers

        private CommunicationSettingController GetController()
        {
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            communicationToolService = Substitute.For<ICommunicationToolSettingService>();
            settingService = Substitute.For<ISettingService>();
            return new CommunicationSettingController(napSession, napSettings, userService, settingService, communicationToolService);
        }

        #endregion Helpers
    }
}