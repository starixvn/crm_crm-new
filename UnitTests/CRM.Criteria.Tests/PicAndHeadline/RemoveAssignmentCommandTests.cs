namespace CRM.Criteria.Tests.PicAndHeadline;

using CRM.Criteria.PicAndHeadline;
using Xunit;

public class RemoveAssignmentCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new RemoveAssignmentCommand();
        var expected = "Acc_CRM_PICAssignmentDel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new RemoveAssignmentCommand
        {
            RemovedPICs = string.Empty
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
        var criteria = new RemoveAssignmentCommand
        {
            RemovedPICs = "pic"
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
        var criteria = new RemoveAssignmentCommand
        {
            RemovedPICs = "pic",
            UserId = 1,
            LoginIP = "ip"
        };

        // Act

        // Assert
        Assert.Equal("pic", criteria.RemovedPICs);
        Assert.Equal(1, criteria.UserId);
        Assert.Equal("ip", criteria.LoginIP);
    }
}