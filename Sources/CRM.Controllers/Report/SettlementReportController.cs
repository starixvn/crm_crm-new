namespace CRM.Controllers.Report
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Report.SettlementReport;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Report;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [Route("Report/Settlement")]
    [Route("SettlementReport")]
    [CrmPermission(FunctionKey = FunctionKey.SettlementIssuesReport, Policy = Policy.Read)]
    public class SettlementReportController : BaseController
    {
        private readonly ISettlementReportService settlementReportService;
        private readonly IExportExcelService excelService;
        private readonly IPermissionService permissionService;
        private readonly AppSettings appSettings;

        public SettlementReportController(
            ISettlementReportService settlementReportService,
            IExportExcelService excelService,
            IPermissionService permissionService,
            IOptionsSnapshot<AppSettings> appSettings)
        {
            this.settlementReportService = settlementReportService;
            this.permissionService = permissionService;
            this.excelService = excelService;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("GetSettlementReport")]
        public async Task<IActionResult> GetSettlementReport([FromBody] GetSettlementReportCriteria criteria)
        {
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var logs = await settlementReportService.GetSettlementReportAsync(criteria);
            return Json(logs);
        }

        [HttpPost]
        [Route("ExportSettlementReport")]
        public async Task<IActionResult> ExportSettlementReport([FromBody] GetSettlementReportCriteria criteria)
        {
            var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

            criteria.TimeSpan = appSettings.TimeSpan * -1;
            criteria.IsGetFullReport = true;
            criteria.LicenseeType = licenseeType;
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var reports = await settlementReportService.GetSettlementReportAsync(criteria);
            var bytes = excelService.ExportSettlementReport(reports);
            string reportName = string.Format(ViewResources.SettlementReport_ExcelTitle, criteria.Year);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}