namespace CRM.Criteria.Tests.PicAndHeadline;

using CRM.Criteria.PicAndHeadline;
using Xunit;

public class GetAssignmentCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetAssignmentCriteria();
        var expected = "Acc_CRM_PICAssignmentSel";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        // Arrange
        var criteria = new GetAssignmentCriteria();

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }

    [Fact]
    public void Properties_WhenSet_GetExpectedValue()
    {
        // Arrange
        var criteria = new GetAssignmentCriteria
        {
            Site = "site",
            Currency = "currency",
            Status = "status",
            HeadlineType = 1,
            PicName = "name",
            DirectAccount = "account",
            GroupHeadline = "group",
            Position = "position",
            ExcludeAssignedAcc = true,
            ExcludeIgnoredAcc = true,
            ExcludeIsTest = true
        };

        // Act

        // Assert
        Assert.Equal("site", criteria.Site);
        Assert.Equal("currency", criteria.Currency);
        Assert.Equal("status", criteria.Status);
        Assert.Equal(1, criteria.HeadlineType);
        Assert.Equal("name", criteria.PicName);
        Assert.Equal("account", criteria.DirectAccount);
        Assert.Equal("group", criteria.GroupHeadline);
        Assert.Equal("position", criteria.Position);
        Assert.True(criteria.ExcludeAssignedAcc);
        Assert.True(criteria.ExcludeIgnoredAcc);
        Assert.True(criteria.ExcludeIsTest);
    }
}