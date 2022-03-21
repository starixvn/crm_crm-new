using System.Threading.Tasks;
using CRM.Core;
using CRM.Core.Constants;
using CRM.Criteria.Report.IssuesStatistics;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report;
using Fanex.NAP.Client.AspNetCore.Attributes;
using Fanex.NAP.Core.Business;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Report.Statistics
{

    public class IssueStatisticsController : BaseController
    {
        private readonly IIssueStatisticsService issueStatisticsService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;

        public IssueStatisticsController(
            IIssueStatisticsService issueStatisticsService,
            ISettingService settingService,
            IExportExcelService excelService
        )
        {
            this.issueStatisticsService = issueStatisticsService;
            this.settingService = settingService;
            this.excelService = excelService;
        }

        [NapAuth(FunctionKey = FunctionKey.IssueStatistics, Policy = Constant.Policy.Read)]
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

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetIssuesStatisticReportCriteria criteria)
        {
            var typeName = criteria.ReportType == 1 ? ViewResources.Daily : ViewResources.Monthly;
            var data = await issueStatisticsService.GetIssuesStatisticsReportAsync(criteria);
            var fileName = string.Format(ViewResources.IssueStatistics_ExcelFile, typeName,
                                            criteria.FromDate.ToShortDateFormatDash(), criteria.ToDate.ToShortDateFormatDash());
            var titleExcel = string.Format(ViewResources.IssueStatistics_ExcelTitle, typeName,
                                            criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
            var bytes = excelService.ExportIssueStatisticsReport(data, titleExcel);
            return File(bytes, MimeType.XLSX, $"{fileName}.xlsx");
        }
    }
}
