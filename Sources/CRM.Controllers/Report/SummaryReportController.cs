namespace CRM.Controllers.Report
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Report.CategoriesSummaryReport;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Report.CategoriesSummaryReport;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CategoriesSummaryReport, Policy = Policy.Read)]
    public class SummaryReportController : BaseController
    {
        private readonly ISummaryReportService summaryReportService;
        private readonly IExportExcelService exportExcelService;
        private readonly IPermissionService permissionService;
        private readonly AppSettings appSettings;

        public SummaryReportController(
            ISummaryReportService summaryReportService,
            IExportExcelService exportExcelService,
            IPermissionService permissionService,
            IOptionsSnapshot<AppSettings> appSettings)
        {
            this.summaryReportService = summaryReportService;
            this.exportExcelService = exportExcelService;
            this.permissionService = permissionService;
            this.appSettings = appSettings.Value;
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var allSetting = await summaryReportService.AllSettings();
            return Json(allSetting);
        }

        [HttpPost]
        public async Task<IActionResult> GetSummaryReport([FromBody] GetSummaryReportCriteria criteria)
        {
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

            var report = await summaryReportService.GetSummaryReportAsync(criteria);
            return Json(report);
        }

        [HttpPost]
        public async Task<IActionResult> ExportSummaryReport([FromBody] GetSummaryReportCriteria criteria)
        {
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

            var reports = await summaryReportService.GetSummaryReportAsync(criteria);
            var bytes = exportExcelService.ExportSummaryReport(reports, criteria.Year);
            string reportName = string.Format(ViewResources.SheetNameSummaryReport, criteria.Year);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}