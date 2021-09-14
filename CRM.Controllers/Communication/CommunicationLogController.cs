namespace CRM.Controllers.Communication
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Communication;
    using CRM.Models.Customer;
    using CRM.Services;
    using CRM.Services.Communication;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class CommunicationLogController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ICommunicationService communicationService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;

        public CommunicationLogController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ICommunicationService communicationService,
            ISettingService settingService,
            IBaseService baseService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.communicationService = communicationService;
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

        public async Task<IActionResult> GetLogsByCustomerId([FromBody] GetLogsByCustomerIdCriteria criteria)
        {
            var logs = await communicationService.GetLogsByCustomerIdAsync(criteria);
            var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            return Json(new { data = logs, mainCategories });
        }
    }
}
