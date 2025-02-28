namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class GetOtherAccountCommunicationInfoCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetOtherAccountCommunicationInfoCriteria();
        var expected = "Acc_CRM_NewLeftPanel_GetOtherAccountCommunicationInfo";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var command = new GetOtherAccountCommunicationInfoCriteria();

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }
}