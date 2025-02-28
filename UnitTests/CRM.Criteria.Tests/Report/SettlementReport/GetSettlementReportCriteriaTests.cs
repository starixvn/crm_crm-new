namespace CRM.Criteria.Tests.Report.SettlementReport;

using CRM.Criteria.Report.SettlementReport;
using Xunit;

public class GetSettlementReportCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetSettlementReportCriteria();
        var expected = "Acc_CRM_Rpt_FeedbackStatisticsSettlement";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetSettlementReportCriteria
        {
            Year = 2010
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetSettlementReportCriteria
        {
            Year = 2020
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new GetSettlementReportCriteria
        {
            Year = 2020,
            TimeSpan = -12,
            PageIndex = 1,
            PageSize = 100,
            IsGetFullReport = true
        };

        // Act

        // Assert
        Assert.Equal(2020, criteria.Year);
        Assert.Equal(-12, criteria.TimeSpan);
        Assert.Equal(1, criteria.PageIndex);
        Assert.Equal(100, criteria.PageSize);
        Assert.True(criteria.IsGetFullReport);
    }
}