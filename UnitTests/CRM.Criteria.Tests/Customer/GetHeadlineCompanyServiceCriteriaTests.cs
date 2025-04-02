namespace CRM.Criteria.Tests.Customer;

using CRM.Criteria.Customer;
using Xunit;

public class GetHeadlineCompanyServiceCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetHeadlineCompanyServiceCriteria();
        var expected = "Acc_CRM_NewAccDetail_GetHeadlineCompanyService";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(1)]
    public void IsValid_WhenCalled_ReturnTrue(int headlineID)
    {
        // Arrange
        var command = new GetHeadlineCompanyServiceCriteria
        {
            HeadlineID = headlineID
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Theory]
    [InlineData(0)]
    public void IsInValid_WhenCalled_ReturnFalse(int headlineID)
    {
        // Arrange
        var command = new GetHeadlineCompanyServiceCriteria
        {
            HeadlineID = headlineID
        };

        // Act
        var actual = command.IsValid();

        // Assert
        Assert.False(actual);
    }
}