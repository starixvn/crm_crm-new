namespace CRM.Criteria.Tests.Feedback.AddGuestFeedback;

using CRM.Criteria.Feedback.AddFeedback;
using Xunit;

public class AddCustomerFeedbackCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new AddCustomerFeedbackCommand();
        var expected = "Acc_CRM_NewManualFeedback_FeedbackIns";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var criteria = new AddCustomerFeedbackCommand();
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}