namespace CRM.Criteria.Tests.Report.LogStatistics;

using System;
using CRM.Criteria.Report.LogStatistics;
using Xunit;

public class LogStatisticsCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new LogStatisticsCriteria();
        var expected = "Acc_CRM_Rpt_DailyStatistics";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new LogStatisticsCriteria { ProductId = "" };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnTrue()
    {
        // Arrange
        var criteria = new LogStatisticsCriteria
        {
            FromDate = DateTime.Now,
            ToDate = DateTime.Now,
            ProductId = "1",
            MainCategoryId = "1",
            CommunicationId = "1"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}