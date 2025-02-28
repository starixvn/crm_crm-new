namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class GetAllCustomersCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetAllCustomersCriteria();
        var expected = "NAP_User_Search";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetAllCustomersCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}