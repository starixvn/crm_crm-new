namespace CRM.Criteria.Tests.PicAndHeadline;

using System;
using CRM.Criteria.PicAndHeadline;
using Xunit;

public class GetPicLogCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetPicLogCriteria();
        var expected = "Acc_CRM_PicLogSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetPicLogCriteria()
        {
            FromDate = DateTime.Now,
            ToDate = DateTime.Now.AddDays(-1)
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetPicLogCriteria()
        {
            FromDate = DateTime.Now,
            ToDate = DateTime.Now.AddDays(1)
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}