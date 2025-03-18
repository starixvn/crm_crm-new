using CRM.Criteria.ManageSMAFeedback;
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
            var feedbackId = 1;
            var reviewStatus = "Approved";
            var discussionSolution = "Solution discussed";

            // Act
            command.FeedbackId = feedbackId;
            command.ReviewStatus = reviewStatus;
            command.DiscussionSolution = discussionSolution;

            // Assert
            Assert.Equal(feedbackId, command.FeedbackId);
            Assert.Equal(reviewStatus, command.ReviewStatus);
            Assert.Equal(discussionSolution, command.DiscussionSolution);
        }
    }
}
