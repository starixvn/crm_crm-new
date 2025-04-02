namespace CRM.Criteria.Tests.AdminTool.SettingManagement;

using CRM.Criteria.AdminTool.SettingManagement;
using Xunit;

public class GetLicenseeMappingCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetLicenseeMappingCriteria();
        var expected = "Acc_CRM_SourceLicenseeMappingSel";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetLicenseeMappingCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}