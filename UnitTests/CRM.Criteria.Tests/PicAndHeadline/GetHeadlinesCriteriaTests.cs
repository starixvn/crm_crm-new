namespace CRM.Criteria.Tests.PicAndHeadline;

using CRM.Criteria.PicAndHeadline;
using Xunit;

public class GetHeadlinesCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetHeadlinesCriteria();
        var expected = "Acc_CRM_HeadlineSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new GetHeadlinesCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new GetHeadlinesCriteria
        {
            Username = "name"
        };

        // Act

        // Assert
        Assert.Equal("name", criteria.Username);
    }
}