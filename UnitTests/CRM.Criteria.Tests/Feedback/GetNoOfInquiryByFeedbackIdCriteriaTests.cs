namespace CRM.Criteria.Tests.Feedback;

using CRM.Criteria.Feedback;
using Xunit;

public class GetNoOfInquiryByFeedbackIdCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetNoOfInquiryByFeedbackIdCriteria();
        var expected = "Acc_CRM_FeedbackQuickSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_FeedbackIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetNoOfInquiryByFeedbackIdCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_FeedbackIdIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetNoOfInquiryByFeedbackIdCriteria
        {
            FeedbackId = 1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}