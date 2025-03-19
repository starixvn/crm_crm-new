namespace CRM.Controllers.Redemption;

using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Redemption;
using CRM.Services;
using CRM.Services.Redemption;
using Enum;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Read)]
public class RedemptionController(
    INapSession napSession,
    IRedemptionService redemptionService,
    ISettingService settingService,
    IBaseService baseService)
    : BaseController
{
    public async Task<IActionResult> GetLogsByCustomerId([FromBody] GetLogsByCustomerIdCriteria criteria)
    {
        var logs = await redemptionService.GetLogsByCustomerIdAsync(criteria);
        return Json(logs);
    }

    public async Task<IActionResult> GetAllStatus(bool isEdit)
    {
        var statuses = await settingService.GetStatusAsync(ViewTypeConstants.Redemption);
        var currencies = await settingService.GetCurrencyRedemptionAsync();
        if (!isEdit)
        {
            statuses = statuses.Where(x => x.StatusId != (int)FeedbackStatus.Deleted);
        }
        return Json(new { statuses, currencies });
    }

    public async Task<IActionResult> GetLogById(int id)
    {
        var log = await redemptionService.GetLogByIdAsync(id);
        return Json(log);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Host)]
    public async Task<IActionResult> EditRedemptionLog([FromBody] EditRedemptionLogCommand command)
    {
        command.UserId = napSession.UserId;
        command.IP = ClientIP;
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = $"{FunctionKey.Credit},{FunctionKey.Licensee}", Policy = Policy.Host)]
    public async Task<IActionResult> CreateRedemptionLog([FromBody] CreateRedemptionLogCommand command)
    {
        command.UserId = napSession.UserId;
        command.IP = ClientIP;
        var commandResult = await baseService.ExecuteNonQueryAsync(command);
        return Json(commandResult);
    }
}