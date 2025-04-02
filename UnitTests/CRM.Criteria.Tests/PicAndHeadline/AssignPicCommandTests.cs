namespace CRM.Criteria.Tests.PicAndHeadline;

using CRM.Criteria.PicAndHeadline;
using Xunit;

public class AssignPicCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new AssignPicCommand();
        var expected = "Acc_CRM_PICAssignment";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(-1, "pic", "account")]
    [InlineData(1, "", "account")]
    [InlineData(1, "pic", "")]

    public void IsValid_ParamsAreInvalid_ReturnFalse(int headlineId, string picId, string directAccount)
    {
        // Arrange
        var criteria = new AssignPicCommand
        {
            HeadlineId = headlineId,
            PicId = picId,
            DirectAccount = directAccount
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
        var criteria = new AssignPicCommand
        {
            HeadlineId = 1,
            PicId = "pic",
            DirectAccount = "account"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new AssignPicCommand
        {
            HeadlineId = 1,
            PicId = "pic",
            DirectAccount = "account",
            IsKeepAssign = true,
            UserId = 2,
            LoginIP = "ip"
        };

        // Act

        // Assert
        Assert.Equal(1, criteria.HeadlineId);
        Assert.Equal("pic", criteria.PicId);
        Assert.Equal("account", criteria.DirectAccount);
        Assert.True(criteria.IsKeepAssign);
        Assert.Equal(2, criteria.UserId);
        Assert.Equal("ip", criteria.LoginIP);
    }
}