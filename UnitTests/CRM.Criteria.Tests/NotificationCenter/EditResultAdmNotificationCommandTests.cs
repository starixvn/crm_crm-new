namespace CRM.Criteria.Tests.NotificationCenter
{
    using CRM.Criteria.NotificationCenter;
    using Xunit;

    public class EditResultAdmNotificationCommandTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var command = new EditResultAdmNotificationCommand();
            var expected = "MNC_Notification_AdmUpdNoti";

            // Action
            var actual = command.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsAreValid_ReturnTrue()
        {
            // Arrange
            var command = new EditResultAdmNotificationCommand
            {
                NotiID = 1,
                NewStatus = "New",
                NewSubject = "",
                NewContentEN = "",
                NewContentCH = "",
                NewContentCS = "",
                UpdaterID = 1
            };

            // Act
            var actual = command.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
