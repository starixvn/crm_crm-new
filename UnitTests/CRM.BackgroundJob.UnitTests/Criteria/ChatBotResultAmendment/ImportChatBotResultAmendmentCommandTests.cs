namespace CRM.BackgroundJob.UnitTests.Criteria.ChatBotResultAmendment
{
    using CRM.BackgroundJob.Criteria.ChatBot_ResultAmendment;
    using Xunit;

    public class ImportChatBotResultAmendmentCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new ImportChatBotResultAmendmentCommand();
            var expected = "Acc_CRM_Chatbot_ResultAmendment_Import";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnTrue()
        {
            // Arrange
            var criteria = new ImportChatBotResultAmendmentCommand
            {
                EventData = "EventData",
                TicketData = "TicketData",
                MessageData = "TicketData",
                Environment = "LIVE",
                ErrCode = 0,
                ErrMsg = ""
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }

        [Theory]
        [InlineData(null, null , null)]
        [InlineData("", "1", "2")]
        [InlineData(" ", "", null)]
        public void IsValid_ParamIsInvalid_ReturnFalse(string EventData, string TicketData, string MessageData)
        {
            // Arrange
            var criteria = new ImportChatBotResultAmendmentCommand
            {
                EventData = EventData,
                TicketData = TicketData,
                MessageData = MessageData
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.False(actual);
        }
    }
}
