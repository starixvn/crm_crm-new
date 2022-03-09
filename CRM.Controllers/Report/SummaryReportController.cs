namespace CRM.Controllers.Report
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Report.CategoriesSummaryReport;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Report.CategoriesSummaryReport;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

    //[CrmPermission(FunctionKey = FunctionKey.CategoriesSummaryReport, Policy = Policy.Read)]
    public class SummaryReportController : Controller
    {
        private readonly ISummaryReportService summaryReportService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService exportExcelService;
        private readonly AppSettings appSettings;

        public SummaryReportController(
            ISummaryReportService summaryReportService, 
            ISettingService settingService,
            IExportExcelService exportExcelService,
            IOptionsSnapshot<AppSettings> appSettings)
        {
            this.summaryReportService = summaryReportService;
            this.settingService = settingService;
            this.exportExcelService = exportExcelService;
            this.appSettings = appSettings.Value;
        }

        public IActionResult Index()
        {
            return Ok("OK");
        }

        public async Task<IActionResult> getAllSettings()
        {
            var sites = await settingService.GetAllSitesWithGroupAsync();           
            var mainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active);
            return Json(new
            {
                sites,
                mainCategories                
            });
        }

        [HttpGet]
        public ActionResult GetSummaryReport(GetSummaryReportCriteria criteria)
        {
            criteria.Year = 2022;
            criteria.SiteType = 0;
            criteria.Categories = "3000";
            var report = summaryReportService.GetSummaryReportAsync(criteria);
            return Json(report);
        }

        [HttpPost]
        [Route("ExportSummaryReport")]
        public async Task<IActionResult> ExportSettlementReport([FromBody] GetSummaryReportCriteria criteria)
        {
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            criteria.IsGetFullReport = true;
            var reports = await summaryReportService.GetSummaryReportAsync(criteria);
            var bytes = exportExcelService.ExportSummaryReport(reports);
            string reportName = string.Format(ViewResources.SummaryReport_ExcelTitle, criteria.Year);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

    }
}
