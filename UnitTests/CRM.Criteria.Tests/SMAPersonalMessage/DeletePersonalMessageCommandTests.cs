
using CRM.Criteria.SMAPersonalMessage;
using Xunit;

namespace CRM.Criteria.Tests.SMAPersonalMessage;

public class DeletePersonalMessageCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new DeletePersonalMessageCommand();
        var expected = "Acc_CRM_PersonalMessageDel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var command = new DeletePersonalMessageCommand
        {
            MessageID = 1
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}