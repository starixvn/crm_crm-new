namespace CRM.Criteria.Tests.AdminTool.CommunicationToolSetting;

using CRM.Criteria.AdminTool.CommunicationToolSetting;
using Xunit;

public class EditCommunicationToolSettingCommandTest
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new EditCommunicationToolSettingCommand();
        var expected = "Acc_CRM_DefaultCommToolUpd";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new EditCommunicationToolSettingCommand()
        {
            CategoryIds = "1",
            SubCategoryIds = "1",
            CommunicationIds = "1",
            DefaultCommId = 1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}