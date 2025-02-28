namespace CRM.Criteria.Tests.AdminTool.JobSettingManagement;

using CRM.Criteria.AdminTool.JobSettingManagement;
using Xunit;
public class GetConfigSettingCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetConfigSettingCriteria();
        var expected = "Acc_CRM_ConfigAutoFeedback_SettingSel";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetConfigSettingCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}