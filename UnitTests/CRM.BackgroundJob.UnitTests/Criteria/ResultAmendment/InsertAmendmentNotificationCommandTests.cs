namespace CRM.BackgroundJob.UnitTests.Criteria.ResultAmendment
{
    using CRM.BackgroundJob.Criteria.ResultAmendment;
    using Xunit;

    public class InsertAmendmentNotificationCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new InsertAmendmentNotificationCommand();
            var expected = "Acc_CRM_AmendmentNoti_AutoFeedbackInfoIns";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamIsInvalid_ReturnTrue()
        {
            // Arrange
            var criteria = new InsertAmendmentNotificationCommand
            {
                xml = "1"
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData(" ")]

        public void IsValid_ParamIsInvalid_ReturnFalse(string xml)
        {
            // Arrange
            var criteria = new InsertAmendmentNotificationCommand
            {
                xml = xml
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.False(actual);
        }
    }
}
