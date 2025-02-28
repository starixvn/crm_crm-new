using CRM.Criteria.AdminTool.SettingManagement;
using Xunit;

namespace CRM.Criteria.Tests.AdminTool.SettingManagement;

public class AddNewSettingCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new AddNewSettingCommand();
        var expected = "Acc_CRM_SettingIns";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new AddNewSettingCommand
        {
            SettingName = "SettingName",
            SettingValue = "SettingValue"
        };

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }

    [Theory]
    [InlineData("", null)]
    [InlineData("test", null)]
    [InlineData("test", "")]

    public void IsValid_WhenCalled_ReturnFalse(string settingName, string settingValue)
    {
        //Arrange
        var criteria = new AddNewSettingCommand
        {
            SettingName = settingName,
            SettingValue = settingValue
        };

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.False(actual);
    }
}