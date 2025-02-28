namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class CheckDirectAccountCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new CheckDirectAccountCriteria();
        var expected = "Acc_CRM_CheckDirectAccount";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(1)]
    public void IsValid_WhenCalled_ReturnTrue(int customerId)
    {
        // Arrange
        var command = new CheckDirectAccountCriteria
        {
            CustomerId = customerId
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Theory]
    [InlineData(0)]
    public void IsInValid_WhenCalled_ReturnFalse(int customerId)
    {
        // Arrange
        var command = new CheckDirectAccountCriteria
        {
            CustomerId = customerId
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.False(actual);
    }
}