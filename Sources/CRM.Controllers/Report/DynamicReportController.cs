namespace CRM.Controllers.Report;

using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.DynamicReport;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report;
using CRM.ViewModels.Feedback;
using Enumerables;
using Extensions;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.ExportExcel;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.DynamicReport, Policy = Policy.Read)]
public class DynamicReportController(
    ISettingService settingService,
    IDynamicReportService dynamicReportService,
    IExportExcelService excelService,
    IPermissionService permissionService)
    : BaseController
{
    public async Task<IActionResult> GetDynamicReports([FromBody] GetDynamicReportCriteria criteria)
    {
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var logs = await dynamicReportService.GetDynamicReportAsync(criteria);
        var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
        return Json(new { data = logs, mainCategories });
    }

    public async Task<IActionResult> GetAllSettings()
    {
        var products = await settingService.GetProductAsync(SettingConstants.Active);
        var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
        var roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role);
        var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
        var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
        var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        var allSettings = new CreateFeedbackViewModel
        {
            CommunicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active, true),
            Extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
            MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
            SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
            Products = products.Where(x => x.Id != NAConstants.ProductNA),
            SubProducts = subproducts.Where(x => x.Id != NAConstants.SubProductNA),
            Responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
            Roles = roles.Where(x => x.IsActive),
            Sites = await settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType),
            Statuses = statuses.Where(s => s.StatusId != (int)FeedbackStatus.Deleted),
            PeriodTypes = settingService.GetAllPeriodTypes()
        };
        return Json(allSettings);
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcel([FromBody] GetDynamicReportCriteria criteria)
    {
        var reportName = string.Format(
            ViewResources.DynamicReport_ExcelTitle,
            SettingService.GetPeriodTypeName(criteria.ReportType),
            criteria.FromDate.ToString("MM_dd_yyyy"),
            criteria.ToDate.ToString("MM_dd_yyyy")
        );
        var title = string.Format(
            ViewResources.DynamicReport_Title,
            SettingService.GetPeriodTypeName(criteria.ReportType),
            criteria.FromDate.ToShortDateFormat(),
            criteria.ToDate.ToShortDateFormat()
        );
        criteria.IsGetFullReport = true;
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var logs = await dynamicReportService.GetDynamicReportAsync(criteria);
        var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
        var bytes = excelService.ExportDynamicReport(logs, mainCategories, title);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }
}