namespace CRM.Controllers.Report;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.SettlementReport;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using Services.ExportExcel;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[Route("Report/Settlement")]
[Route("SettlementReport")]
[CrmPermission(FunctionKey = FunctionKey.SettlementIssuesReport, Policy = Policy.Read)]
public class SettlementReportController(
    ISettlementReportService settlementReportService,
    IExportExcelService excelService,
    IPermissionService permissionService,
    IOptionsSnapshot<AppSettings> appSettings)
    : BaseController
{
    private readonly AppSettings appSettings = appSettings.Value;

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
        var reportName = string.Format(ViewResources.SettlementReport_ExcelTitle, criteria.Year);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }
}