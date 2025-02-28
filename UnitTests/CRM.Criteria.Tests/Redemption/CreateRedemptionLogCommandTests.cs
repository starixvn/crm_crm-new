namespace CRM.Criteria.Tests.Redemption;

using CRM.Criteria.Redemption;
using Xunit;

public class CreateRedemptionLogCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new CreateRedemptionLogCommand();
        var expected = "Acc_CRM_RedemptionIns";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetLogsByCustomerIdCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}