namespace CRM.Controllers.UnitTests;

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Models.NotificationTemplate;
using CRM.Models.Setting;
using HeadlineNotification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using NSubstitute;
using Services.HeadlineNotification;
using Services.Interfaces;
using Xunit;

public class NotificationTemplateControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private INotificationTemplateService templateService;
    private ISettingService settingService;

    [Fact]
    public async Task GetNotificationTemplate_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var templates = fixture.Create<IEnumerable<NotificationTemplate>>();
        var param = fixture.Create<GetNotificationTemplateParam>();
        var controller = GetController();
        templateService.GetAsync(param).Returns(templates);

        // Act
        var result = await controller.GetNotificationTemplate(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var notificationTemplates = (IEnumerable<NotificationTemplate>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
        Assert.Equal(templates, notificationTemplates);
        Assert.Equal(param.TotalRows, totalItems);
    }

    [Fact]
    public async Task GetById_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var expected = fixture.Create<NotificationTemplate>();
        var id = fixture.Create<int>();
        var controller = GetController();
        templateService.GetByIdAsync(id).Returns(expected);

        // Act
        var result = await controller.GetById(id);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var template = Assert.IsAssignableFrom<NotificationTemplate>(jsonResult.Value);
        Assert.Equal(expected, template);
    }

    [Fact]
    public async Task Create_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<CreateNotificationTemplate>();
        var controller = GetController();
        templateService.CreateAsync(model).Returns(expected);

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
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<EditNotificationTemplate>();
        var controller = GetController();
        templateService.EditAsync(model).Returns(expected);

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
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<DeleteNotificationTemplate>();
        var controller = GetController();
        templateService.DeleteAsync(model).Returns(expected);

        // Act
        var result = await controller.Delete(model);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, commandResult);
    }

    [Fact]
    public async Task GetLanguages_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var expected = new List<Setting>();
        var controller = GetController();
        settingService.GetSettingAsync(SettingName.NotificationTemplateLanguage, true).Returns(expected);

        // Act
        var result = await controller.GetLanguages();

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var settings = Assert.IsAssignableFrom<IEnumerable<Setting>>(jsonResult.Value);
        Assert.Equal(expected, settings);
    }

    #region Helpers

    private NotificationTemplateController GetController()
    {
        templateService = Substitute.For<INotificationTemplateService>();
        settingService = Substitute.For<ISettingService>();
        var controller = new NotificationTemplateController(templateService, settingService);
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        return controller;
    }

    #endregion Helpers
}