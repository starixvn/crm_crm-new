namespace CRM.BackgroundJob.UnitTests.Criteria.AutoFeedback
{
    using Fanex.CRM.BackgroundJob.Criteria;
    using Xunit;

    public class GetVoidingMessageCriteriaTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new GetVoidingMessageCriteria();
            var expected = "Acc_CRM_VoidingMessageSel";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnFalse()
        {
            // Arrange
            var criteria = new GetVoidingMessageCriteria
            {
                MaxVoidingHistoryCollectionId = 0
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnTrue()
        {
            // Arrange
            var criteria = new GetVoidingMessageCriteria
            {
                MaxVoidingHistoryCollectionId = 1
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}