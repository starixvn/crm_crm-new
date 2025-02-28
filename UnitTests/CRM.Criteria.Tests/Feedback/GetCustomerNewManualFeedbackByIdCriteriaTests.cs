namespace CRM.Criteria.Tests.Feedback;

using CRM.Criteria.Feedback;
using Xunit;

public class GetCustomerNewManualFeedbackByIdCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetCustomerNewManualFeedbackByIdCriteria();
        var expected = "Acc_CRM_NewManualFeedback_FeedbackSelByID";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(0)]
    public void IsValid_ManualFeedbackIsInvalid_ReturnFalse(int FeedbackId)
    {
        // Arrange
        var criteria = new GetCustomerNewManualFeedbackByIdCriteria
        {
            FeedbackId = FeedbackId
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Theory]
    [InlineData(1)]
    public void IsValid_ManualFeedbackIsValid_ReturnTrue(int FeedbackId)
    {
        // Arrange
        var criteria = new GetCustomerNewManualFeedbackByIdCriteria
        {
            FeedbackId = FeedbackId
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}