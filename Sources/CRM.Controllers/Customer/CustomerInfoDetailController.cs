namespace CRM.Controllers.Customer
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Customer;
    using CRM.ViewModels.Customer;
    using Fanex.NAP.Client;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
    public class CustomerInfoDetailController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ICustomerService customerService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly IPermissionService permissionService;

        public CustomerInfoDetailController(
            INapSession napSession,
            ICustomerService customerService,
            ISettingService settingService,
            IBaseService baseService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.customerService = customerService;
            this.settingService = settingService;
            this.baseService = baseService;
            this.permissionService = permissionService;
        }

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
            short licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

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

            bool canEdit = await customerService.HasHostPermissionOnCustIdAsync(command.CustomerId);
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
}