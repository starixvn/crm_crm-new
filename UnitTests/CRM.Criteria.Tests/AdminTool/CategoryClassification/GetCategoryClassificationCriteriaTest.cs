namespace CRM.Criteria.Tests.AdminTool.CategoryClassification;

using System.Collections.Generic;
using CRM.Criteria.AdminTool.CategoryClassification;
using CRM.Models.Feedback;
using Xunit;

public class GetCategoryClassificationCriteriaTest
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetCategoryClassificationCriteria();
        var expected = "Acc_CRM_CategoryClassificationList";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new GetCategoryClassificationCriteria()
        {
            Categories = new List<CategorySubCategorySetting>()
            {
                new()
                {
                    MainCategoryId = 1,
                    SubCategoryId = 2
                }
            }
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}