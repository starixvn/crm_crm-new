namespace CRM.Criteria.Tests.InformHeadline;

using CRM.Criteria.InformHeadline;
using Xunit;

public class UpdateInformStatusCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new EditInformStatusCommand();
        var expected = "Acc_CRM_InformTitleStatusUpd";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new EditInformStatusCommand()
        {
            TitleId = 0,
            StatusType = true,
            UserId = 8,
            IP = "1.0.0.0"
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
        var criteria = new EditInformStatusCommand()
        {
            TitleId = 10,
            StatusType = true,
            UserId = 8,
            IP = "1.0.0.0"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}