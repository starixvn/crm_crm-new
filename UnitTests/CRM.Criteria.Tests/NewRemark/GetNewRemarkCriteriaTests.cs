namespace CRM.Criteria.Tests.NewRemark;

using CRM.Criteria.NewRemark;
using Xunit;

public class GetNewRemarkCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetNewRemarkCriteria();
        var expected = "Acc_CRM_CustomerRemarkNewSearch";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetNewRemarkCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}