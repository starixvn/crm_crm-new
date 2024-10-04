namespace CRM.Criteria.Tests.InformHeadline
{
    using System.Collections.Generic;
    using CRM.Criteria.InformHeadline;
    using CRM.Models.InformHeadline;
    using Xunit;

    public class EditContactInformsCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new EditContactInformsCommand();
            var expected = "Acc_CRM_InformHeadlineUpd";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsAreValid_ReturnTrue()
        {
            // Arrange
            var criteria = new EditContactInformsCommand
            {
                TitleId = 1,
                UserId = 1,
                IP = "1",
                listInforms = new List<EditInform> {
                    new() { HeadlineId = 1, InformHeadlineStatusId = 1, Remark = "Remark", Extension = 1, ProductStatus = 1 }
                }
            };
            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }

        [Fact]
        public void ContentXml_HaveData_ReturnAsExpected()
        {
            // Arrange
            var listInforms = new List<EditInform> {
                new() { HeadlineId = 1, GroupId = 1, InformHeadlineStatusId = 1, Remark = "Remark", Extension = 1, ProductStatus = 1 }
            };
            var expected = "<Content><Headline HeadlineID='1' StatusID='1' Remark='Remark' Extension='1' ProductStatus='1'/></Content>";

            // Act
            var command = new EditContactInformsCommand
            {
                listInforms = listInforms
            };

            // Assert
            Assert.Equal(expected, command.ContentXml);
        }
    }
}
