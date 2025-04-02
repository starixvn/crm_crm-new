namespace CRM.Criteria.Tests.Communication;

using CRM.Criteria.Communication;
using Xunit;

public class EditCommunicationLogCommandTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new EditCommunicationLogCommand();
        var expected = "Acc_CRM_CommunicationLogUpd";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new EditCommunicationLogCommand();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}