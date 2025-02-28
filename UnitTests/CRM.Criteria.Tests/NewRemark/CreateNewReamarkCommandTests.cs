namespace CRM.Criteria.Tests.NewRemark;

using CRM.Criteria.NewRemark;
using Xunit;

public class CreateNewReamarkCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new CreateNewReamarkCommand();
        var expected = "Acc_CRM_CustomerRemarkNewIns";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(0, "")]
    [InlineData(1, "")]
    public void IsValid_ParamsAreInvalid_ReturnFalse(int remarkTitle, string remark)
    {
        // Arrange
        var criteria = new CreateNewReamarkCommand
        {
            RemarkTitle = remarkTitle,
            Remark = remark,
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
        var criteria = new CreateNewReamarkCommand
        {
            RemarkTitle = 1,
            Remark = "remark",
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}