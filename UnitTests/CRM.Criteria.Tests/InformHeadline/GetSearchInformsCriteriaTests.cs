namespace CRM.Criteria.Tests.InformHeadline;

using CRM.Criteria.InformHeadline;
using Xunit;

public class GetSearchInformsCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetEditInformsCriteria();
        var expected = "Acc_CRM_InformHeadlineSearchSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetEditInformsCriteria()
        {
            TitleId = 0,
            TypeAccount = 3,
            Currencies = "1,2,3",
            Levels = "1,2",
            Sites = "1,2,30",
            ExcludeIgnoredAccounts = true,
            IsVip = 2
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
        var criteria = new GetEditInformsCriteria()
        {
            TitleId = 10,
            TypeAccount = 3,
            Currencies = "1,2,3",
            Levels = "1,2",
            Sites = "1,2,30",
            ExcludeIgnoredAccounts = true,
            IsVip = 2
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}