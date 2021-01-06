using CRM.BackgroundJob.Criteria.ChatBotCWL;
using Xunit;

namespace CRM.BackgroundJob.UnitTests.Criteria.ChatBotCWL
{
    public class GetCWLInfoByLogIdCriteriaTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new GetCWLInfoByLogIdCriteria
            {
                LastLogId = 1,
                BatchSize = 10
            };
            var expected = "Acc_CRM_Chatbot_CWL_Log_Sel";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnTrue()
        {
            // Arrange
            var criteria = new GetCWLInfoByLogIdCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
