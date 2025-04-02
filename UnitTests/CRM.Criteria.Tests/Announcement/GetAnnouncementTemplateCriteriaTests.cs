using CRM.Criteria.Announcement;
using Xunit;

namespace CRM.Criteria.Tests.Announcement;

public class GetAnnouncementTemplateCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetAnnouncementTemplateCriteria();
        var expected = "Acc_CRM_ChatBot_AnnouncementNotificationTemplate_Sel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsArevalid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetAnnouncementTemplateCriteria();
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}