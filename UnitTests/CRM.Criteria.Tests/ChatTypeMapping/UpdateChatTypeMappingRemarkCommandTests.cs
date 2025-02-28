using CRM.Criteria.ChatTypeMapping;
using Xunit;

namespace CRM.Criteria.Tests.ChatTypeMapping;

public class UpdateChatTypeMappingRemarkCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new UpdateChatTypeMappingRemarkCommand();
        var expected = "Acc_CRM_ChatBot_ChatTypeMappingRemark_Upd";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new UpdateChatTypeMappingRemarkCommand
        {
            ConversationGroupId = 0
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsArevalid_ReturnTrue()
    {
        // Arrange
        var criteria = new UpdateChatTypeMappingRemarkCommand
        {
            ConversationGroupId = 1,
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}