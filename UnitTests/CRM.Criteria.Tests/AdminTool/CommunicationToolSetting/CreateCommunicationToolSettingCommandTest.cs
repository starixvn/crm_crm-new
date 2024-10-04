namespace CRM.Criteria.Tests.AdminTool.CommunicationToolSetting
{
    using System.Collections.Generic;
    using CRM.Criteria.AdminTool.CommunicationToolSetting;
    using CRM.Models;
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

        [Fact]
        public void CustomerXml_HaveData_ReturnAsExpected()
        {
            // Arrange
            var customers = new List<BaseModel> {
                new() { Id = 1, Name = "Name" }
            };
            var expected = "<ROOT><Cust CustID='1' Username='Name' /></ROOT>";

            // Act
            var command = new CreateCommunicationToolSettingCommand
            {
                Customers = customers
            };

            // Assert
            Assert.Equal(expected, command.CustomerXml);
        }
    }
}
