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
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CategoriesSummaryReport, Policy = Policy.Read)]
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
            return View("../Report/Summary/Index");
        }

        public async Task<IActionResult> getAllSettings()
        {
            var allSetting = await summaryReportService.AllSettings();
            return Json(allSetting);
        }

        [HttpPost]
        public async Task<IActionResult> GetSummaryReport([FromBody] GetSummaryReportCriteria criteria)
        {
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            var report = await summaryReportService.GetSummaryReportAsync(criteria);
            return Json(report);
        }

        [HttpPost]
        public async Task<IActionResult> ExportSummaryReport([FromBody] GetSummaryReportCriteria criteria)
        {
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            var reports = await summaryReportService.GetSummaryReportAsync(criteria);
            var bytes = exportExcelService.ExportSummaryReport(reports, criteria.Year);
            string reportName = string.Format(ViewResources.SheetNameSummaryReport, criteria.Year);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

    }
}
