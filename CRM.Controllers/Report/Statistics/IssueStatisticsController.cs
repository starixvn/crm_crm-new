using System.Linq;
using System.Threading.Tasks;
using CRM.Core.Constants;
using CRM.Criteria.Report.IssuesStatistics;
using CRM.Services;
using CRM.Services.Report;
using Fanex.NAP.Client.AspNetCore.Attributes;
using Fanex.NAP.Core.Business;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Report.Statistics
{

    public class IssueStatisticsController : Controller
    {
        private readonly IIssueStatisticsService issueStatisticsService;
        private readonly ISettingService settingService;

        public IssueStatisticsController(
            IIssueStatisticsService issueStatisticsService,
            ISettingService settingService
        )
        {
            this.issueStatisticsService = issueStatisticsService;
            this.settingService = settingService;
        }

        //[NapAuth(FunctionKey = FunctionKey.IssueStatistics, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View("../Report/IssueStatistics/Index");
        }

        public async Task<ActionResult> GetAllSettings()
        {
            var mainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active);
            var subCategories = await settingService.GetSubCategoryAsync(null, SettingConstants.Active);

            return Json(new { mainCategories, subCategories });
        }

        [HttpPost]
        public async Task<IActionResult> GetIssuesStatistics([FromBody] GetIssuesStatisticReportCriteria criteria)
        {
            var data = await issueStatisticsService.GetIssuesStatisticsReportAsync(criteria);
            return Json(data);
        }
    }
}
