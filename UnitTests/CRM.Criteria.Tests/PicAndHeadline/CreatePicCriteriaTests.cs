namespace CRM.Criteria.Tests.PicAndHeadline;

using System;
using System.Collections.Generic;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;
using Xunit;

public class CreatePicCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new CreatePicCriteria();
        var expected = "Acc_CRM_PicIns";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData("", 0)]
    [InlineData("", 1)]
    [InlineData("a", 0)]
    public void IsValid_ParamsAreInvalid_ReturnFalse(string picName, int role)
    {
        // Arrange
        var criteria = new CreatePicCriteria
        {
            PicName = picName,
            Role = role,
            PicCommunicationTools = new List<PicCommunicationTool>
            {
                new() { Type = 1, Value = "test" }
            }
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_EmptyPicCommunicationTool_ReturnFalse()
    {
        // Arrange
        var criteria = new CreatePicCriteria
        {
            PicName = "a",
            Role = 1,
            PicCommunicationTools = new List<PicCommunicationTool>()
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
        var criteria = new CreatePicCriteria
        {
            PicType = 1,
            PicName = "a",
            Role = 1,
            PicCommunicationTools = new List<PicCommunicationTool>
            {
                new() { Type = 1, Value = "test" }
            }
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void CommunicationTools_WhenGet_ReturnExpected()
    {
        // Arrange
        var criteria = new CreatePicCriteria
        {
            PicCommunicationTools = new List<PicCommunicationTool>
            {
                new() { Type = 1, Value = "test" }
            }
        };
        var expected = string.Format("<ROOT>{0}  <CommunicationTool SettingID=\"1\" SettingValue=\"test\" />{0}</ROOT>", Environment.NewLine);

        // Act
        var actual = criteria.CommunicationTools;

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new CreatePicCriteria
        {
            Language = "language",
            Country = 1,
            Remark = "remark",
            UserId = 2,
            LoginIP = "IP"
        };

        // Act

        // Assert
        Assert.Equal("language", criteria.Language);
        Assert.Equal(1, criteria.Country);
        Assert.Equal("remark", criteria.Remark);
        Assert.Equal(2, criteria.UserId);
        Assert.Equal("IP", criteria.LoginIP);
    }
}