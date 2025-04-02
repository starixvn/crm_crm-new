namespace CRM.Criteria.Tests.Setting;

using Constants;
using Xunit;
using CRM.Criteria.Setting;

public class GetAllMainCategoryCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetAllMainCategoryCriteria();
        var expected = "Acc_CRM_MainCategoryList";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetAllMainCategoryCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void UserRole_WhenGet_ReturnExpectedValue()
    {
        // Arrange
        var criteria = new GetAllMainCategoryCriteria();

        // Act

        // Assert
        Assert.Equal(Constants.UserRole, criteria.UserRole);
    }
}