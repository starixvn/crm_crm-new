namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class GetSiteTypeByCustIdCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetSiteTypeByCustIdCriteria();
        var expected = "Acc_CRM_CustomerCheckSiteType";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var command = new GetSiteTypeByCustIdCriteria();

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}