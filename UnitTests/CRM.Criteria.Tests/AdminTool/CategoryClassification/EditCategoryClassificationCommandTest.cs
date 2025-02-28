namespace CRM.Criteria.Tests.AdminTool.CategoryClassification;

using CRM.Criteria.AdminTool.CategoryClassification;
using Xunit;

public class EditCategoryClassificationCommandTest
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new EditCategoryClassificationCommand();
        var expected = "Acc_CRM_CategoryClassificationUpd";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new EditCategoryClassificationCommand();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}