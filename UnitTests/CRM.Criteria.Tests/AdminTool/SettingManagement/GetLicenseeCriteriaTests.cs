namespace CRM.Criteria.Tests.AdminTool.SettingManagement;

using CRM.Criteria.AdminTool.SettingManagement;
using Xunit;

public class GetLicenseeCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetLicenseeCriteria();
        var expected = "Acc_CRM_LicenseeMappingSel";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetLicenseeCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}