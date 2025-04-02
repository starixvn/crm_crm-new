namespace CRM.Services.UnitTests.AdminTool;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Criteria.AdminTool.FeedbackSubject;
using Models;
using Models.AdminTool.FeedbackSubject;
using NSubstitute;
using Services.AdminTool;
using Xunit;

public class FeedbackSubjectServiceTests
{
    private IBaseService baseService;

    [Fact]
    public async Task GetFeedbackSubjectTemplateAsync_WhenCalled_ReturnExpedtedFeedback()
    {
        //Arrange
        var fixture = new Fixture();
        var param = new GetFeedbackSubjectParam { Subject = null, PageIndex = 1, PageSize = 50 };
        var expected = fixture.Create<IEnumerable<FeedbackSubjectTemplate>>();
        var criteria = new GetFeedbackSubjectTemplateCriteria();
        var service = GetFeedbackSubjectService();
        baseService.GetDataAsync<FeedbackSubjectTemplate>(Arg.Do<GetFeedbackSubjectTemplateCriteria>(x => criteria = x)).Returns(expected);
            
        //Act
        var actual = await service.GetFeedbackSubjectTemplateAsync(param);

        //Assert
        Assert.Equal(expected, actual);
        Assert.Equal(param.TotalRows, expected.Count());
    }

    [Fact]
    public async Task GetFeedbackSubjectTemplateAsync_WhenFilter_ReturnExpectedFeedback()
    {
        //Arrange
        var fixture = new Fixture();
        var param = fixture.Create<GetFeedbackSubjectParam>();
        var data = fixture.Create<IEnumerable<FeedbackSubjectTemplate>>();
        var criteria = new GetFeedbackSubjectTemplateCriteria();
        var service = GetFeedbackSubjectService();
        baseService.GetDataAsync<FeedbackSubjectTemplate>(Arg.Do<GetFeedbackSubjectTemplateCriteria>(x => criteria = x)).Returns(data);
        var templates = data.Where(item => (string.IsNullOrEmpty(param.Subject) ||
                                            item.Subject.ToLowerInvariant().Contains(param.Subject.Trim().ToLowerInvariant()))).ToList();
        var startIndex = (param.PageIndex - 1) * param.PageSize;
        var expected = templates.Skip(startIndex).Take(param.PageSize).ToList();
        //Act
        var actual = await service.GetFeedbackSubjectTemplateAsync(param);

        //Assert
        Assert.Equal(expected, actual);
        Assert.Equal(param.TotalRows, expected.Count);
    }

    [Fact]
    public async Task GetAllActiveFeedbackSubjectTemplateAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var fixture = new Fixture();
        var feedbackSubjects = fixture.Create<IEnumerable<FeedbackSubjectTemplate>>();
        var criteria = new GetFeedbackSubjectTemplateCriteria();
        var service = GetFeedbackSubjectService();
        baseService.GetDataAsync<FeedbackSubjectTemplate>(Arg.Do<GetFeedbackSubjectTemplateCriteria>(x => criteria = x)).Returns(feedbackSubjects);
        var allActiveFeedback = feedbackSubjects.Where(item => item.IsActive);

        //Act
        var actual = await service.GetAllActiveFeedbackSubjectTemplateAsync();

        //Assert
        Assert.Equal(allActiveFeedback, actual);
    }

    [Fact]
    public async Task CreateFeedbackSubjectTemplateAsync_WhenCalled_ReturnExpectedCommandResult()
    {
        //Arrange
        var fixture = new Fixture();
        var model = fixture.Create<CreateFeedbackSubjectTemplate>();
        var expected = fixture.Create<CommandResult>();
        var criteria = new CreateFeedbackSubjectTemplateCommand();
        var service = GetFeedbackSubjectService();
        baseService.ExecuteNonQueryAsync(Arg.Do<CreateFeedbackSubjectTemplateCommand>(x => criteria = x)).Returns(expected);

        //Act
        var actual = await service.CreateFeedbackSubjectTemplateAsync(model);

        //Assert
        Assert.Equal(expected, actual);

        Assert.Equal(model.Subject, criteria.Subject);
    }

    [Fact]
    public async Task EditFeedbackSubjectTemplateAsync_WhenCalled_ReturnExpectedCommandResult()
    {
        //Arrange
        var fixture = new Fixture();
        var model = fixture.Create<EditFeedbackSubjectTemplate>();
        var expected = fixture.Create<CommandResult>();
        var criteria = new EditFeedbackSubjectTemplateCommand();
        var service = GetFeedbackSubjectService();
        baseService.ExecuteNonQueryAsync(Arg.Do<EditFeedbackSubjectTemplateCommand>(x => criteria = x)).Returns(expected);

        //Act
        var actual = await service.EditFeedbackSubjectTemplateAsync(model);

        //Assert
        Assert.Equal(expected, actual);

        Assert.Equal(model.TemplateId, criteria.TemplateId);
        Assert.Equal(model.Subject, criteria.Subject);
    }

    [Fact]
    public async Task EditStatusFeedbackSubjectTemplateAsync_WhenCalled_ReturnExpectedCommandResult()
    {
        //Arrange
        var fixture = new Fixture();
        var model = fixture.Create<EditStatusFeedbackSubjectTemplate>();
        var expected = fixture.Create<CommandResult>();
        var criteria = new EditStatusFeedbackSubjectTemplateCommand();
        var service = GetFeedbackSubjectService();
        baseService.ExecuteNonQueryAsync(Arg.Do<EditStatusFeedbackSubjectTemplateCommand>(x => criteria = x)).Returns(expected);

        //Act
        var actual = await service.EditStatusFeedbackSubjectTemplateAsync(model);

        //Assert
        Assert.Equal(expected, actual);

        Assert.Equal(model.TemplateId, criteria.TemplateId);
        Assert.Equal(model.IsActive, criteria.IsActive);
    }

    #region Helpers

    private FeedbackSubjectService GetFeedbackSubjectService()
    {
        baseService = Substitute.For<IBaseService>();
        var service = new FeedbackSubjectService(baseService);

        return service;
    }

    #endregion Helpers
}