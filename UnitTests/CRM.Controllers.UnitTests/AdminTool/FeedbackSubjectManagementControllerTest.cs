namespace CRM.Controllers.UnitTests.AdminTool;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using Controllers.AdminTool;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.AdminTool.FeedbackSubject;
using NSubstitute;
using Services.AdminTool;
using Xunit;

public class FeedbackSubjectControllerTests : Controller
{
    private IFeedbackSubjectService feedbackSubjectService;

    [Fact]
    public async Task GetFeedbackSubject_WhenCalled_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var feedbacks = fixture.Create<IEnumerable<FeedbackSubjectTemplate>>();
        var param = fixture.Create<GetFeedbackSubjectParam>();
        var controller = GetController();
        feedbackSubjectService.GetFeedbackSubjectTemplateAsync(param).Returns(feedbacks);

        //Act
        var result = await controller.GetFeedbackSubject(param);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var feedbackSubjects = (IEnumerable<FeedbackSubjectTemplate>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
        Assert.Equal(feedbacks, feedbackSubjects);
        Assert.Equal(param.TotalRows, totalItems);
    }

    [Fact]
    public async Task GetAllActiveFeedbackSubject_WhenCalled_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var feedbacks = fixture.Create<IEnumerable<FeedbackSubjectTemplate>>();
        var controller = GetController();
        feedbackSubjectService.GetAllActiveFeedbackSubjectTemplateAsync().Returns(feedbacks);

        //Act
        var result = await controller.GetAllActiveFeedbackSubject();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var allActiveFeedbackSubjects = (IEnumerable<FeedbackSubjectTemplate>)jsonResult.Value;
        Assert.Equal(feedbacks, allActiveFeedbackSubjects);
    }

    [Fact]
    public async Task CreateFeedbackSubject_WhenCalled_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<CreateFeedbackSubjectTemplate>();
        var controller = GetController();
        feedbackSubjectService.CreateFeedbackSubjectTemplateAsync(model).Returns(expected);

        //Act
        var result = await controller.CreateFeedbackSubject(model);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, commandResult);
    }

    [Fact]
    public async Task EditFeedbackSubject_WhenCalled_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<EditFeedbackSubjectTemplate>();
        var controller = GetController();
        feedbackSubjectService.EditFeedbackSubjectTemplateAsync(model).Returns(expected);

        //Act
        var result = await controller.EditFeedbackSubject(model);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, commandResult);
    }

    [Fact]
    public async Task EditStatusFeedbackSubjectTemplate_WhenCalled_ReturnExpedtedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<EditStatusFeedbackSubjectTemplate>();
        var controller = GetController();
        feedbackSubjectService.EditStatusFeedbackSubjectTemplateAsync(model).Returns(expected);

        //Act
        var result = await controller.EditStatusFeedbackSubject(model);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, commandResult);
    }
    #region Helpers

    private FeedbackSubjectManagementController GetController()
    {
        feedbackSubjectService = Substitute.For<IFeedbackSubjectService>();
        return new FeedbackSubjectManagementController(feedbackSubjectService);
    }

    #endregion Helpers
}