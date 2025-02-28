namespace CRM.Criteria.Tests.Setting;

using Xunit;
using CRM.Criteria.Setting;

public class GetSettingCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetSettingCriteria();
        var expected = "Acc_CRM_SettingSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetSettingCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new GetSettingCriteria
        {
            SettingName = "setting",
            IsActive = true
        };

        // Act

        // Assert
        Assert.True(criteria.IsActive);
        Assert.Equal("setting", criteria.SettingName);
    }
}