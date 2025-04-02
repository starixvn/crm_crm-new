namespace CRM.Criteria.Tests.Report.DeletedFeedbackStatistic;

using System;
using Criteria.Report.DeletedFeedbackStatistic;
using Xunit;

public class DeletedFeedbackStatisticsCriteriaTests
{
    [Fact]
    public void GetSettingKey_ReturnCorrectSettingKey()
    {
        // Arrange
        var criteria = new DeletedFeedbackStatisticsCriteria();
        var expected = "Acc_CRM_Rpt_DeletedFeedbackStatistics";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new DeletedFeedbackStatisticsCriteria
        {
            FromDate = DateTime.Now,
            ToDate = DateTime.Now.AddDays(-1)
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamsAreInvalid_ReturnTrue()
    {
        // Arrange
        var criteria = new DeletedFeedbackStatisticsCriteria
        {
            Handler = "test",
            FromDate = DateTime.Now,
            ToDate = DateTime.Now,
            DeletedBy ="test"
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}