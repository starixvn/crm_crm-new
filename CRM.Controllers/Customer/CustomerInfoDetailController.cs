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
    using Fanex.Logging.Extensions;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Read)]
    [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Read)]
    public class CustomerInfoDetailController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ICustomerService customerService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly ICRMLogService logService;
        private readonly IPermissionService permissionService;

        public CustomerInfoDetailController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ICustomerService customerService,
            ISettingService settingService,
            IBaseService baseService,
            ICRMLogService logService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.customerService = customerService;
            this.settingService = settingService;
            this.baseService = baseService;
            this.logService = logService;
            this.permissionService = permissionService;
        }

        [HttpPost]
        public async Task<IActionResult> GetCustomerById([FromBody] GetCustomerInfoDetailByIdCriteria criteria)
        {
            var customerInfo = await customerService.GetCustomerByIdAsync(criteria);
            customerInfo.CustomerType = await customerService.GetSiteTypeByCustIdAsync(customerInfo.CustId);
            var logMessage = new LogMessage("Get Customer Feedback Info:")
                       .AddMessage(JsonConvert.SerializeObject(customerInfo, Formatting.Indented))
                       .ToString();

            logService.LogInformation(logMessage);
            return Json(customerInfo);
        }

        public async Task<IActionResult> GetAllSettings()
        {
            short licenseeType = await permissionService.GetSitePermissionAsync();

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
        [CrmMultiplePermission(FunctionKey = FunctionKey.Credit, Policy = Policy.Host)]
        [CrmMultiplePermission(FunctionKey = FunctionKey.Licensee, Policy = Policy.Host)]
        public async Task<IActionResult> EditCustomerInfoDetail([FromBody] EditCustomerInfoDetailCommand command)
        {
            var result = new CommandResult();
            bool isHostCredit = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Host);
            bool isHostLicensee = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Host);
            bool canEdit = await customerService.HasHostPermissionOnCustIdAsync(isHostCredit, isHostLicensee, command.CustomerId);
            if (canEdit)
            {
                command.UserId = napSession.UserId;
                command.IP = ClientIP;
                command.IsUpdateHeadlineInfo = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.Updateheadlineinfo, Policy.Host);
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