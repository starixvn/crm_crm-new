namespace CRM.Criteria.Tests.Report.RedemptionStatistics;

using System;
using CRM.Criteria.Report.RedemptionStatistics;
using Xunit;

public class GetRedemptionStatisticsDetailCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetRedemptionStatisticsDetailCriteria();
        var expected = "Acc_Crm_Rpt_RedemptionStatisticsDetail";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetRedemptionStatisticsDetailCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void IsInValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetRedemptionStatisticsDetailCriteria
        {
            FromDate = DateTime.Now,
            ToDate = DateTime.Now.AddDays(-1)
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }
}