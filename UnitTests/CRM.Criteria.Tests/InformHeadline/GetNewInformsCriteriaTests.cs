namespace CRM.Criteria.Tests.InformHeadline;

using CRM.Criteria.InformHeadline;
using Xunit;

public class GetNewInformsCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetNewInformsCriteria();
        var expected = "Acc_CRM_InformHeadlineSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetNewInformsCriteria()
        {
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