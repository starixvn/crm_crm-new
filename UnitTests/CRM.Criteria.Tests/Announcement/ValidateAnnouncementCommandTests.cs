namespace CRM.Criteria.Tests.Announcement
{
    using System.Collections.Generic;
    using CRM.Criteria.Announcement;
    using CRM.Models.Announcement;
    using Xunit;

    public class ValidateAnnouncementCommandTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new ValidateAnnouncementCommand();
            var expected = "Acc_CRM_ChatBot_Announcement_Validation";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsArevalid_ReturnTrue()
        {
            // Arrange
            var criteria = new ValidateAnnouncementCommand
            {
                Contents = new List<Content> { new Content { LanguageId = 1 } }
            };
            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
