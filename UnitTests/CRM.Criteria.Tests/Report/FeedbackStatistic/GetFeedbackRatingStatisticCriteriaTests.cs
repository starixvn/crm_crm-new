namespace CRM.Criteria.Tests.Report.FeedbackStatistic;

using System;
using Criteria.Report.FeedbackStatistic;
using Xunit;

public class GetFeedbackRatingStatisticCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnsExpectedKey()
    {
        // Arrange
        var criteria = new GetFeedbackRatingStatisticCriteria();

        // Act
        var result = criteria.GetSettingKey();

        // Assert
        Assert.Equal("Acc_CRM_Rpt_RatingFeedbackStatistic", result);
    }

    [Theory]
    [InlineData("2023-01-01", "2023-01-02", true)]
    [InlineData("2023-01-01", "2023-12-31", true)]
    [InlineData("2023-01-02", "2023-01-01", false)]
    public void IsValid_WhenCalled_ReturnsExpectedResult(string fromDate, string toDate, bool expected)
    {
        var parsedFromDate = DateTime.Parse(fromDate);
        var parsedToDate = DateTime.Parse(toDate);

        // Arrange
        var criteria = new GetFeedbackRatingStatisticCriteria
        {
            FromDate = parsedFromDate,
            ToDate = parsedToDate
        };

        // Act
        var result = criteria.IsValid();

        // Assert
        Assert.Equal(expected, result);
    }
}