namespace CRM.Criteria.Tests.AdminTool.JobSettingManagement;

using System.Collections.Generic;
using CRM.Criteria.AdminTool.JobSettingManagement;
using CRM.Criteria.AdminTool.SettingManagement;
using CRM.Models.AdminTool;
using Xunit;

public class EditJobSettingCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditJobSettingCommand();
        var expected = "Acc_CRM_ConfigAutoFeedback_SettingUpd";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditJobSettingCommand
        {
            Settings = new List<JobSettingXML>
            {
                new()
                {
                    ID = "1"
                }
            }
        };

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnFalse()
    {
        //Arrange
        var criteria = new AddNewSettingCommand();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.False(actual);
    }
}