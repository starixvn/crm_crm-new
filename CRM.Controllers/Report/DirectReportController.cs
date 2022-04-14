using CRM.Core.Constants;
using CRM.Criteria.Report.DirectCustomerReport;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Controllers.Report
{
    //[CrmPermission(FunctionKey = FunctionKey.CategoriesSummaryReport, Policy = Policy.Read)]
    public class DirectReportController : Controller
    {
        private readonly IDirectReportService _directCustomerReportService;
        private readonly IExportExcelService _exportExcelService;

        public DirectReportController(
            IDirectReportService ditectCustomerReportService,
            IExportExcelService exportExcelService)
        {
            _directCustomerReportService = ditectCustomerReportService;
            _exportExcelService = exportExcelService;

        }

        public IActionResult Index()
        {
            return View("../Report/Direct/Index");
        }

        [HttpPost]
        public async Task<IActionResult> GetDirectReport([FromBody] DirectCustomerReportCriteria criteria)
        {
            var report = await _directCustomerReportService.GetReport(criteria);
            return Json(report);
        }

        [HttpPost]
        public async Task<IActionResult> ExportDirectReport([FromBody] DirectCustomerReportCriteria criteria)
        {
            criteria.ExcludeIgnoredAcc = true;
            var reports = await _directCustomerReportService.GetReport(criteria);
            var bytes = _exportExcelService.ExportDirectCustomerReport(reports);
            string reportName = string.Format(ViewResources.FileNameDirectReport);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
