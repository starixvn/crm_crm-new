namespace CRM.Criteria.Tests.Report.DynamicReport;

using System;
using CRM.Criteria.Report.DynamicReport;
using Xunit;

public class GetDynamicReportCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        // Arrange
        var criteria = new GetDynamicReportCriteria();
        var expected = "Acc_CRM_Rpt_DynamicFeedback";

        // Act
        var actual = criteria.GetSettingKey();

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_ParamIdIsInvalid_ReturnFalse()
    {
        // Arrange
        var criteria = new GetDynamicReportCriteria()
        {
            FromDate = new DateTime(2022,04,06),
            ToDate = new DateTime(2022,03,06),
            ProductId = 1,
            SubProductId = 1,
            SiteId = 1,
            StatusId = 1,
            ResponseId = 1,
            RoleId = 1,
            CommunicationToolId = 1,
            MainCategoryId = 1,
            SubCategoryId = 1,
            Handler = "sa",
            Reviewer = "sa",
            ExtensionId = 1,
            Subject = "generation",
            PageIndex = 1,
            PageSize = 100,
            IsGetFullReport = true
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.False(actual);
    }

    [Fact]
    public void IsValid_ParamIsValid_ReturnTrue()
    {
        // Arrange
        var criteria = new GetDynamicReportCriteria()
        {
            FromDate = new DateTime(2022, 04, 06),
            ToDate = new DateTime(2022, 08, 06)
        };

        // Act
        var actual = criteria.IsValid();

        // Assert
        Assert.True(actual);
    }
}