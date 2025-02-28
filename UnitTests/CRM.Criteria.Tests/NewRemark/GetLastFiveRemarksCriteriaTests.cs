namespace CRM.Criteria.Tests.NewRemark;

using CRM.Criteria.NewRemark;
using Xunit;

public class GetLastFiveRemarksCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetLastFiveRemarksCriteria();
        var expected = "Acc_CRM_CustomerRemarkNewSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetLastFiveRemarksCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}