namespace CRM.Criteria.Tests.NotificationCenter;

using System;
using CRM.Criteria.NotificationCenter;
using Xunit;

public class GetResultAdmNotificationCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var command = new GetResultAdmNotificationCriteria();
        var expected = "MNC_Notification_AdmSelNoti";

        // Action
        var actual = command.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var command = new GetResultAdmNotificationCriteria
        {
            FCreatedDateGMT8 = new DateTime(),
            TCreatedDateGMT8 = new DateTime(),
            NotiType = 1,
            FNotiID = 1,
            TNotiID = 2,
            MatchID = 1,
            MsgID = 1,
            Content = "test",
            Status = "New",
            Sender = "sa",
            TestOnly = true,
            PageIndex = 1,
            PageSize = 2,
            TotalRows = 3
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}