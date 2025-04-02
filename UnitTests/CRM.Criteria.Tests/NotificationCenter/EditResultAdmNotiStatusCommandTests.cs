namespace CRM.Criteria.Tests.NotificationCenter;

using CRM.Criteria.NotificationCenter;
using Xunit;

public class EditResultAdmNotiStatusCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var command = new EditResultAdmNotiStatusCommand();
        var expected = "MNC_Notification_AdmUpdNotiSts";

        // Action
        var actual = command.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var command = new EditResultAdmNotiStatusCommand
        {
            NotiID = 1,
            NewStatus = "New",
            UpdaterID = 1
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}