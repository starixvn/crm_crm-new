namespace CRM.Criteria.Tests.AdminTool.CommunicationToolSetting;

using CRM.Criteria.AdminTool.CommunicationToolSetting;
using Xunit;

public class DeleteCommunicationToolSettingCommandTest
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new DeleteCommunicationToolSettingCommand();
        var expected = "Acc_CRM_DefaultCommToolDel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new DeleteCommunicationToolSettingCommand()
        {
            DefaultCommId = 1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}