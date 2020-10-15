namespace CRM.Criteria.Tests.Setting
{
    using Xunit;
    using CRM.Criteria.Setting;

    public class GetAllCommunicationToolCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ReturnCorrectSettingKey()
        {
            // Arrange
            var criteria = new GetAllCommunicationToolCriteria();
            var expected = "Acc_CRM_CommunicationToolList";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_AlwaysReturnTrue()
        {
            // Arrange
            var criteria = new GetAllCommunicationToolCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
