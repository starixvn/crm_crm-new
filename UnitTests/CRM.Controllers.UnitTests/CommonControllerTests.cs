namespace CRM.Controllers.UnitTests
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using CRM.Criteria.Common;
    using CRM.Criteria.NotificationType;
    using CRM.Models;
    using CRM.Models.Common;
    using CRM.Models.FeedbackSubject;
    using CRM.Models.NotificationType;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using Xunit;

    public class CommonControllerTests
    {
        private INotificationTypeService notificationTypeService;
        private ICommonService commonService;
        private IFeedbackSubjectService feedbackSubjectService;
        private INapSession napSession;
        private INapSettings napSettings;
        private IUserService userService;
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
            napSession = Substitute.For<INapSession>();
            napSettings = Substitute.For<INapSettings>();
            userService = Substitute.For<IUserService>();
            return new CommonController(notificationTypeService, commonService, feedbackSubjectService, napSession, napSettings, userService);
        }
    }
}