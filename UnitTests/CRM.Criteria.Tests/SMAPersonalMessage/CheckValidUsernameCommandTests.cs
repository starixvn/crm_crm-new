using CRM.Criteria.SMAPersonalMessage;
using Xunit;

namespace CRM.Criteria.Tests.SMAPersonalMessage;

public class CheckValidUsernameCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new CheckValidUsernameCommand();
        var expected = "Acc_CRM_PersonalMessageCheck";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var command = new CheckValidUsernameCommand
        {
            UserName = "UserName"
        };
            
        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}