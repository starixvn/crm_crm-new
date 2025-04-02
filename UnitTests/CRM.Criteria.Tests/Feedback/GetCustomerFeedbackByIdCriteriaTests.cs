namespace CRM.Criteria.Tests.Feedback;

using CRM.Criteria.Feedback;
using Xunit;

public class GetCustomerFeedbackByIdCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetCustomerFeedbackByIdCriteria();
        var expected = "Acc_CRM_FeedbackSelByID";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_FeedbackIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetCustomerFeedbackByIdCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_FeedbackIdIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetCustomerFeedbackByIdCriteria
        {
            FeedbackId = 1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}