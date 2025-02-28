namespace CRM.Criteria.Tests.Dashboard;

using CRM.Criteria.Dashboard;
using Xunit;

public class EditCustomerVerifyCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditCustomerVerifyCommand();
        var expected = "Acc_CRM_CustomerInformationVerify";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditCustomerVerifyCommand()
        {
            CustomerId = 1,
            IsVerifyEmail = true,
            IsVerifyPassport = false,
            IsVerifyBirthday = false,
            IsVerifySecretCode = false,
            IsVerifyBetCredit = false,
            IsVerifyGivenCredit = false,
            UserId = 8,
            IP = "1"
        };

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}