namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class ValidateEditNewPicCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new ValidateEditNewPicCriteria();
        var expected = "Acc_CRM_NewAccDetail_PicUpdValidation";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(1)]
    public void IsValid_WhenCalled_ReturnTrue(int picId)
    {
        // Arrange
        var command = new ValidateEditNewPicCriteria
        {
            PicId = picId
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Theory]
    [InlineData(0)]
    public void IsInValid_WhenCalled_ReturnFalse(int picId)
    {
        // Arrange
        var command = new ValidateEditNewPicCriteria
        {
            PicId = picId
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.False(actual);
    }
}