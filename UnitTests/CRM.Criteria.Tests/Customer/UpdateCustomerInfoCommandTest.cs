namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class UpdateCustomerInfoCommandTest
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new UpdateCustomerInfoCommand();
        var expected = "Acc_CRM_CustomerUpdateBasicInfo";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new UpdateCustomerInfoCommand();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}