using CRM.Criteria.ManageSMAFeedback;
using Telegram.Bot.Types;
using Xunit;

namespace CRM.Criteria.Tests.ManageSMAFeedback
{
    public class EditSmaFeedbackCommandTests
    {
        [Fact]
        public void GetSettingKey_ShouldReturnEmptyString()
        {
            // Arrange
            var command = new EditSmaFeedbackCommand();

            // Act
            var result = command.GetSettingKey();

            // Assert
            Assert.Equal("", result);
        }

        [Fact]
        public void IsValid_ShouldReturnTrue()
        {
            // Arrange
            var command = new EditSmaFeedbackCommand();

            // Act
            var result = command.IsValid();

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Properties_ShouldSetAndGetValues()
        {
            // Arrange
            var command = new EditSmaFeedbackCommand();
            var custID = 1;
            var reviewStatus = "Approved";
            var discussion = "Solution discussed";

            // Act
            command.CustID = custID;
            command.ReviewStatus = reviewStatus;
            command.Discussion = discussion;

            // Assert
            Assert.Equal(custID, command.CustID);
            Assert.Equal(reviewStatus, command.ReviewStatus);
            Assert.Equal(discussion, command.Discussion);
        }
    }
}
