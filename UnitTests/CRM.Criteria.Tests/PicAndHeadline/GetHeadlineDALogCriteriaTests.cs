namespace CRM.Criteria.Tests.PicAndHeadline;

using System;
using CRM.Criteria.PicAndHeadline;
using Xunit;

public class GetHeadlineDALogCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetHeadlineDALogCriteria();
        var expected = "Acc_CRM_DirectAccountLogSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetHeadlineDALogCriteria()
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
        var criteria = new GetHeadlineDALogCriteria()
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