namespace CRM.Criteria.Tests.Feedback
{
    using System.Collections.Generic;
    using CRM.Criteria.Feedback;
    using CRM.Models.Feedback;
    using Xunit;

    public class EditCustomerNewManualFeedbackCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new EditCustomerNewManualFeedbackCommand();
            var expected = "Acc_CRM_NewManualFeedback_FeedbackUpd";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(0,"", 0)]
        public void IsValid_ManualFeedbackIsInvalid_ReturnFalse(int feedbackID, string communicationToolIds, int languageID)
        {
            // Arrange
            var criteria = new EditCustomerNewManualFeedbackCommand
            {
                FeedbackID = feedbackID,
                CommunicationToolIds = communicationToolIds,
                LanguageID = languageID,
                Categories = null
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.False(actual);
        }

        [Theory]
        [InlineData(1,"test", 1)]
        public void IsValid_ManualFeedbackIsValid_ReturnTrue(int feedbackID, string communicationToolIds, int languageID)
        {
            // Arrange
            var criteria = new EditCustomerNewManualFeedbackCommand
            {
                FeedbackID = feedbackID,
                CommunicationToolIds = communicationToolIds,
                LanguageID = languageID,
                Categories = new List<CategorySubCategorySetting>()
                {
                    new()
                    {
                        MainCategoryId = 1,
                        SubCategoryId = 1
                    }
                }
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
