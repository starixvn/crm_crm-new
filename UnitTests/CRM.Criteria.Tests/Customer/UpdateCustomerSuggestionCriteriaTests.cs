namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class UpdateCustomerSuggestionCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new UpdateCustomerSuggestionCriteria();
        var expected = "Acc_CRM_CustomerUpdUserSearch";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var command = new UpdateCustomerSuggestionCriteria();

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}