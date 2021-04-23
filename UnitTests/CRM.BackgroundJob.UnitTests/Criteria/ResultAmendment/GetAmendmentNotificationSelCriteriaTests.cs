
namespace CRM.BackgroundJob.UnitTests.Criteria.ResultAmendment
{
    using CRM.BackgroundJob.Criteria.ResultAmendment;
    using Xunit;
    public class GetAmendmentNotificationSelCriteriaTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new GetAmendmentNotificationSelCriteria{
                LastTicketID = 1,
                BatchSizeTicket = 1,
                ConfigUAT = true,
                ConfigPRO = true,
                IsCredit = true,
                IsDeposit = true,
                Environment = "LIVE"
            };
            var expected = "Acc_CRM_AmendmentNotificationSel";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnTrue()
        {
            // Arrange
            var criteria = new GetAmendmentNotificationSelCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
