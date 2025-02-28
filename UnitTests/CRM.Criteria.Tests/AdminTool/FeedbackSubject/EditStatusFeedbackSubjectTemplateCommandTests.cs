namespace CRM.Criteria.Tests.AdminTool.FeedbackSubject;

using Criteria.AdminTool.FeedbackSubject;
using Xunit;

public class EditStatusFeedbackSubjectTemplateCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditStatusFeedbackSubjectTemplateCommand();
        var expected = "Acc_CRM_SubjectTemplateDel";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditStatusFeedbackSubjectTemplateCommand();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}