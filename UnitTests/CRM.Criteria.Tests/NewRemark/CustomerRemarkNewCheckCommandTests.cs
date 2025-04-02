namespace CRM.Criteria.Tests.NewRemark;

using CRM.Criteria.NewRemark;
using Xunit;

public class CustomerRemarkNewCheckCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new CustomerRemarkNewCheckCriteria();
        var expected = "Acc_CRM_CustomerRemarkNewCheck";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new CustomerRemarkNewCheckCriteria
        {
            Username = ""
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsArevalid_ReturnTrue()
    {
        // Arrange
        var criteria = new CustomerRemarkNewCheckCriteria
        {
            Username = "test"
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}