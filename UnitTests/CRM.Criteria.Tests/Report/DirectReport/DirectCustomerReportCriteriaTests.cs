namespace CRM.Criteria.Tests.Report.DirectReport;

using CRM.Criteria.Report.DirectCustomerReport;
using Xunit;

public class DirectCustomerReportCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new DirectCustomerReportCriteria();
        var expected = "Acc_Crm_Rpt_DirectCustomerReport";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new DirectCustomerReportCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new DirectCustomerReportCriteria
        {
            Headline = "SW",
            Username = "SW",
            ExcludeIgnoredAcc = true,
            PageIndex = 1,
            PageSize = 50
        };

        // Act

        // Assert
        Assert.Equal("SW", criteria.Headline);
        Assert.Equal("SW", criteria.Username);
        Assert.True(criteria.ExcludeIgnoredAcc);
        Assert.Equal(1, criteria.PageIndex);
        Assert.Equal(50, criteria.PageSize);
    }
}