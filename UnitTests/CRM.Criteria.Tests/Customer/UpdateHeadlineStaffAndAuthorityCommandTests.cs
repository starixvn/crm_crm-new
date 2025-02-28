namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class UpdateHeadlineStaffAndAuthorityCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new UpdateHeadlineStaffAndAuthorityCommand();
        var expected = "Acc_CRM_NewAccDetail_UpdHeadlineStaffAndAuthority";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(1, 1, "tests")]
    public void IsValid_WhenCalled_ReturnTrue(int headlineID, int userID, string iP)
    {
        // Arrange
        var command = new UpdateHeadlineStaffAndAuthorityCommand
        {
            HeadlineID = headlineID,
            UserID = userID,
            IP = iP
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Theory]
    [InlineData(0, 0, "")]
    public void IsInValid_WhenCalled_ReturnFalse(int headlineID, int userID, string iP)
    {
        // Arrange
        var command = new UpdateHeadlineStaffAndAuthorityCommand
        {
            HeadlineID = headlineID,
            UserID = userID,
            IP = iP
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.False(actual);
    }
}