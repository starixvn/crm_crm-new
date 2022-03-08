namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Customer;
    using CRM.Models.Customer;
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
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ICustomerService customerService;
        private readonly ISettingService settingService;

        public CustomerInfoController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ICustomerService customerService,
            ISettingService settingService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.customerService = customerService;
            this.settingService = settingService;
        }

        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(isHost);
        }

        public async Task<IActionResult> GetCustomerInfo([FromBody] GetCustomerInfoByUsernameCriteria criteria)
        {
            CustomerInfo customerInfo = await customerService.GetCustomerInfoAsync(criteria);
            return Json(customerInfo);
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