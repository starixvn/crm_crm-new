using System.Collections.Generic;
using CRM.Criteria.Announcement;
using CRM.Models.Announcement;
using Xunit;

namespace CRM.Criteria.Tests.Announcement;

public class CreateAnnouncementCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new CreateAnnouncementCommand();
        var expected = "Acc_CRM_ChatBot_Announcement_Ins";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(0, "title", null)]
    [InlineData(1, "", null)]
    [InlineData(1, "title", null)]
    public void IsValid_ParamsAreInvalid_ReturnFalse(int notificationTemplateId, string title, IList<Content> contents)
    {
        // Arrange
        var criteria = new CreateAnnouncementCommand
        {
            NotificationTemplateId = notificationTemplateId,
            Title = title,
            Contents = contents
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
        var criteria = new CreateAnnouncementCommand
        {
            AnnouncementId = 1,
            UserId = 1,
            NotificationTemplateId = 1,
            Title = "title",
            Contents = new List<Content> { new() { LanguageId = 1 } }
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}