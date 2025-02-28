namespace CRM.Criteria.Tests.ChatTypeMapping;

using CRM.Criteria.ChatTypeMapping;
using Xunit;

public class GetIgnoredNotificationTypeCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetIgnoredNotificationTypeCriteria();
        var expected = "Acc_CRM_ChatBot_IgnoredNotificationType_Sel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsArevalid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetIgnoredNotificationTypeCriteria();
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}