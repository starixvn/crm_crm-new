using CRM.Criteria.AdminTool.SettingManagement;
using Xunit;

namespace CRM.Criteria.Tests.AdminTool.SettingManagement;

public class EditStatusCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditStatusCommand();
        var expected = "Acc_CRM_SettingDel";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditStatusCommand();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}