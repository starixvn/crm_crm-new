namespace CRM.Controllers.Customer;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Customer;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Customer;
using CRM.ViewModels.Customer;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
public class CustomerInfoDetailController(
    INapSession napSession,
    ICustomerService customerService,
    ISettingService settingService,
    IBaseService baseService,
    IPermissionService permissionService)
    : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetCustomerById([FromBody] GetCustomerInfoDetailByIdCriteria criteria)
    {
        var customerInfo = await customerService.GetCustomerByIdAsync(criteria);
        var customerPermissionInfo = await customerService.GetSiteTypeByCustIdAsync(customerInfo.CustId);
        customerInfo.SitePermission = customerPermissionInfo.SitePermission;
        customerInfo.CustomerType = customerPermissionInfo.CustomerType;

        return Json(customerInfo);
    }

    public async Task<IActionResult> GetAllSettings()
    {
        var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

        var allSettings = new CreateCustomerInfoViewModel
        {
            Countries = await settingService.GetCountryAsync(SettingConstants.Active, true),
            Languages = await settingService.GetLanguageAsync(SettingConstants.Active),
            LicenseeTypes = await settingService.GetLicenseeTypeAsync(),
            Sites = await settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType),
            Titles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active)
        };
        return Json(allSettings);
    }

    [HttpPost]
    public async Task<IActionResult> EditCustomerInfoDetail([FromBody] EditCustomerInfoDetailCommand command)
    {
        var result = new CommandResult();

        var canEdit = await customerService.HasHostPermissionOnCustIdAsync(command.CustomerId);
        if (canEdit)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            command.IsUpdateHeadlineInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Headlineinfo, Policy.Host);
            result = await baseService.ExecuteNonQueryAsync(command);
        }
        else
        {
            result.Message = ViewResources.NoPermission;
        }

        return Json(result);
    }
}