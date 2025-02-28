namespace CRM.Criteria.Tests.InformHeadline;

using CRM.Criteria.InformHeadline;
using Xunit;

public class GetRemovedAccountLogDetailsCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetRemovedAccountLogDetailsCriteria();
        var expected = "Acc_CRM_InformHeadlineHistorySel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetRemovedAccountLogDetailsCriteria
        {
            LogId = 0,
            PageIndex = 1,
            PageSize = 100,
            TotalRows = 0
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetRemovedAccountLogDetailsCriteria
        {
            LogId = 10,
            PageIndex = 1,
            PageSize = 100,
            TotalRows = 5
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}