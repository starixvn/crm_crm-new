namespace CRM.Controllers.Report;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.CategoriesSummaryReport;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report.CategoriesSummaryReport;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models;
using Services.ExportExcel;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.CategoriesSummaryReport, Policy = Policy.Read)]
public class SummaryReportController(
    ISummaryReportService summaryReportService,
    IExportExcelService exportExcelService,
    IPermissionService permissionService,
    IOptionsSnapshot<AppSettings> appSettings)
    : BaseController
{
    private readonly AppSettings appSettings = appSettings.Value;

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
        var reportName = string.Format(ViewResources.SheetNameSummaryReport, criteria.Year);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }
}