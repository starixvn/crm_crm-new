namespace CRM.Criteria.Tests.SMAPersonalMessage;

using CRM.Criteria.SMAPersonalMessage;
using Xunit;
public class AddPersonalMessageCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new AddPersonalMessageCommand();
        var expected = "Acc_CRM_PersonalMessageIns";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData("", "userName")]
    [InlineData("content_en", "")]
    public void IsValid_ParamsAreInvalid_ReturnFalse(string content_en, string userName)
    {
        // Arrange
        var criteria = new AddPersonalMessageCommand
        {
            Content_en = content_en,
            CustList = userName
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
        var criteria = new AddPersonalMessageCommand
        {
            Content_en = "content_en",
            CustList = "UserName"
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}