using CRM.Criteria.AdminTool.SettingManagement;
using Xunit;

namespace CRM.Criteria.Tests.AdminTool.SettingManagement;

public class EditNewSettingCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditNewSettingCommand();
        var expected = "Acc_CRM_SettingUpd";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditNewSettingCommand
        {
            SettingId = 1,
            SettingName = "SettingName",
            SettingValue = "SettingValue"
        };

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }

    [Theory]
    [InlineData(2, "", null)]
    [InlineData(0, "test", "test")]
    [InlineData(1, "test", "")]

    public void IsValid_WhenCalled_ReturnFalse(int settingId, string settingName, string settingValue)
    {
        //Arrange
        var criteria = new EditNewSettingCommand
        {
            SettingId = settingId,
            SettingName = settingName,
            SettingValue = settingValue
        };

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.False(actual);
    }
}