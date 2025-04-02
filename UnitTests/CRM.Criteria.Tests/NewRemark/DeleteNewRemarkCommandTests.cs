namespace CRM.Criteria.Tests.NewRemark;

using CRM.Criteria.NewRemark;
using Xunit;

public class DeleteNewRemarkCommandTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new DeleteNewRemarkCommand();
        var expected = "Acc_CRM_CustomerRemarkNewDel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(0, 1)]
    [InlineData(1, 0)]
    public void IsValid_ParamsAreInvalid_ReturnFalse(int remarkID, int userID)
    {
        // Arrange
        var criteria = new DeleteNewRemarkCommand
        {
            RemarkID = remarkID,
            UserID = userID,
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
        var criteria = new DeleteNewRemarkCommand
        {
            RemarkID = 1,
            UserID = 1,
        };
        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}