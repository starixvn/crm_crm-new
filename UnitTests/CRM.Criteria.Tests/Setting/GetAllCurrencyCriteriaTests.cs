namespace CRM.Criteria.Tests.Setting;

using Xunit;
using CRM.Criteria.Setting;

public class GetAllCurrencyCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetAllCurrencyCriteria();
        var expected = "Acc_CRM_CurrencyList";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetAllCurrencyCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new GetAllCurrencyCriteria
        {
            IsTest = true,
            Active = 1,
            OfferSite = 2
        };

        // Act

        // Assert
        Assert.True(criteria.IsTest);
        Assert.Equal(1, criteria.Active);
        Assert.Equal(2, criteria.OfferSite);
    }
}