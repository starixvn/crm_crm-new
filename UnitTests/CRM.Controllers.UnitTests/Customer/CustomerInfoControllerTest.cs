namespace CRM.Controllers.UnitTests.Customer;

using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using Controllers.Customer;
using CRM.Criteria.Customer;
using CRM.Models;
using CRM.Models.Customer;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Customer;
using Enum;
using Fanex.NAP.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.Interfaces;
using Xunit;
using static Fanex.NAP.Client.Helpers.Business.Constant;

public class CustomerInfoControllerTest : BaseController
{
    private INapSession napSession;
    private ICustomerService customerService;
    private ISettingService settingService;
    private ISessionService sessionService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetCustomerInfo_WhenCalled_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        fixture.Behaviors.Add(new OmitOnRecursionBehavior());
        var customer = fixture.Create<CustomerInfoDetails>();
        var param = new GetCustomerInfoByUsernameCriteria
        {
            SearchInfo = "test",
            IsGuest = true
        };
        var controller = GetController();
        permissionService.GetCurrentUserLicenseeTypeAsync().Returns((short)SitePermission.Both);
        customerService.GetCustomerInfoAsync(param).Returns(customer);
        customerService.GetSiteTypeByCustIdAsync(Arg.Any<int>()).
            Returns(new CustomerPermissionInfo { CustomerType = customer.CustomerType, SitePermission = customer.SitePermission });

        //Act
        var result = await controller.GetCustomerInfo(param);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var customerInfo = jsonResult.Value;
        Assert.Equal(customer, customerInfo);
    }

    [Fact]
    public async Task GetSettings_WhenCalled_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
        fixture.Behaviors.Add(new OmitOnRecursionBehavior(1));
        var sites = fixture.Create<IEnumerable<SiteInfo>>();
        var countries = fixture.Create<IEnumerable<Country>>();
        var languages = fixture.Create<IEnumerable<Language>>();
        var sitesLicenseeInactive = fixture.Create<IEnumerable<SiteInfo>>();
        var sitesByIsLicensee = fixture.Create<IEnumerable<SiteInfo>>();
        var controller = GetController();
        settingService.GetAllSitesWithGroupAsync().Returns(sites);
        settingService.GetCountryAsync(SettingConstants.Active).Returns(countries);
        settingService.GetLanguageAsync(SettingConstants.Active).Returns(languages);
        settingService.GetAllSitesLicenseeInactive().Returns(sitesLicenseeInactive);
        settingService.GetAllSitesGroupByIsLicenseeAsync().Returns(sitesByIsLicensee);

        //Act
        var result = await controller.GetSettings();

        //Asssert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var sitesJson = (IEnumerable<SiteInfo>)jsonResult.Value.GetType().GetProperty("sites").GetValue(jsonResult.Value);
        var countriesJson = (IEnumerable<Country>)jsonResult.Value.GetType().GetProperty("countries").GetValue(jsonResult.Value);
        var languagesJson = (IEnumerable<Language>)jsonResult.Value.GetType().GetProperty("languages").GetValue(jsonResult.Value);
        var siteInforJson = (IEnumerable<SiteInfo>)jsonResult.Value.GetType().GetProperty("sitesLicenseeInactive").GetValue(jsonResult.Value);
        Assert.Equal(sitesJson, sites);
        Assert.Equal(countriesJson, countries);
        Assert.Equal(languagesJson, languages);
        Assert.Equal(siteInforJson, sitesLicenseeInactive);
    }

    [Fact]
    public async Task EditCustomerInfo_WhenNoPermission_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var model = fixture.Create<UpdateCustomerInfoCommand>();
        var controller = GetController();

        //Act
        var result = await controller.EditCustomerInfo(model);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.False(commandResult.IsSuccessful);
        Assert.Equal(ViewResources.NoPermission, commandResult.Message);
    }

    [Fact]
    public async Task EditCustomerInfo_WhenHaveCorrectPermission_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<CommandResult>();
        var model = fixture.Create<UpdateCustomerInfoCommand>();
        var controller = GetController();
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Host).Returns(true);
        permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Host).Returns(true);
        customerService.HasHostPermissionOnCustIdAsync(Arg.Any<int>()).Returns(true);
        customerService.UpdateCustomerInfoAsync(model).Returns(expected);

        //Act
        var result = await controller.EditCustomerInfo(model);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var commandResult = Assert.IsAssignableFrom<CommandResult>(jsonResult.Value);
        Assert.Equal(expected, commandResult);
    }

    [Fact]
    public async Task GetCustomerAutoSuggestion_WhenCalled_ReturnExpectedData()
    {
        //Arrange
        var fixture = new Fixture();
        var expected = fixture.Create<IEnumerable<string>>();
        var model = fixture.Create<CustomerSuggestionCriteria>();
        var controller = GetController();
        customerService.GetCustomerAutoSuggestionAsync(model).Returns(expected);

        //Act
        var result = await controller.GetCustomerAutoSuggestion(model);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var customerInfo = jsonResult.Value;
        Assert.Equal(expected, customerInfo);
    }

    #region Helpers

    private CustomerInfoController GetController()
    {
        customerService = Substitute.For<ICustomerService>();
        settingService = Substitute.For<ISettingService>();
        napSession = Substitute.For<INapSession>();
        sessionService = Substitute.For<ISessionService>();
        permissionService = Substitute.For<IPermissionService>();
        var controller = new CustomerInfoController(napSession, customerService, settingService, sessionService, permissionService);
        controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            Connection =
            {
                RemoteIpAddress = new IPAddress(1)
            }
        };
        return controller;
    }

    #endregion Helpers
}