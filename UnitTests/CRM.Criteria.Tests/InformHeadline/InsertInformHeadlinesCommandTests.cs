namespace CRM.Criteria.Tests.InformHeadline;

using CRM.Criteria.InformHeadline;
using Xunit;

public class InsertInformHeadlinesCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new InsertInformHeadlinesCommand();
        var expected = "Acc_CRM_InformHeadlineIns";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new InsertInformHeadlinesCommand()
        {
            TitleId = 10,
            Title = "test",
            TypeAccount = 3,
            Currencies = "1,2,3",
            Levels = "1,2",
            Sites = "1,2,30",
            ExcludeIgnoredAccounts = true,
            IsVip = 2,
            UserId = 8,
            IP = "1.0.0.0",
            Informs = null
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}