namespace CRM.BackgroundJob.UnitTests.Criteria.SendNotificationCenter
{
    using CRM.BackgroundJob.Criteria.SendNotificationCenter;
    using Xunit;

    public class InsertNotificationAlertCommandTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var command = new InsertNotificationAlertCommand();
            var expected = "MNC_Notification_AlertIns";

            // Action
            var actual = command.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsAreValid_ReturnTrue()
        {
            // Arrange
            var command = new InsertNotificationAlertCommand();

            // Act
            var actual = command.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
