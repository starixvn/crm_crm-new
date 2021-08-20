namespace CRM.Criteria.Tests.InformHeadline
{
    using CRM.Criteria.InformHeadline;
    using Xunit;

    public class UpdateContactInformsCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new UpdateContactInformsCommand();
            var expected = "Acc_CRM_InformHeadlineUpd";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamIsValid_ReturnTrue()
        {
            // Arrange
            var criteria = new UpdateContactInformsCommand()
            {
                TitleId = 100,
                UserId = 8,
                IP = "1.0.0.0",
                Informs = null
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
