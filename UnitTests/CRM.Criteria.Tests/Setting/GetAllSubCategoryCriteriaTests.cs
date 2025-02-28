namespace CRM.Criteria.Tests.Setting;

using Constants;
using CRM.Criteria.Setting;
using Xunit;

public class GetAllSubCategoryCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new GetAllSubCategoryCriteria();
        var expected = "Acc_CRM_SubCategoryList";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_AlwaysReturnTrue()
    {
        // Arrange
        var criteria = new GetAllSubCategoryCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new GetAllSubCategoryCriteria
        {
            MainCategoryId = 1
        };

        // Act

        // Assert
        Assert.Equal(1, criteria.MainCategoryId);
        Assert.Equal(Constants.UserRole, criteria.UserRole);
    }
}