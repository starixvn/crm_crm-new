namespace CRM.Criteria.Tests.Feedback.DeletedFeedback;

using CRM.Criteria.Feedback.DeletedFeedback;
using System;
using Xunit;

public class DeletedFeedbackCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetDeletedFeedbackCriteria();
        var expected = "Acc_CRM_FeedbackGetDeleted";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetDeletedFeedbackCriteria
        {
            FromDate = new DateTime(2021, 07, 30),
            ToDate = new DateTime(2021, 07, 1)
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetDeletedFeedbackCriteria
        {
            Username = "",
            IsGuest = true,
            MainCategoryId = null,
            SubCategoryId = 0,
            CommunicationId = 0,
            ResponseId = 0,
            IsReviewed = false,
            FromDate = new DateTime(2020, 07, 01),
            ToDate = new DateTime(2021, 07, 30)
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}