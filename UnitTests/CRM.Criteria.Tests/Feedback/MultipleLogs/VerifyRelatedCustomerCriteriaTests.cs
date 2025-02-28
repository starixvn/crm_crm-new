namespace CRM.Criteria.Tests.Feedback.MultipleLogs;

using CRM.Criteria.Feedback.MultipleLogs;
using Xunit;

public class VerifyRelatedCustomerCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new VerifyRelatedCustomerCriteria();
        var expected = "CRM_MultipleLogs_VerifyRelatedCustomer";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(null, null)]
    [InlineData(null, "")]
    [InlineData("", "")]
    [InlineData("", "username")]
    [InlineData("headlineIds", "")]
    public void IsValid_ParamsAreInvalid_ReturnFalse(string headlineIds, string username)
    {
        // Arrange
        var criteria = new VerifyRelatedCustomerCriteria
        {
            HeadlineIds = headlineIds,
            Username = username
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var criteria = new VerifyRelatedCustomerCriteria
        {
            HeadlineIds = "headlineIds",
            Username = "username"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}