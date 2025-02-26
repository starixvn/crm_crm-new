
namespace CRM.Criteria.Tests.Announcement
{
    using CRM.Criteria.Announcement;
    using Xunit;
    public class GetAnnouncementCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new GetAnnouncementCriteria();
            var expected = "Acc_CRM_ChatBot_Announcement_Sel";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsArevalid_ReturnTrue()
        {
            // Arrange
            var criteria = new GetAnnouncementCriteria();
            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}