namespace CRM.Criteria.Tests.ActionLog;

using CRM.Criteria.ActionLog;
using Xunit;

public class GetActivityLogCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetActivityLogCriteria();
        var expected = "Acc_CRM_LogActionActivityList";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetActivityLogCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}