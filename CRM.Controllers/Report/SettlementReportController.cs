namespace CRM.Controllers.Report
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Report.SettlementReport;
    using CRM.Resources;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using static Fanex.NAP.Core.Business.Constant;

    [Route("Report/Settlement")]
    [CrmPermission(FunctionKey = FunctionKey.SettlementIssuesReport, Policy = Policy.Read)]
    public class SettlementReportController : BaseController
    {
        private readonly ISettlementReportService settlementReportService;
        private readonly ISettlementReportExcel settlementReportExcel;
        private readonly AppSettings appSettings;

        public SettlementReportController(
            ISettlementReportService settlementReportService,
            ISettlementReportExcel settlementReportExcel,
            IOptionsSnapshot<AppSettings> appSettings)
        {
            this.settlementReportService = settlementReportService;
            this.settlementReportExcel = settlementReportExcel;
            this.appSettings = appSettings.Value;
        }

        [Route("Index")]
        [Route("")]
        public IActionResult Index()
        {
            return View("../Report/Settlement/Index");
        }

        [HttpPost]
        [Route("GetSettlementReport")]
        public async Task<IActionResult> GetSettlementReport([FromBody] GetSettlementReportCriteria criteria)
        {
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            var logs = await settlementReportService.GetSettlementReportAsync(criteria);
            return Json(logs);
        }

        [HttpPost]
        [Route("ExportSettlementReport")]
        public async Task<IActionResult> ExportSettlementReport([FromBody] GetSettlementReportCriteria criteria)
        {
            criteria.TimeSpan = appSettings.TimeSpan * -1;
            criteria.IsGetFullReport = true;
            var reports = await settlementReportService.GetSettlementReportAsync(criteria);
            var bytes = settlementReportExcel.Export(reports);
            string reportName = string.Format(Labels.SettlementReport_ExcelTitle, criteria.Year);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}