namespace CRM.Criteria.Tests.Setting;

using CRM.Criteria.Setting;
using Xunit;

public class GetRoleByPicTypeTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetRoleByPicType();
        var expected = "Acc_CRM_PicRoleSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetRoleByPicType();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}