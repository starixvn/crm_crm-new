namespace CRM.Services.UnitTests.Redemption;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Criteria.Redemption;
using CRM.Models.Redemption;
using CRM.Services.Redemption;
using Interfaces;
using NSubstitute;
using Xunit;

public class RedemptionServiceTests
{
    private readonly IFixture fixture = new Fixture();
    private IBaseService baseService;
    private ICommonService commonService;

    [Fact]
    public async Task GetLogsByCustomerIdAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var criteria = fixture.Create<GetLogsByCustomerIdCriteria>();
        var customerLogInfo = fixture.Create<IEnumerable<CustomerLogInfo>>();

        var service = GetService();
        baseService.GetDataAsync<CustomerLogInfo>(Arg.Do<GetLogsByCustomerIdCriteria>(x => criteria = x)).Returns(customerLogInfo);

        //Act
        var actual = await service.GetLogsByCustomerIdAsync(criteria);

        //Assert
        Assert.Equal(customerLogInfo, actual);
    }

    [Fact]
    public async Task GetLogByIdAsync_WhenCalled_ReturnExpectedResult()
    {
        //Arrange
        var criteria = fixture.Create<GetLogByIdCriteria>();
        var redemptionLogInfo = fixture.Create<IEnumerable<LogInfo>>();

        var service = GetService();
        baseService.GetDataAsync<LogInfo>(Arg.Do<GetLogByIdCriteria>(x => criteria = x)).Returns(redemptionLogInfo);

        //Act
        var actual = await service.GetLogByIdAsync(1);

        //Assert
        Assert.Equal(redemptionLogInfo.FirstOrDefault(), actual);
    }

    #region Helpers
    private RedemptionService GetService()
    {
        baseService = Substitute.For<IBaseService>();
        commonService = Substitute.For<ICommonService>();

        return new RedemptionService(baseService, commonService);
    }

    #endregion Helpers
}