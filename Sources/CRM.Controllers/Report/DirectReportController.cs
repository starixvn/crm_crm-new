namespace CRM.Controllers.Report;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.DirectCustomerReport;
using CRM.Models.Report.DirectCustomerReport;
using CRM.Resources;
using CRM.Services;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.ExportExcel;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.DirectCustomerReport, Policy = Policy.Read)]
public class DirectReportController(
    IExportExcelService exportExcelService,
    IBaseService baseService)
    : BaseController
{
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
        var reportName = string.Format(ViewResources.FileNameDirectReport);
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