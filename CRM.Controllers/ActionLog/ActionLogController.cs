namespace CRM.Controllers.ActionLog
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.ActionLog;
    using CRM.Services;
    using CRM.Services.ActionLog;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class ActionLogController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IActionLogService actionLogService;

        public ActionLogController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            IActionLogService actionLogService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.actionLogService = actionLogService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetAllLogAction(int actionType)
        {
            var allLogActions = await settingService.GetAllLogActionAsync(actionType);
            return Json(allLogActions);
        }

        [HttpPost]
        public async Task<IActionResult> GetActivityLog([FromBody] GetActivityLogCriteria criteria)
        {
            var activityLogs = await actionLogService.GetActivityLogAsync(criteria);
            return Json(activityLogs);
        }
    }
}
