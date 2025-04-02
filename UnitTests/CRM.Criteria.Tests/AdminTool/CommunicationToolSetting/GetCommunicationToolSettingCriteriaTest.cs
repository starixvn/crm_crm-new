namespace CRM.Criteria.Tests.AdminTool.CommunicationToolSetting;

using Criteria.AdminTool.CommunicationToolSetting;
using Xunit;

public class GetCommunicationToolSettingCriteriaTest
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetCommunicationToolSettingCriteria();
        var expected = "Acc_CRM_DefaultCommToolSearch";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new GetCommunicationToolSettingCriteria()
        {
            Username = "asd",
            CategoryIds = "1",
            SubCategoryIds = "1",
            IsDisableCategorySubCategory = false,
            PageIndex = 1,
            PageSize = 100
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}