namespace CRM.Criteria.Tests.Report.WagerReport;

using CRM.Criteria.Report.WagerReport;
using Xunit;

public class GetWagerReportCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetWagerReportCriteria();
        var expected = "Acc_CRM_Rpt_FeedbackStatisticsWagers";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetWagerReportCriteria
        {
            Year = 2010
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
        var criteria = new GetWagerReportCriteria
        {
            Year = 2019
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
        var criteria = new GetWagerReportCriteria
        {
            Year = 2020,
            TimeSpan = -12
        };

        // Act

        // Assert
        Assert.Equal(2020, criteria.Year);
        Assert.Equal(-12, criteria.TimeSpan);
    }
}