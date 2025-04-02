namespace CRM.Criteria.Tests.Report;

using CRM.Criteria.Report;
using Xunit;
public class GetIssuesStatisticReportCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetIssuesStatisticReportCriteria();
        var expected = "Acc_CRM_Rpt_FeedbackStatisticsPeriod";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetIssuesStatisticReportCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}