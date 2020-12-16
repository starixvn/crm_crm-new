namespace CRM.BackgroundJob.UnitTests.Criteria.TurnoverControll
{
    using CRM.BackgroundJob.Criteria.TurnoverControll;
    using Xunit;

    public class InsertTOControl_AutoFeedbackInfoCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new InsertTOControl_AutoFeedbackInfoCommand();
            var expected = "Acc_CRM_TOControl_AutoFeedbackInfoIns";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamIsInvalid_ReturnTrue()
        {
            // Arrange
            var criteria = new InsertTOControl_AutoFeedbackInfoCommand
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
            var criteria = new InsertTOControl_AutoFeedbackInfoCommand
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
