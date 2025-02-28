namespace CRM.Criteria.Tests.Setting;

using Constants;
using Xunit;
using CRM.Criteria.Setting;

public class GetAllCommunicationToolCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetAllCommunicationToolCriteria();
        var expected = "Acc_CRM_CommunicationToolList";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetAllCommunicationToolCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void UserRole_WhenGet_ReturnExpectedValue()
    {
        // Arrange
        var criteria = new GetAllCommunicationToolCriteria();

        // Act

        // Assert
        Assert.Equal(Constants.UserRole, criteria.UserRole);
    }
}