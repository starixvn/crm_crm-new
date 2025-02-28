namespace CRM.Criteria.Tests.AdminTool;

using CRM.Criteria.AdminTool;
using Xunit;

public class UpdateSettingRelationCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new UpdateSettingRelationCommand();
        var expected = "Acc_CRM_SettingRelationUpd";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenNotHaveSubSettings_ReturnTrue()
    {
        // Arrange
        var criteria = new UpdateSettingRelationCommand
        {
            ParentId = 1,
            SettingName = "SettingName",
            SubSettings = null,
            UserId = 1,
            Ip = "1"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void IsValid_WhenHaveSubSettings_ReturnTrue()
    {
        // Arrange
        var criteria = new UpdateSettingRelationCommand
        {
            ParentId = 1,
            SettingName = "SettingName",
            SubSettings =
            [
                new() { Id = 1, DisplayOrder = 1, IsActive = true, IsChild = true, Value = "value" },
                new() { Id = 2, DisplayOrder = 2, IsActive = true, IsChild = true, Value = "value" }
            ],
            UserId = 1,
            Ip = "1"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}