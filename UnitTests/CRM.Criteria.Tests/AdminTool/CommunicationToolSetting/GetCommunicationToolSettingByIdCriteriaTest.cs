namespace CRM.Criteria.Tests.AdminTool.CommunicationToolSetting;

using CRM.Criteria.AdminTool.CommunicationToolSetting;
using Xunit;

public class GetCommunicationToolSettingByIdCriteriaTest
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetCommunicationToolSettingByIdCriteria();
        var expected = "Acc_CRM_DefaultCommToolSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new GetCommunicationToolSettingByIdCriteria()
        {
            DefaultCommId = 1
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}