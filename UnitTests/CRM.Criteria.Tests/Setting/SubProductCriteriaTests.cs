namespace CRM.Criteria.Tests.Setting
{
    using Xunit;
    using CRM.Criteria.Setting;

    public class SubProductCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new SubProductCriteria();
            var expected = "Acc_CRM_SubProductList";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_AlwaysReturnTrue()
        {
            // Arrange
            var criteria = new SubProductCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }

        [Fact]
        public void ProductId_WhenSet_GetExpectedValue()
        {
            // Arrange
            var criteria = new SubProductCriteria
            {
                ProductID = 1
            };

            // Act

            // Assert
            Assert.Equal(1, criteria.ProductID);
        }
    }
}
