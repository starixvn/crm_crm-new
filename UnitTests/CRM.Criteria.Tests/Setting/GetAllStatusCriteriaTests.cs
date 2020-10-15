namespace CRM.Criteria.Tests.Setting
{
    using Xunit;
    using CRM.Criteria.Setting;

    public class GetAllStatusCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new GetAllStatusCriteria();
            var expected = "Acc_CRM_StatusList";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_AlwaysReturnTrue()
        {
            // Arrange
            var criteria = new GetAllStatusCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
