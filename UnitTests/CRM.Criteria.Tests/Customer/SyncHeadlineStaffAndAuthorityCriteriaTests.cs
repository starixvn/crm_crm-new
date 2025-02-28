namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class SyncHeadlineStaffAndAuthorityCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new SyncHeadlineStaffAndAuthorityCriteria();
        var expected = "Acc_CRM_NewAccDetail_SyncHeadlineStaffAndAuthority";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(1, 1,"Test")]
    public void IsValid_WhenCalled_ReturnTrue(int userID, int headlineID, string iP)
    {
        // Arrange
        var command = new SyncHeadlineStaffAndAuthorityCriteria
        {
            UserID = userID,
            HeadlineID = headlineID,
            IP = iP
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Theory]
    [InlineData(0,"")]
    public void IsInValid_WhenCalled_ReturnFalse(int userID, string iP)
    {
        // Arrange
        var command = new SyncHeadlineStaffAndAuthorityCriteria
        {
            UserID = userID,
            IP = iP
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.False(actual);
    }
}