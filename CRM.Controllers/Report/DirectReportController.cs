namespace CRM.Controllers.Report
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Report.DirectCustomerReport;
    using CRM.Models.Report.DirectCustomerReport;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Report;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

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

        public IActionResult Index()
        {
            return View("../Report/Direct/Index");
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

        public async Task<DirectCustomerReportInfo> GetReport(DirectCustomerReportCriteria criteria)
        {
            var rawData = await baseService.GetDataAsync<DirectCustomerInfo>(criteria);
            IList<DirectCustomerInfo> customerList = rawData.ToList();

            return new DirectCustomerReportInfo
            {
                CustomerList = customerList,
                TotalCustomer = criteria.TotalRows
            };
        }
    }
}
