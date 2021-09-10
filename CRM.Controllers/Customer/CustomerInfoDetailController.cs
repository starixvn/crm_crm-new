namespace CRM.Controllers.Customer
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Customer;
    using CRM.Models.Customer;
    using CRM.Services;
    using CRM.Services.Customer;
    using CRM.ViewModels.Customer;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class CustomerInfoDetailController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ICustomerDetailService customerDetailService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;

        public CustomerInfoDetailController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ICustomerDetailService customerDetailService,
            ISettingService settingService,
            IBaseService baseService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.customerDetailService = customerDetailService;
            this.settingService = settingService;
            this.baseService = baseService;
        }

        public IActionResult Index()
        {
            var permission = new GetPermissionCustomer
            {
                CustomerInfoPolicy = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo),
                UpdateHeadlineInfoPolicy = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.Updateheadlineinfo)
            };

            return View(permission);
        }

        public async Task<IActionResult> GetCustomerInfoDetailById([FromBody] GetCustomerInfoDetailByIdCriteria criteria)
        {
            var customerInfo = await customerDetailService.GetCustomerInfoDetailByIdAsync(criteria);
            return Json(new { data = customerInfo });
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var allSettings = new CreateCustomerInfoViewModel
            {
                Countries = await settingService.GetCountryAsync(SettingConstants.Active, true),
                Languages = await settingService.GetLanguageAsync(SettingConstants.Active),
                LicenseeTypes = await settingService.GetLicenseeTypeAsync(),
                Sites = await settingService.GetAllSitesWithGroupAsync(),
                Titles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active)
            };
            return Json(allSettings);
        }
    }
}
