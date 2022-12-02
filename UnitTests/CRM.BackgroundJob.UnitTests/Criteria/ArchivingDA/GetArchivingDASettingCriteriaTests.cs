namespace CRM.BackgroundJob.UnitTests.Criteria.ArchivingDA
{
    using CRM.BackgroundJob.Criteria.ArchivingDA;
    using Xunit;
    public class GetArchivingDASettingCriteriaTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new GetArchivingDASettingCriteria();
            var expected = "Acc_CRM_Service_SystemSettingSel";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnTrue()
        {
            // Arrange
            var criteria = new GetArchivingDASettingCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
