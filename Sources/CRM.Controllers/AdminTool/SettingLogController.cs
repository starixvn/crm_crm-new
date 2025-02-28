
namespace CRM.Controllers.AdminTool;

using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.AdminTool.LogSetting;
using CRM.Services.ActionLog;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.SettingLog, Policy = Policy.Read)]
public class SettingLogController(
    ISettingService settingService,
    IActionLogService actionLogService)
    : BaseController
{
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