
namespace CRM.Controllers.AdminTool
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.AdminTool.LogSetting;
    using CRM.Services;
    using CRM.Services.ActionLog;
    using Microsoft.AspNetCore.Mvc;
    using System.Linq;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class SettingLogController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IActionLogService actionLogService;


        public SettingLogController(
            ISettingService settingService,
            IActionLogService actionLogService
            )
        {
            this.settingService = settingService;
            this.actionLogService = actionLogService;
        }

        [CrmPermission(FunctionKey = FunctionKey.SettingLog, Policy = Policy.Read)]
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
        [CrmPermission(FunctionKey = FunctionKey.SettingLog, Policy = Policy.Read)]
        public async Task<IActionResult> GetSettingLog([FromBody] GetSettingLogCriteria criteria)
        {
            var settingLogs = await actionLogService.GetSettingLogsAsync(criteria);
            return Json(new { totalItems = settingLogs.ToList().Count, data = settingLogs });
        }
    }
}
