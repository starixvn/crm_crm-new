namespace CRM.Criteria.Tests.AdminTool.CommunicationToolSetting
{
    using CRM.Criteria.AdminTool.CommunicationToolSetting;
    using Xunit;

    public class CreateCommunicationToolSettingCommandTest
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new CreateCommunicationToolSettingCommand();
            var expected = "Acc_CRM_DefaultCommToolIns";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_WhenCalled_ReturnTrue()
        {
            // Arrange
            var criteria = new CreateCommunicationToolSettingCommand()
            {
                CategoryIds = "1",
                SubCategoryIds = "1",
                CommunicationIds = "1"
            };

            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
