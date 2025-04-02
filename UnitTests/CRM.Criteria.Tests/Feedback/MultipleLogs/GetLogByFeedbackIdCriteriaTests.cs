namespace CRM.Criteria.Tests.Feedback.MultipleLogs;

using Criteria.Feedback.MultipleLogs;
using Xunit;

public class GetLogByFeedbackIdCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetLogByFeedbackIdCriteria();
        var expected = "Acc_CRM_CommunicationLogSel";

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
        var criteria = new GetLogByFeedbackIdCriteria
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
        var criteria = new GetLogByFeedbackIdCriteria
        {
            FeedbackId = feedbackId
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}