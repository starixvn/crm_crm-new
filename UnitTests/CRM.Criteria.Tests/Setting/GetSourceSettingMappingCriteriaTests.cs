namespace CRM.Criteria.Tests.Setting
{
    using Xunit;
    using CRM.Criteria.Setting;

    public class GetSourceSettingMappingCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new GetSourceSettingMappingCriteria();
            var expected = "Acc_CRM_SourceSettingMappingSel";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_AlwaysReturnTrue()
        {
            // Arrange
            var criteria = new GetSourceSettingMappingCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
