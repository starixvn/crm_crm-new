namespace CRM.Controllers.ActionLog;

using Constants;
using CRM.Criteria.ActionLog;
using CRM.Services.ActionLog;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
public class ActionLogController(
    ISettingService settingService,
    IActionLogService actionLogService)
    : BaseController
{
    public async Task<IActionResult> GetAllLogAction(int actionType)
    {
        var allLogActions = await settingService.GetAllLogActionAsync(actionType);
        return Json(allLogActions);
    }

    [HttpPost]
    public async Task<IActionResult> GetActivityLog([FromBody] GetActivityLogCriteria criteria)
    {
        var activityLogs = await actionLogService.GetActivityLogAsync(criteria);
        var totalItems = activityLogs.Count();
        if (totalItems > 0)
        {
            activityLogs = activityLogs.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
        }
        return Json(new { data = activityLogs, totalItems });
    }
}