
namespace CRM.Criteria.Tests.Feedback.AddGuestFeedback;

using CRM.Criteria.Feedback.AddFeedback;
using Xunit;

public class AddGuestFeedbackCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new AddGuestFeedbackCommand();
        var expected = "Acc_CRM_NewManualFeedback_FeedbackIns_Guest";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var criteria = new AddGuestFeedbackCommand();
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}