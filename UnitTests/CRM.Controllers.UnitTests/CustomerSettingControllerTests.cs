namespace CRM.Controllers.UnitTests;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using Controllers.Customer;
using CRM.Criteria.Customer;
using CRM.Models.Customer;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services;
using Xunit;

public class CustomerSettingControllerTests
{
    private IBaseService baseService;
    private IPermissionService permissionService;
    private readonly IFixture fixture = new Fixture();

    [Fact]
    public async Task VerifyUsername_WhenCalled_ReturnExpectedJsonResult()
    {
        // Arrange
        var controler = GetController();
        var criteria = fixture.Create<VerifyRelatedCustomerCriteria>();
        var expected = fixture.Create<IEnumerable<RelatedCustomerPermission>>();
        baseService.GetDataAsync<RelatedCustomerPermission>(criteria).Returns(expected);

        // Act
        var result = await controler.VerifyUsername(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<IEnumerable<RelatedCustomerPermission>>(jsonResult.Value);
        Assert.Equal(expected, actual);
    }

    #region Helpers

    private CustomerSettingController GetController()
    {
        baseService = Substitute.For<IBaseService>();
        permissionService = Substitute.For<IPermissionService>();
        return new CustomerSettingController(baseService, permissionService);
    }

    #endregion Helpers
}