namespace CRM.Criteria.Tests.PicAndHeadline;

using CRM.Criteria.PicAndHeadline;
using Xunit;

public class SetDefaultPicCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new SetDefaultPicCommand();
        var expected = "Acc_CRM_PicDefaultIns";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(-1, "pic")]
    [InlineData(1, "")]

    public void IsValid_ParamsAreInvalid_ReturnFalse(int headlineId, string defaultPicIDs)
    {
        // Arrange
        var criteria = new SetDefaultPicCommand
        {
            HeadlineId = headlineId,
            DefaultPicIDs = defaultPicIDs
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
        var criteria = new SetDefaultPicCommand
        {
            HeadlineId = 1,
            DefaultPicIDs = "picId"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}