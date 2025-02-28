namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class EditCustomerInfoDetailCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditCustomerInfoDetailCommand();
        var expected = "Acc_CRM_CustomerUpd_New";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsInValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var command = new EditCustomerInfoDetailCommand( );

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}