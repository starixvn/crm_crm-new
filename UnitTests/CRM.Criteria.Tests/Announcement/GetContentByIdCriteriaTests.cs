using CRM.Criteria.Announcement;
using Xunit;

namespace CRM.Criteria.Tests.Announcement;

public class GetContentByIdCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetContentByIdCriteria();
        var expected = "Acc_CRM_ChatBot_AnnouncementDetail_Sel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetContentByIdCriteria { AnnouncementId = 0 };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetContentByIdCriteria { AnnouncementId = 1};
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}