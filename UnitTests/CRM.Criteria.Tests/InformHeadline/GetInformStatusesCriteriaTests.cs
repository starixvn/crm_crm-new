namespace CRM.Criteria.Tests.InformHeadline;

using CRM.Criteria.InformHeadline;
using Xunit;

public class GetInformStatusesCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetInformStatusesCriteria();
        var expected = "Acc_CRM_InformHeadlineStatusSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetInformStatusesCriteria
        {
            IsIncludeKeptForRefence = true
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}