namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Services;
    using CRM.Services.Customer;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class CustomerInfoController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ICustomerService customerService;
        private readonly ISettingService settingService;
        private readonly ISessionService sessionService;


        public CustomerInfoController(
            INapSession napSession,
            ICustomerService customerService,
            ISettingService settingService,
            ISessionService sessionService,
            IUserService userService,
            INapSettings napSettings)
        {
            this.napSession = napSession;
            this.customerService = customerService;
            this.settingService = settingService;
            this.sessionService = sessionService;
        }

        public async Task<IActionResult> GetCustomerInfo([FromBody] GetCustomerInfoByUsernameCriteria criteria)
        {
            CustomerSession customerInfo = await customerService.GetCustomerInfoAsync(criteria);
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
            return Json(customerInfo);
        }

        public IActionResult GetCurrentCustomerInfo()
        {
            return Json(sessionService.CurrentCustomer);
        }

        public async Task<IActionResult> GetSettings()
        {
            var settings = new
            {
                sites = await settingService.GetAllSitesWithGroupAsync(),
                countries = await settingService.GetCountryAsync(SettingConstants.Active),
                languages = await settingService.GetLanguageAsync(SettingConstants.Active),
                sitesLicenseeInactive = await settingService.GetAllSitesLicenseeInactive()
            };
            return Json(settings);
        }

        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        [HttpPost]
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