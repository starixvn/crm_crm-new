namespace CRM.Services.UnitTests.Report;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Report.CustomerReport;
using CRM.Models.Report.CustomerReport;
using CRM.Services.Report;
using NSubstitute;
using Xunit;

public class CustomerReportServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;

    [Fact]
    public async Task GetCustomerReportAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var param = fixture.Create<GetCustomerReportParam>();
        var criteria = fixture.Create<GetCustomerReportCriteria>();
        var customerInfo = fixture.Create<IEnumerable<CustomerInfo>>();

        var service = GetService();
        baseService.GetDataAsync<CustomerInfo>(Arg.Do<GetCustomerReportCriteria>(x => criteria = x)).Returns(customerInfo);

        //Act
        var actual = await service.GetCustomerReportAsync(param);

        //Assert
        Assert.Equal(customerInfo, actual.CustomerList);
        Assert.Equal(criteria.TotalRows, actual.TotalCustomer);
    }

    #region Helpers

    private CustomerReportService GetService()
    {
        baseService = Substitute.For<IBaseService>();

        return new CustomerReportService(baseService);
    }
    #endregion
}