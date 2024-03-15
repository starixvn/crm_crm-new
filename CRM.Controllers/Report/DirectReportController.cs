namespace CRM.Controllers.Report
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Report.DirectCustomerReport;
    using CRM.Models.Report.DirectCustomerReport;
    using CRM.Resources;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.DirectCustomerReport, Policy = Policy.Read)]
    public class DirectReportController : BaseController
    {
        private readonly IExportExcelService exportExcelService;
        private readonly IBaseService baseService;

        public DirectReportController(
            IExportExcelService exportExcelService,
            IBaseService baseService)
        {
            this.exportExcelService = exportExcelService;
            this.baseService = baseService;
        }


        [HttpPost]
        public async Task<IActionResult> GetDirectReport([FromBody] DirectCustomerReportCriteria criteria)
        {
            var report = await GetReport(criteria);
            return Json(report);
        }

        [HttpPost]
        public async Task<IActionResult> ExportDirectReport([FromBody] DirectCustomerReportCriteria criteria)
        {
            var reports = await GetReport(criteria);
            var bytes = exportExcelService.ExportDirectCustomerReport(reports);
            string reportName = string.Format(ViewResources.FileNameDirectReport);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        private async Task<DirectCustomerReportInfo> GetReport(DirectCustomerReportCriteria criteria)
        {
            var rawData = await baseService.GetDataAsync<DirectCustomerInfo>(criteria);
            return new DirectCustomerReportInfo
            {
                CustomerList = rawData,
                TotalCustomer = criteria.TotalRows
            };
        }
    }
}