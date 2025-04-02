namespace CRM.Controllers.UnitTests.Customer;

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Customer;
using CRM.Criteria.Customer;
using CRM.Models;
using CRM.Models.Customer;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Customer;
using CRM.ViewModels.Customer;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.Interfaces;
using Xunit;
using static Fanex.NAP.Client.Helpers.Business.Constant;

public class CustomerInfoDetailControllerTest : BaseController
{
    private readonly IFixture fixture = new Fixture();
    private INapSession napSession;
    private ICustomerService customerService;
    private ISettingService settingService;
    private IBaseService baseService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetCustomerById_WhenCalled_ReturnAsExpectedResult()
    {
        //Arrange
        fixture.Behaviors.Add(new OmitOnRecursionBehavior());
        var customer = fixture.Create<CustomerInfoDetails>();
        var param = fixture.Create<GetCustomerInfoDetailByIdCriteria>();
        var controller = GetController();
        customerService.GetCustomerByIdAsync(param).Returns(customer);
        customerService.GetSiteTypeByCustIdAsync(Arg.Any<int>()).Returns(new CustomerPermissionInfo { CustomerType = customer.CustomerType, SitePermission = customer.SitePermission });

        //Act
        var result = await controller.GetCustomerById(param);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var customerInfoDetail = jsonResult.Value;
        Assert.Equal(customer, customerInfoDetail);
    }

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
    {
        //Arrange
        fixture.Behaviors.Add(new OmitOnRecursionBehavior());
        var countries = fixture.Create<IEnumerable<Country>>();
        var languages = fixture.Create<IEnumerable<Language>>();
        var licenseeTypes = fixture.Create<IEnumerable<BaseModel>>();
        var sites = fixture.Create<IEnumerable<SiteInfo>>();
        var titles = fixture.Create<IEnumerable<SettingRelation>>();

        var controller = GetController();
        settingService.GetCountryAsync(SettingConstants.Active, true).Returns(countries);
        settingService.GetLanguageAsync(SettingConstants.Active).Returns(languages);
        settingService.GetLicenseeTypeAsync().Returns(licenseeTypes);
        settingService.GetAllSitesWithGroupAsync().Returns(sites);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active).Returns(titles);

        // Act
        var result = await controller.GetAllSettings();

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var allSettings = (CreateCustomerInfoViewModel)jsonResult.Value;
        Assert.Equal(countries, allSettings.Countries);
        Assert.Equal(languages, allSettings.Languages);
        Assert.Equal(licenseeTypes, allSettings.LicenseeTypes);
        Assert.Equal(sites, allSettings.Sites);
        Assert.Equal(titles, allSettings.Titles);
    }

    [Fact]
    public async Task EditCustomerInfoDetail_WhenNoPermissionCalled_ReturnExpectedData()
    {
        //Arrange
        var command = fixture.Create<EditCustomerInfoDetailCommand>();
        var clientIP = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        var controller = GetController();
        controller.ControllerContext.HttpContext = clientIP;

        //Act
        var result = await controller.EditCustomerInfoDetail(command);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.False(actual.IsSuccessful);
        Assert.Equal(ViewResources.NoPermission, actual.Message);
    }

    [Fact]
    public async Task EditCustomerInfoDetail_WhenHavePermissionCalled_ReturnExpectedData()
    {
        var expected = fixture.Create<CommandResult>();
        //Arrange
        var command = fixture.Create<EditCustomerInfoDetailCommand>();
        var clientIP = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        var controller = GetController();
        controller.ControllerContext.HttpContext = clientIP;
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Host).Returns(true);
        customerService.HasHostPermissionOnCustIdAsync(Arg.Any<int>()).Returns(true);
        baseService.ExecuteNonQueryAsync(Arg.Any<EditCustomerInfoDetailCommand>()).Returns(expected);
        //Act
        var result = await controller.EditCustomerInfoDetail(command);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var actual = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, actual);
    }

    #region Helpers

    private CustomerInfoDetailController GetController()
    {
        customerService = Substitute.For<ICustomerService>();
        settingService = Substitute.For<ISettingService>();
        napSession = Substitute.For<INapSession>();
        baseService = Substitute.For<IBaseService>();
        permissionService = Substitute.For<IPermissionService>();
        return new CustomerInfoDetailController(napSession, customerService, settingService, baseService, permissionService);
    }

    #endregion Helpers
}