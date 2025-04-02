using CRM.Criteria.Announcement;
using Xunit;

namespace CRM.Criteria.Tests.Announcement;

public class CancelAnnouncementCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new CancelAnnouncementCommand();
        var expected = "Acc_CRM_ChatBot_AnnouncementStatus_Upd";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(0, 1)]
    [InlineData(1, 0)]
    public void IsValid_ParamsAreInvalid_ReturnFalse(int announcementId, int userId)
    {
        // Arrange
        var criteria = new CancelAnnouncementCommand
        {
            AnnouncementId = announcementId,
            UserId = userId,
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
        var criteria = new CancelAnnouncementCommand
        {
            AnnouncementId = 1,
            UserId = 1,
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}