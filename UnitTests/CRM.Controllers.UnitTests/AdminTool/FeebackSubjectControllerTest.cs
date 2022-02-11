namespace CRM.Controllers.UnitTests.AdminTool
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Models;
    using CRM.Models.FeedbackSubject;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;
    using static Fanex.NAP.Core.Business.Constant;

    public class FeedbackSubjectControllerTests : Controller
    {
        private IFeedbackSubjectService feedbackSubjectService;
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            //Arrange
            var controller = GetController();
            userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.FeedbackSubject, Policy.Host).Returns(true);

            //Act
            var result = controller.Index();

            //Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            var viewModel = Assert.IsType<bool>(viewResult.Model);
            Assert.True(viewModel);
        }

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

        private FeedbackSubjectController GetController()
        {
            feedbackSubjectService = Substitute.For<IFeedbackSubjectService>();
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            return new FeedbackSubjectController(feedbackSubjectService, napSession, napSettings, userService);
        }

        #endregion Helpers
    }
}