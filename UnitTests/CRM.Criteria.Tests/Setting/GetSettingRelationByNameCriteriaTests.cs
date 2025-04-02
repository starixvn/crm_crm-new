namespace CRM.Criteria.Tests.Setting;

using Xunit;
using CRM.Criteria.Setting;

public class GetSettingRelationByNameCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetSettingRelationByNameCriteria();
        var expected = "Acc_CRM_SettingGetRelationBySettingName";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetSettingRelationByNameCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new GetSettingRelationByNameCriteria
        {
            SettingName = "setting",
            ParentID = 1
        };

        // Act

        // Assert
        Assert.Equal("setting", criteria.SettingName);
        Assert.Equal(1, criteria.ParentID);
    }
}