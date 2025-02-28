using System.Threading.Tasks;
using CRM.Criteria.Report;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Report.Statistics;

using Constants;
using Extensions;
using Services.ExportExcel;
using Services.Interfaces;

public class IssueStatisticsController(
    IIssueStatisticsService issueStatisticsService,
    ISettingService settingService,
    IExportExcelService excelService,
    IPermissionService permissionService)
    : BaseController
{
    public async Task<ActionResult> GetAllSettings()
    {
        var mainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active);
        var subCategories = await settingService.GetSubCategoryAsync(null, SettingConstants.Active);

        return Json(new { mainCategories, subCategories });
    }

    [HttpPost]
    public async Task<IActionResult> GetIssuesStatistics([FromBody] GetIssuesStatisticReportCriteria criteria)
    {
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var data = await issueStatisticsService.GetIssuesStatisticsReportAsync(criteria);
        return Json(data);
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcel([FromBody] GetIssuesStatisticReportCriteria criteria)
    {
        criteria.PageIndex = 0;
        criteria.PageSize = 0;
        criteria.IsGetFullReport = true;
        var typeName = criteria.ReportType == 1 ? ViewResources.Daily : ViewResources.Monthly;
        var titleExcel = string.Format(ViewResources.IssueStatistics_ExcelTitle, typeName,
            criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
        var fileName = string.Format(ViewResources.IssueStatistics_ExcelFile, typeName,
            criteria.FromDate.ToShortDateFormatDash(), criteria.ToDate.ToShortDateFormatDash());
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var data = await issueStatisticsService.GetIssuesStatisticsReportAsync(criteria);
        var bytes = excelService.ExportIssueStatisticsReport(data, titleExcel);
        return File(bytes, MimeType.XLSX, $"{fileName}.xlsx");
    }
}