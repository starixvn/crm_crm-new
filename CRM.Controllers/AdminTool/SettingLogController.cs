
namespace CRM.Controllers.AdminTool
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.AdminTool.LogSetting;
    using CRM.Services;
    using CRM.Services.ActionLog;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.SettingLog, Policy = Policy.Read)]
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
            var totalItems = settingLogs.ToList().Count;
            if (totalItems > 0)
            {
                settingLogs = settingLogs.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
            }
            return Json(new { totalItems , data = settingLogs });
        }
    }
}
