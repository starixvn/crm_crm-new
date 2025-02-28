namespace CRM.Criteria.Tests.Report.CustomerReport;

using CRM.Criteria.Report.CustomerReport;
using Xunit;

public class GetCustomerReportCriteriaTests
{
    [Fact]
    public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
    {
        //Arrange
        var criteria = new GetCustomerReportCriteria();
        var expected = "Acc_Crm_Rpt_CustomerReport";

        //Act
        var actual = criteria.GetSettingKey();

        //Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void IsValid_WhenCalled_ReturnTrue()
    {
        //Arrange
        var criteria = new GetCustomerReportCriteria();

        //Act
        var actual = criteria.IsValid();

        //Assert
        Assert.True(actual);
    }
}