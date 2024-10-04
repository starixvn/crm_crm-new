namespace CRM.Criteria.Tests.InformHeadline
{
    using System.Collections.Generic;
    using CRM.Criteria.InformHeadline;
    using CRM.Models.InformHeadline;
    using Xunit;

    public class EditInformsCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new EditInformsCommand();
            var expected = "Acc_CRM_InformHeadlineSearchUpd";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsAreValid_ReturnTrue()
        {
            // Arrange
            var criteria = new EditInformsCommand
            {
                TitleId = 1,
                Title = "Title",
                Currencies = "1, 2",
                Levels = "1, 2",
                Sites = "Sites",
                TypeAccount = 1,
                ChangeFilter = true,
                IsVip = 1,
                ExcludeIgnoredAccounts = true,
                UserId = 1,
                IP = "1",
                Informs = new List<EditInform> {
                    new() { HeadlineId = 1, GroupId = 1, InformHeadlineStatusId = 1, Remark = "Remark", Extension = 1, ProductStatus = 1 }
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
            var informs = new List<EditInform> {
                new() { HeadlineId = 1, GroupId = 1, InformHeadlineStatusId = 1, Remark = "Remark", Extension = 1, ProductStatus = 1 }
            };
            var expected = "<Content><Headline HeadlineID='1' GroupID='1' StatusID='1' Remark='Remark' Extension='1' ProductStatus='1'/></Content>";

            // Act
            var command = new EditInformsCommand
            {
                Informs = informs
            };

            // Assert
            Assert.Equal(expected, command.ContentXml);
        }
    }
}
