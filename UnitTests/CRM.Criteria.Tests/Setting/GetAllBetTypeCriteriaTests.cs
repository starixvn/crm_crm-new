namespace CRM.Criteria.Tests.Setting
{
    using Xunit;
    using CRM.Criteria.Setting;

    public class GetAllBetTypeCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new GetAllBetTypeCriteria();
            var expected = "Acc_CRM_BetTypeList";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_AlwaysReturnTrue()
        {
            // Arrange
            var criteria = new GetAllBetTypeCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }

        [Fact]
        public void Properties_WhenSet_GetExpectedValue()
        {
            // Arrange
            var criteria = new GetAllBetTypeCriteria
            {
                ProductID = 1
            };

            // Act

            // Assert
            Assert.Equal(1, criteria.ProductID);
        }
    }
}
