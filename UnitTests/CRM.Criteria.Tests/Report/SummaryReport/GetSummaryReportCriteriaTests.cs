using CRM.Criteria.Report.CategoriesSummaryReport;
using Xunit;

namespace CRM.Criteria.Tests.Report.SummaryReport;

public class GetSummaryReportCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetSummaryReportCriteria();
        var expected = "Acc_CRM_Rpt_FeedbackStatisticsSummary";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetSummaryReportCriteria
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
        var criteria = new GetSummaryReportCriteria
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
        var criteria = new GetSummaryReportCriteria
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