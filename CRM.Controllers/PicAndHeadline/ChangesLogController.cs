namespace CRM.Controllers.PicAndHeadline
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.PicAndHeadline;
    using CRM.Models.PicAndHeadline;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

   [CrmPermission(FunctionKey = FunctionKey.ChangesLog, Policy = Policy.Host)]
    public class ChangesLogController : BaseController
    {
        private readonly IBaseService baseService;

        private const int EndHour = 23;
        private const int EndMinuteSecond = 59;

        public ChangesLogController(
            IBaseService baseService
        )
        {
            this.baseService = baseService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GetHeadlineDAReportAsync([FromBody] GetHeadlineDALogCriteria criteria)
        {
            criteria.ToDate = criteria.ToDate.AddHours(EndHour).AddMinutes(EndMinuteSecond).AddSeconds(EndMinuteSecond);
            var logInfo = await baseService.GetDataAsync<ChangeHeadlineDALog>(criteria);
            if (criteria.TotalRows > 0)
            {
                logInfo = logInfo.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
            }
            return Json(new { logInfo, totals = criteria.TotalRows });
        }

        [HttpPost]
        public async Task<ActionResult> GetPicReportAsync([FromBody] GetPicLogCriteria criteria)
        {
            criteria.ToDate = criteria.ToDate.AddHours(EndHour).AddMinutes(EndMinuteSecond).AddSeconds(EndMinuteSecond);
            var picInfo = await baseService.GetDataAsync<ChangePicLogInfo>(criteria);
            if (criteria.TotalRows > 0)
            {
                picInfo = picInfo.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
            }
            return Json(new { picInfo, totals = criteria.TotalRows });
        }

        public async Task<ActionResult> GetActionTypesAsync()
        {
            var criteria = new GetActionTypeCriteria();
            var actionTypes = await baseService.GetDataAsync<ActionType>(criteria);
            return Json(actionTypes);
        }
    }
}
