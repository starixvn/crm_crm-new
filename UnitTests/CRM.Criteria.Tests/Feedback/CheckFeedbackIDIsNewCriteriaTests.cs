namespace CRM.Criteria.Tests.Feedback;

using CRM.Criteria.Feedback;
using Xunit;

public class CheckFeedbackIDIsNewCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new CheckFeedbackIDIsNewCriteria();
        var expected = "Acc_CRM_NewManualFeedback_CheckFeedbackIDIsNew";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(0)]
    public void IsValid_FeedbackIsInvalid_ReturnFalse(int feedbackId)
    {
        // Arrange
        var criteria = new CheckFeedbackIDIsNewCriteria
        {
            FeedbackId = feedbackId
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Theory]
    [InlineData(1)]
    public void IsValid_FeedbackIsValid_ReturnTrue(int feedbackId)
    {
        // Arrange
        var criteria = new CheckFeedbackIDIsNewCriteria
        {
            FeedbackId = feedbackId
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}