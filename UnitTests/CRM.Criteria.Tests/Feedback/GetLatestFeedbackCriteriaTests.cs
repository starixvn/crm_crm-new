namespace CRM.Criteria.Tests.Feedback;

using CRM.Criteria.Feedback;
using Xunit;

public class GetLatestFeedbackCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetLatestFeedbackCriteria();
        var expected = "Acc_CRM_FeedbackSelTop";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetLatestFeedbackCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetLatestFeedbackCriteria
        {
            Top = 10
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}