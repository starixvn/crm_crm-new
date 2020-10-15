namespace CRM.Criteria.Tests.PicAndHeadline
{
    using CRM.Criteria.PicAndHeadline;
    using Xunit;

    public class GetReportCriteriaTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new GetReportCriteria();
            var expected = "Acc_CRM_PicManagementSel";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new GetReportCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}