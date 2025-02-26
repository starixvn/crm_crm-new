namespace CRM.Criteria.Tests.SMAPersonalMessage
{
    using CRM.Criteria.SMAPersonalMessage;
    using Xunit;

    public class GetPersonalMessageCriteriaTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new GetPersonalMessageCriteria();
            var expected = "Acc_CRM_PersonalMessageSel";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnTrue()
        {
            // Arrange
            var criteria = new GetPersonalMessageCriteria();

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
