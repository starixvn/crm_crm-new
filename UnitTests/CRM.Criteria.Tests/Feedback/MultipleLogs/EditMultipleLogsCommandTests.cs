namespace CRM.Criteria.Tests.Feedback.MultipleLogs
{
    using CRM.Criteria.Feedback.MultipleLogs;
    using Xunit;

    public class EditMultipleLogsCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new EditMultipleLogsCommand();
            var expected = "Acc_CRM_GuestFeedbackUpd_Multiple";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsAreValid_ReturnTrue()
        {
            // Arrange
            var criteria = new EditMultipleLogsCommand();
            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
