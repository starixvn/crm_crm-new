namespace CRM.Criteria.Tests.Feedback.ManageFeedbackTests;

using CRM.Criteria.Feedback.ManageFeedback;
using Xunit;

public class EditMultipleLogStatusCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new EditMultipleLogStatusCommand();
        var expected = "Acc_CRM_UpdMultipleReviewAndStatus";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var criteria = new EditMultipleLogStatusCommand {
            ListFeedbackId = "1,2,3",
            StatusId = 1,
            IsReviewed = true
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Theory]
    [InlineData(null, 0)]
    [InlineData("", 1)]
    [InlineData("1", 0)]
    public void IsInValid_ParamsAreValid_ReturnFalse(string listFeedbackId, int statusId)
    {
        // Arrange
        var criteria = new EditMultipleLogStatusCommand
        {
            ListFeedbackId = listFeedbackId,
            StatusId = statusId,
            IsReviewed = true
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }
}