namespace CRM.Criteria.Tests.Report.RedemptionStatistics;

using CRM.Criteria.Report.RedemptionStatistics;
using Xunit;
public class GetRedemptionStatisticsCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetRedemptionStatisticsCriteria();
        var expected = "Acc_Crm_Rpt_RedemptionStatistics";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetRedemptionStatisticsCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}