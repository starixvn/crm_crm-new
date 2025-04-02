using CRM.Criteria.AdminTool.SettingManagement;
using Xunit;

namespace CRM.Criteria.Tests.AdminTool.SettingManagement;

public class EditLicenseeMappingCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditLicenseeMappingCommand();
        var expected = "Acc_CRM_SourceLicenseeMappingUpd";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditLicenseeMappingCommand
        {
            SettingId = 1
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
        var criteria = new EditLicenseeMappingCommand
        {
            SettingId = 0
        };

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.False(actual);
    }
}