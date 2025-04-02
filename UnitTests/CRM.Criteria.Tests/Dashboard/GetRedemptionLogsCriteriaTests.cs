namespace CRM.Criteria.Tests.Dashboard;

using CRM.Criteria.Dashboard;
using Xunit;

public class GetRedemptionLogsCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetRedemptionLogsCriteria();
        var expected = "Acc_CRM_MainInformationRedemptionSel";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetRedemptionLogsCriteria()
        {
            CustomerId = 1
        };

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}