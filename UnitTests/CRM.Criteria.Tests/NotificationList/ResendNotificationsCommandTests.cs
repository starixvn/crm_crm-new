namespace CRM.Criteria.Tests.NotificationList;

using CRM.Criteria.NotificationList;
using Xunit;

public class ResendNotificationsCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var command = new ResendNotificationsCommand();
        var expected = "Acc_CRM_Chatbot_ResendNotification";

        // Action
        var actual = command.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public void IsValid_NullOrEmptyNotificationIds_ReturnFalse(string notificationIds)
    {
        // Arrange
        var command = new ResendNotificationsCommand
        {
            NotificationIds = notificationIds
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_UserIdNotGreaterThanZero_ReturnFalse()
    {
        // Arrange
        var command = new ResendNotificationsCommand
        {
            UserId = 0
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ValidParams_ReturnTrue()
    {
        // Arrange
        var command = new ResendNotificationsCommand
        {
            NotificationIds = "1",
            UserId = 1
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}