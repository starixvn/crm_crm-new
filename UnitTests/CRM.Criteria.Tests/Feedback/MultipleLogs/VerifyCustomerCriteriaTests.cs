namespace CRM.Criteria.Tests.Feedback.MultipleLogs;

using CRM.Criteria.Feedback.MultipleLogs;
using Xunit;

public class VerifyCustomerCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new VerifyCustomerCriteria();
        var expected = "CRM_MultipleLogs_VerifyCustomer";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    public void IsValid_UsernameIsInvalid_ReturnFalse(string username)
    {
        // Arrange
        var criteria = new VerifyCustomerCriteria
        {
            Username = username
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_UsernameIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new VerifyCustomerCriteria
        {
            Username = "username"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}