namespace CRM.Criteria.Tests.NewRemark
{
    using CRM.Criteria.NewRemark;
    using Xunit;

    public class GetCustomerRemarkNewHistoryCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new GetCustomerRemarkNewHistoryCriteria();
            var expected = "Acc_CRM_CustomerRemarkNewHistory";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(0, 1)]
        [InlineData(1, 0)]
        public void IsValid_ParamsAreInvalid_ReturnFalse(int remarkID, int custId)
        {
            // Arrange
            var criteria = new GetCustomerRemarkNewHistoryCriteria
            {
                RemarkID = remarkID,
                CustID = custId,
            };
            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.False(actual);
        }

        [Fact]
        public void IsValid_ParamsArevalid_ReturnTrue()
        {
            // Arrange
            var criteria = new GetCustomerRemarkNewHistoryCriteria
            {
                RemarkID = 1,
                CustID = 1,
            };
            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
