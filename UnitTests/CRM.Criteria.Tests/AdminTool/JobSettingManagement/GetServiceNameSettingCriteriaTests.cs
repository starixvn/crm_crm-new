namespace CRM.Criteria.Tests.AdminTool.JobSettingManagement;

using CRM.Criteria.AdminTool.JobSettingManagement;
using Xunit;
public class GetServiceNameSettingCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetServiceNameSettingCriteria();
        var expected = "Acc_CRM_ConfigAutoFeedback_ServiceSel";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetServiceNameSettingCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}