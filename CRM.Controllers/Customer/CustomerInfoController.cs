namespace CRM.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models.Customer;
    using CRM.Services;
    using CRM.Services.Customer;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static System.Runtime.CompilerServices.RuntimeHelpers;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmMultiplePermissionAttribute(FunctionKey = FunctionKey.Credit, Policy = Policy.Read)]
    [CrmMultiplePermissionAttribute(FunctionKey = FunctionKey.Licensee, Policy = Policy.Read)]
    [CrmPermissionAttribute(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Read)]
    public class CustomerInfoController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ICustomerService customerService;
        private readonly ISettingService settingService;
        private readonly ISessionService sessionService;
        private readonly IPermissionService permissionService;


        public CustomerInfoController(
            INapSession napSession,
            ICustomerService customerService,
            ISettingService settingService,
            ISessionService sessionService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.customerService = customerService;
            this.settingService = settingService;
            this.sessionService = sessionService;
            this.permissionService = permissionService;
        }

        public async Task<IActionResult> GetCustomerInfo([FromBody] GetCustomerInfoByUsernameCriteria criteria)
        {
            var sitePermission = await permissionService.GetSitePermissionAsync();
            criteria.LicenseeType = sitePermission;
            CustomerInfoDetails customerInfo = await customerService.GetCustomerInfoAsync(criteria);
            if (customerInfo != null)
            {
                CurrentCustomer currentCustomer = new CurrentCustomer
                {
                    CustId = customerInfo.CustId,
                    Name = criteria.Username,
                    IsGuest = criteria.IsGuest
                };
                sessionService.CurrentCustomer = currentCustomer;
            }
            else
            {
                sessionService.CurrentCustomer = null;
            }
            var isError = criteria.ErrCode > 0 && !string.IsNullOrEmpty(criteria.ErrMsg);
            var errorJson = new {
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

        public IActionResult GetCurrentCustomer()
        {
            return Json(sessionService.CurrentCustomer);
        }

        public async Task<IActionResult> GetSettings()
        {
            var settings = new
            {
                sites = await settingService.GetAllSitesWithGroupAsync(),
                sitesByIsLicensee = await settingService.GetAllSitesGroupByIsLicenseeAsync(),
                countries = await settingService.GetCountryAsync(SettingConstants.Active),
                languages = await settingService.GetLanguageAsync(SettingConstants.Active),
                sitesLicenseeInactive = await settingService.GetAllSitesLicenseeInactive()
            };
            return Json(settings);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> EditCustomerInfo([FromBody] UpdateCustomerInfoCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var result = await customerService.UpdateCustomerInfoAsync(command);
            return Json(result);
        }

        public async Task<IActionResult> GetCustomerAutoSuggestion([FromBody] CustomerSuggestionCriteria criteria)
        {
            criteria.UserId = napSession.UserId;
            var customerInfo = await customerService.GetCustomerAutoSuggestionAsync(criteria);
            return Json(customerInfo);
        }
    }
}