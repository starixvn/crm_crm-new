namespace CRM.Criteria.Tests.Setting;

using Constants;
using CRM.Criteria.Setting;
using Xunit;

public class GetAllActionCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey_WhenTypeIsActivityLog()
    {
        // Arrange
        var criteria = new GetAllActionCriteria()
        {
            ActionType = SettingConstants.ActivityLog
        };
        var expected = "Acc_CRM_ActivityLogList";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey_WhenTypeIsSettingLog()
    {
        // Arrange
        var criteria = new GetAllActionCriteria()
        {
            ActionType = SettingConstants.SettingLog
        };
        var expected = "Acc_CRM_SettingLogList";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetAllActionCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}