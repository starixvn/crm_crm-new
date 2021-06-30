namespace CRM.Controllers
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Customer;
    using CRM.Criteria.Setting;
    using CRM.Services;
    using CRM.Services.Customer;
    using Fanex.Data;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;


    [CrmPermission(FunctionKey = FunctionKey.CustomerInfo, Policy = Policy.Read)]
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
        public async Task<IActionResult> Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CustomerInfo, Policy.Host);
            return View(isHost);
        }

        public async Task<IActionResult> GetCustomerInfo([FromBody] GetCustomerInfoByUsernameCriteria criteria)
        {
            var customerInfo = await customerService.GetCustomerInfoAsync(criteria);
            return Json(new { data = customerInfo });
        }

        public async Task<IActionResult> GetSettings()
        {
            var settings = new 
            {
                sites = await settingService.GetAllSiteAsync(),
                countries =  await settingService.GetAllCountryAsync(new GetAllCountryCriteria { Active = SettingConstants.Active }),
                languages = await settingService.GetAllLanguageAsync(new GetAllLanguageCriteria { Active = SettingConstants.Active })
            };
            return Json(settings);

        }

        [HttpPost]
        public async Task<IActionResult> EditCustomerInfo([FromBody] UpdateCustomerInfoCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var result = await customerService.UpdateCustomerInfoAsync(command);
            return Json(result);
        }
        //[HttpPost]
        //public async Task<IActionResult> GetLatestFeedback([FromBody] GetFeedbackParam param)
        //{
        //    IEnumerable<FeedbackSubjectTemplate> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);
        //    return Json(new { data = feedbacks });
        //}
    }
}
