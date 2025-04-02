namespace CRM.Criteria.Tests.Report.FeedbackStatistic;

using System;
using CRM.Criteria.Report.FeedbackStatistic;
using Xunit;

public class GetFeedbackStatisticDetailCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetFeedbackStatisticDetailCriteria();
        var expected = "Acc_CRM_Rpt_FeedbackStatisticDetails";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetFeedbackStatisticDetailCriteria
        {
            FromDate = DateTime.Now,
            ToDate = DateTime.Now.AddDays(-1)
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetFeedbackStatisticDetailCriteria
        {
            FromDate = DateTime.Now,
            ToDate = DateTime.Now,
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}