namespace CRM.Controllers.ActionLog
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.ActionLog;
    using CRM.Services;
    using CRM.Services.ActionLog;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
    public class ActionLogController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IActionLogService actionLogService;

        public ActionLogController(
            ISettingService settingService,
            IActionLogService actionLogService
        )
        {
            this.settingService = settingService;
            this.actionLogService = actionLogService;
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
            int totalItems = activityLogs.Count();
            if (totalItems > 0)
            {
                activityLogs = activityLogs.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
            }
            return Json(new { data = activityLogs, totalItems});
        }
    }
}
