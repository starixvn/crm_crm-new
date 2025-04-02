namespace CRM.Criteria.Tests.PicAndHeadline;

using CRM.Criteria.PicAndHeadline;
using Xunit;

public class ValidateAssignmentCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new ValidateAssignmentCriteria();
        var expected = "Acc_CRM_PICAssignmentValidation";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Theory]
    [InlineData(-1, "pic", "name")]
    [InlineData(1, "", "name")]
    [InlineData(1, "pic", "")]

    public void IsValid_ParamsAreInvalid_ReturnFalse(int headlineId, string picId, string userName)
    {
        // Arrange
        var criteria = new ValidateAssignmentCriteria
        {
            HeadlineId = headlineId,
            PicId = picId,
            Username = userName
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsAreValid_ReturnTrue()
    {
        // Arrange
        var criteria = new ValidateAssignmentCriteria
        {
            HeadlineId = 1,
            PicId = "picId",
            Username = "userName"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}