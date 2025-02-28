namespace CRM.Criteria.Tests.AdminTool.FeedbackSubject;

using Criteria.AdminTool.FeedbackSubject;
using Xunit;

public class EditFeedbackSubjectTemplateCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditFeedbackSubjectTemplateCommand();
        var expected = "Acc_CRM_SubjectTemplateUpd";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditFeedbackSubjectTemplateCommand();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}