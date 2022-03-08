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

    public class IssueStatisticsController : BaseController
    {
        private readonly IIssuesStatisticsService issuesStatisticsService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;

        public IssueStatisticsController(
            IIssuesStatisticsService issuesStatisticsService,
            ISettingService settingService,
            IExportExcelService excelService
        )
        {
            this.issuesStatisticsService = issuesStatisticsService;
            this.settingService = settingService;
            this.excelService = excelService;
        }

        [NapAuth(FunctionKey = FunctionKey.IssueStatistics, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View("../Report/IssueStatistics/Index");
        }

        public async Task<ActionResult> GetMainSubCategories()
        {
            var categories = await settingService.GetAllMainSubCategoriesAsync();
            var categoriesActive = categories.Where(x => x.IsActive);
            return Json(categoriesActive);
        }

        [HttpPost]
        [NapAuth(FunctionKey = FunctionKey.IssueStatistics, Policy = Constant.Policy.Read)]
        public async Task<IActionResult> GetIssuesStatistics([FromBody] GetIssuesStatisticReportCriteria criteria)
        {
            var statistics = await issuesStatisticsService.GetIssuesStatisticsReportAsync(criteria);
            return Json(statistics);
        }
    }
}
