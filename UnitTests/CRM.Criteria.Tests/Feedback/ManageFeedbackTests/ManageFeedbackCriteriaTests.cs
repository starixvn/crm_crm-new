namespace CRM.Criteria.Tests.Feedback.ManageFeedbackTests;

using System;
using CRM.Criteria.Feedback.ManageFeedback;
using Xunit;

public class ManageFeedbackCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new ManageFeedbackCriteria();
        var expected = "Acc_CRM_ManageFeedbackList";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new ManageFeedbackCriteria
        {
            FeedbackId = 1,
            Username = "",
            IsGuest = true,
            MainCategoryId = null,
            SubCategoryId = 0,
            CommunicationId = 0,
            ResponseId = 0,
            IsReviewed = false,
            StatusId = 1,
            HandledBy = "test",
            FromDate = new DateTime(2020, 07, 01),
            ToDate = new DateTime(2021, 07, 30),
            PageSize = 100,
            PageIndex = 0,
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}