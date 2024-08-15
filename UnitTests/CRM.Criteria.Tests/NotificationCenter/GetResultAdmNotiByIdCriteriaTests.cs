namespace CRM.Criteria.Tests.NotificationCenter
{
    using CRM.Criteria.NotificationCenter;
    using Xunit;

    public class GetResultAdmNotiByIdCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var command = new GetResultAdmNotiByIdCriteria();
            var expected = "MNC_Notification_AdmSelNotiDetail";

            // Action
            var actual = command.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsAreValid_ReturnTrue()
        {
            // Arrange
            var command = new GetResultAdmNotiByIdCriteria
            {
                NotiID = 1
            };

            // Act
            var actual = command.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
