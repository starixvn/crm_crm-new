
namespace CRM.Controllers.AdminTool
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.AdminTool.LogSetting;
    using CRM.Services;
    using CRM.Services.ActionLog;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Linq;
    using static Fanex.NAP.Core.Business.Constant;

    //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class SettingLogController : Controller
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IActionLogService actionLogService;


        public SettingLogController(
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

        //[CrmPermission(FunctionKey = FunctionKey.SettingLog, Policy = Policy.Read)]
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetActionLog()
        {
            var logAction = await settingService.GetAllLogActionAsync(2);
            return Json(logAction);
        }

        [HttpPost]
        //[CrmPermission(FunctionKey = FunctionKey.SettingLog, Policy = Policy.Read)]
        public async Task<IActionResult> GetSettingLog([FromBody] GetSettingLogCriteria criteria)
        {
            var settingLogs = await actionLogService.GetSettingLogsAsync(criteria);
            return Json(new { totalItems = settingLogs.ToList().Count, data = settingLogs });
        }
    }
}
