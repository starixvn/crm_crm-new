namespace CRM.Criteria.Tests.Report.LogStatistics;

using System;
using CRM.Criteria.Report.LogStatistics;
using Xunit;

public class LogStatisticsDetailCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new LogStatisticsDetailCriteria();
        var expected = "Acc_CRM_NewRpt_DailyStatisticsDetail";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new LogStatisticsDetailCriteria
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
        var criteria = new LogStatisticsDetailCriteria
        {
            FromDate = DateTime.Now,
            ToDate = DateTime.Now
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}