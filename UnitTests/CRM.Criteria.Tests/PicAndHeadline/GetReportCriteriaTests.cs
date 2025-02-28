namespace CRM.Criteria.Tests.PicAndHeadline;

using CRM.Criteria.PicAndHeadline;
using Xunit;

public class GetReportCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetReportCriteria();
        var expected = "Acc_CRM_PicManagementSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetReportCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new GetReportCriteria
        {
            Username = "name",
            Role = "role",
            HeadlineName = "headline",
            TotalRows = 10,
            PageSize = 100,
            PageIndex = 1
        };

        // Act

        // Assert
        Assert.Equal("name", criteria.Username);
        Assert.Equal("role", criteria.Role);
        Assert.Equal("headline", criteria.HeadlineName);
        Assert.Equal(10, criteria.TotalRows);
        Assert.Equal(100, criteria.PageSize);
        Assert.Equal(1, criteria.PageIndex);
    }
}