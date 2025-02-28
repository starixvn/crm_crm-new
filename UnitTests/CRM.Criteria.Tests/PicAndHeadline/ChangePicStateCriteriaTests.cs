namespace CRM.Criteria.Tests.PicAndHeadline;

using CRM.Criteria.PicAndHeadline;
using Xunit;

public class ChangePicStateCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new ChangePicStateCriteria();
        var expected = "Acc_CRM_PICStatusUpd";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new ChangePicStateCriteria
        {
            PicId = -1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var criteria = new ChangePicStateCriteria
        {
            PicId = 1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new ChangePicStateCriteria
        {
            IsActive = true,
            UserId = 1,
            LoginIP = "IP"
        };

        // Act

        // Assert
        Assert.True(criteria.IsActive);
        Assert.Equal(1, criteria.UserId);
        Assert.Equal("IP", criteria.LoginIP);
    }
}