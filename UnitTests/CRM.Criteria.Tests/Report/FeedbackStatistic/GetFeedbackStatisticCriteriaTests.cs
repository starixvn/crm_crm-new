using System;
using CRM.Criteria.Report.FeedbackStatistic;
using Xunit;

namespace CRM.Criteria.Tests.Report.FeedbackStatistic;

public class GetFeedbackStatisticCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetFeedbackStatisticCriteria();
        var expected = "Acc_CRM_Rpt_FeedbackStatistics";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetFeedbackStatisticCriteria {
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
        var criteria = new GetFeedbackStatisticCriteria
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