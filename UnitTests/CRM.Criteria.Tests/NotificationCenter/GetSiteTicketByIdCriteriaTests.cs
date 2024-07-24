namespace CRM.Criteria.Tests.NotificationCenter
{
    using CRM.Criteria.NotificationCenter;
    using Xunit;

    public class GetSiteTicketByIdCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var command = new GetSiteTicketByIdCriteria();
            var expected = "MNC_Notification_AdmSelNotiTickets";

            // Action
            var actual = command.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsAreValid_ReturnTrue()
        {
            // Arrange
            var command = new GetSiteTicketByIdCriteria
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
