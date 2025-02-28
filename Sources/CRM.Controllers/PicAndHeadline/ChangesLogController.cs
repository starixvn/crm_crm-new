namespace CRM.Controllers.PicAndHeadline;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.PicAndHeadline;
using CRM.Models.PicAndHeadline;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.ChangesLog, Policy = Policy.Read)]
public class ChangesLogController(IBaseService baseService) : Controller
{
    private const int EndHour = 23;
    private const int EndMinuteSecond = 59;

    [HttpPost]
    public async Task<IActionResult> GetHeadlineDAReport([FromBody] GetHeadlineDALogCriteria criteria)
    {
        criteria.ToDate = criteria.ToDate.AddHours(EndHour).AddMinutes(EndMinuteSecond).AddSeconds(EndMinuteSecond);
        var logInfo = await baseService.GetDataAsync<ChangeHeadlineDALog>(criteria);
        return Json(new { logInfo, totals = criteria.TotalRows });
    }

    [HttpPost]
    public async Task<ActionResult> GetPicReport([FromBody] GetPicLogCriteria criteria)
    {
        criteria.ToDate = criteria.ToDate.AddHours(EndHour).AddMinutes(EndMinuteSecond).AddSeconds(EndMinuteSecond);
        var picInfo = await baseService.GetDataAsync<ChangePicLogInfo>(criteria);
        return Json(new { picInfo, totals = criteria.TotalRows });
    }

    public async Task<IActionResult> GetActionTypes()
    {
        var criteria = new GetActionTypeCriteria();
        var actionTypes = await baseService.GetDataAsync<ActionType>(criteria);
        return Json(actionTypes);
    }
}