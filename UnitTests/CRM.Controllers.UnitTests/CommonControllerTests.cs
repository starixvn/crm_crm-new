namespace CRM.Controllers.UnitTests;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Common;
using CRM.Criteria.NotificationType;
using CRM.Models;
using CRM.Models.Common;
using CRM.Models.NotificationType;
using CRM.Services;
using Microsoft.AspNetCore.Mvc;
using Models.AdminTool.FeedbackSubject;
using NSubstitute;
using Services.AdminTool;
using Services.Interfaces;
using Xunit;

public class CommonControllerTests
{
    private INotificationTypeService notificationTypeService;
    private ICommonService commonService;
    private IFeedbackSubjectService feedbackSubjectService;
    private IPermissionService permissionService;
    private ISessionService sessionService;
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public async Task GetNotificationTypes_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var controller = GetController();
        var expected = fixture.Create<IEnumerable<NotificationType>>();
        notificationTypeService.GetNotificationTypeAsync(Arg.Any<GetNotificationTypeCriteria>()).Returns(expected);

        // Action
        var result = await controller.GetNotificationTypes() as JsonResult;

        // Assert
        Assert.Equal(expected, (IEnumerable<NotificationType>)result.Value);
    }

    [Fact]
    public async Task GetHeadlines_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var controller = GetController();
        var criteria = fixture.Create<GetHeadlinesCriteria>();
        var expected = fixture.Create<IEnumerable<BaseModel>>();
        commonService.GetHeadlineAsync(criteria).Returns(expected);

        // Action
        var result = await controller.GetHeadlines(criteria) as JsonResult;

        // Assert
        Assert.Equal(expected, (IEnumerable<BaseModel>)result.Value);
    }

    [Fact]
    public async Task GetRecipients_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var controller = GetController();
        var criteria = fixture.Create<GetRecipientsCriteria>();
        var expected = fixture.Create<(IEnumerable<RecipientModel>, IEnumerable<BotInfo>)>();
        commonService.GetRecipientAsync(criteria).Returns(expected);

        // Action
        var result = await controller.GetRecipients(criteria) as JsonResult;

        // Assert
        Assert.Equal(expected, result.Value);
    }

    [Fact]
    public async Task GetFeedbackSubjectTemplate_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var templates = fixture.Create<IEnumerable<FeedbackSubjectTemplate>>();
        var subject = fixture.Create<string>();
        var param = new GetFeedbackSubjectParam();
        var controller = GetController();
        feedbackSubjectService.GetFeedbackSubjectTemplateAsync(Arg.Do<GetFeedbackSubjectParam>(x => param = x)).Returns(templates);

        // Act
        var result = await controller.GetFeedbackSubjectTemplate(subject);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<IEnumerable<FeedbackSubjectTemplate>>(jsonResult.Value);
        Assert.Equal(templates, actual);
    }

    private CommonController GetController()
    {
        notificationTypeService = Substitute.For<INotificationTypeService>();
        commonService = Substitute.For<ICommonService>();
        feedbackSubjectService = Substitute.For<IFeedbackSubjectService>();
        permissionService = Substitute.For<IPermissionService>();
        sessionService = Substitute.For<ISessionService>();
        return new CommonController(notificationTypeService, commonService, feedbackSubjectService, permissionService, sessionService);
    }
}