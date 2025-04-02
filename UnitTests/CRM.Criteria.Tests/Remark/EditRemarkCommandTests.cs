namespace CRM.Criteria.Tests.Remark;

using CRM.Criteria.Remark;
using Xunit;

public class EditRemarkCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditRemarkCommand();
        var expected = "Acc_CRM_CustomerRemarkUpd";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditRemarkCommand();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}