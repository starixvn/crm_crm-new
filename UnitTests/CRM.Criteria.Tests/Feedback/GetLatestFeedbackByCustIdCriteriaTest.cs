namespace CRM.Criteria.Tests.Feedback;

using CRM.Criteria.Feedback;
using Xunit;

public class GetLatestFeedbackByCustIdCriteriaTest
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetLatestFeedbackByCustIdCriteria();
        var expected = "Acc_CRM_FeedbackSelTopByCustId";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsInValid_WhenCalled_AlwaysReturnFalse()
    {
        // Arrange
        var criteria = new GetLatestFeedbackByCustIdCriteria()
        {
            CustID = 0,
            Top = 1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetLatestFeedbackByCustIdCriteria()
        {
            CustID = 1,
            Top = 1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}