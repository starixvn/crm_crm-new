namespace CRM.Controllers.Customer;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Customer;
using CRM.Resources;
using CRM.Services.Customer;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
public class CustomerInfoController(
    INapSession napSession,
    ICustomerService customerService,
    ISettingService settingService,
    ISessionService sessionService,
    IPermissionService permissionService)
    : BaseController
{
    public async Task<IActionResult> GetCustomerInfo([FromBody] GetCustomerInfoByUsernameCriteria criteria)
    {
        var sitePermission = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.LicenseeType = sitePermission;
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var customerInfo = await customerService.GetCustomerInfoAsync(criteria);
        if (customerInfo != null)
        {
            var custPermissionInfo = await customerService.GetSiteTypeByCustIdAsync(customerInfo.CustId);
            customerInfo.SitePermission = custPermissionInfo.SitePermission;
            customerInfo.CustomerType = custPermissionInfo.CustomerType;
            CurrentCustomer currentCustomer = new()
            {
                CustId = customerInfo.CustId,
                Name = criteria.SearchInfo,
                IsGuest = criteria.IsGuest,
                CustType = custPermissionInfo.CustomerType,
                SiteLabel = customerInfo.SitePermission,
            };
            sessionService.CurrentCustomer = currentCustomer;
        }

        var isError = criteria.ErrCode > 0 && !string.IsNullOrEmpty(criteria.ErrMsg);
        var errorJson = new
        {
            criteria.ErrCode,
            criteria.ErrMsg
        };

        return Json(isError ? errorJson : customerInfo);
    }

    [HttpPost]
    public async Task<JsonResult> UpdateCustomerSuggestion([FromBody] UpdateCustomerSuggestionCriteria criteria)
    {
        criteria.UserID = napSession.UserId;
        var commandResult = await customerService.UpdateCustomerSuggestionAsync(criteria);
        return Json(commandResult);
    }

    public IActionResult GetCurrentCustomer() => Json(sessionService.CurrentCustomer);

    public async Task<IActionResult> GetSettings()
    {
        var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

        var settings = new
        {
            sites = await settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType),
            sitesByIsLicensee = await settingService.GetAllSitesGroupByIsLicenseeAsync(licenseeType: licenseeType),
            countries = await settingService.GetCountryAsync(SettingConstants.Active),
            languages = await settingService.GetLanguageAsync(SettingConstants.Active),
            sitesLicenseeInactive = await settingService.GetAllSitesLicenseeInactive(licenseeType: licenseeType)
        };
        return Json(settings);
    }

    [HttpPost]
    public async Task<IActionResult> EditCustomerInfo([FromBody] UpdateCustomerInfoCommand command)
    {
        var result = new CommandResult();

        var canEdit = await customerService.HasHostPermissionOnCustIdAsync(command.CustId);
        if (canEdit)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            result = await customerService.UpdateCustomerInfoAsync(command);
        }
        else
        {
            result.Message = ViewResources.NoPermission;
        }

        return Json(result);
    }

    public async Task<IActionResult> GetCustomerAutoSuggestion([FromBody] CustomerSuggestionCriteria criteria)
    {
        var customerInfo = await customerService.GetCustomerAutoSuggestionAsync(criteria);
        return Json(customerInfo);
    }
}