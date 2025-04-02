namespace CRM.Criteria.Tests.PicAndHeadline;

using System;
using System.Collections.Generic;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;
using Xunit;

public class ValidateEditPicCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new ValidateEditPicCriteria();
        var expected = "Acc_CRM_PicUpdValidation";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new ValidateEditPicCriteria
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
        var criteria = new ValidateEditPicCriteria
        {
            PicId = 1
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
        var criteria = new ValidateEditPicCriteria
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
}