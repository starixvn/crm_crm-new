namespace CRM.Criteria.Tests.NewRemark;

using CRM.Criteria.NewRemark;
using Xunit;

public class EditNewRemarkCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new EditNewRemarkCommand();
        var expected = "Acc_CRM_CustomerRemarkNewUpd";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(0, "remark")]
    [InlineData(1, "")]
    public void IsValid_ParamsAreInvalid_ReturnFalse(int remarkTitle, string remark)
    {
        // Arrange
        var criteria = new EditNewRemarkCommand
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
        var criteria = new EditNewRemarkCommand
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