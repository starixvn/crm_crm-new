namespace CRM.Controllers.Report.Statistics;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.LogStatistics;
using CRM.Services;
using CRM.Services.Report;
using Enum;
using Fanex.NAP.Client.Helpers.Business;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.ExportExcel;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

public class LogStatisticsController(
    ILogStatisticsService logStatisticsService,
    ISettingService settingService,
    IExportExcelService excelService,
    IPermissionService permissionService)
    : BaseController
{
    public async Task<IActionResult> GetAllSettings()
    {
        var products = await settingService.GetProductAsync();
        var mainCategories = await settingService.GetMainCategoryAsync();
        var communicationTools = await settingService.GetCommunicationToolAsync(2, true);
        return Json(new
        {
            products,
            mainCategories,
            communicationTools
        });
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.LogStatistics, Policy = Policy.Read)]
    public async Task<IActionResult> GetMainReport([FromBody] LogStatisticsCriteria criteria)
    {
        var licenseeType = (SitePermission)await permissionService.GetCurrentUserLicenseeTypeAsync();

        var ibcReport = licenseeType == SitePermission.Both || licenseeType == SitePermission.Credit ? await logStatisticsService.GetReportDataAsync(new LogStatisticsCriteria
        {
            ProductId = criteria.ProductId,
            MainCategoryId = criteria.MainCategoryId,
            CommunicationId = criteria.CommunicationId,
            FromDate = criteria.FromDate,
            ToDate = criteria.ToDate,
            ProductType = LogStatisticConstants.ProductTypeDetails,
            CategoryType = LogStatisticConstants.SubCategory,
            SiteType = LogStatisticConstants.IBC,
            LicenseeType = (short)licenseeType,
            SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync()
        }) : null;

        var licenseeReport = licenseeType == SitePermission.Both || licenseeType == SitePermission.Licensee ? await logStatisticsService.GetReportDataAsync(new LogStatisticsCriteria
        {
            ProductId = criteria.ProductId,
            MainCategoryId = criteria.MainCategoryId,
            CommunicationId = criteria.CommunicationId,
            FromDate = criteria.FromDate,
            ToDate = criteria.ToDate,
            ProductType = LogStatisticConstants.ProductTypeDetails,
            CategoryType = LogStatisticConstants.SubCategory,
            SiteType = LogStatisticConstants.Licensee,
            LicenseeType = (short)licenseeType,
            SitePermission = string.Empty
        }) : null;

        return Json(new { ibcReport, licenseeReport, licenseeType });
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.LogStatistics, Policy = Constant.Policy.Read)]
    public async Task<IActionResult> GetReportDetails([FromBody] LogStatisticsDetailCriteria criteria)
    {
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var reportDetailsTask = logStatisticsService.GetReportDetailsAsync(criteria);
        var mainCategoriesTask = settingService.GetAllMainSubCategoriesAsync();
        var communicationToolsTask = settingService.GetCommunicationToolAsync();
        var productsTask = settingService.GetProductAsync();
        var subProductsTask = settingService.GetSubProductAsync();
        var extensionTasks = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);

        await Task.WhenAll(reportDetailsTask, mainCategoriesTask, communicationToolsTask, productsTask, subProductsTask, extensionTasks);

        var report = reportDetailsTask.Result.ChildReports;
        var reportCommunicationTools = reportDetailsTask.Result.CommunicationTools;
        var mainCategories = mainCategoriesTask.Result;
        var communicationTools = communicationToolsTask.Result;
        var products = productsTask.Result;
        var subProducts = subProductsTask.Result;
        var extensions = extensionTasks.Result;

        return Json(new
        {
            report,
            reportCommunicationTools,
            mainCategories,
            communicationTools,
            products,
            subProducts,
            extensions,
            totalRows = criteria.TotalRows
        });
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcel([FromBody] LogStatisticsCriteria criteria)
    {
        var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        var param = new LogStatisticsCriteria
        {
            ProductId = criteria.ProductId,
            MainCategoryId = criteria.MainCategoryId,
            CommunicationId = criteria.CommunicationId,
            FromDate = criteria.FromDate,
            ToDate = criteria.ToDate,
            ProductType = LogStatisticConstants.ProductTypeDetails,
            CategoryType = LogStatisticConstants.SubCategory,
            SiteType = criteria.SiteType,
            LicenseeType = licenseeType,
            SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync()
        };

        var logStatistics = await logStatisticsService.GetReportDataAsync(param);
        var bytes = excelService.ExportLogStatisticsReport(logStatistics);
        return File(bytes, MimeType.XLSX, $"{logStatistics?.ExcelFileName}.xlsx");
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcelDetails([FromBody] LogStatisticsDetailCriteria criteria)
    {
        criteria.PageIndex = 0;
        criteria.PageSize = 0;
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var perReadHheadlineInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Headlineinfo);

        var logStatisticsDetailTask = logStatisticsService.GetReportDetailsAsync(criteria);
        var mainCategoriesTask = settingService.GetAllMainSubCategoriesAsync();
        var communicationToolsTask = settingService.GetCommunicationToolAsync();
        var productsTask = settingService.GetProductAsync();
        var subProductsTask = settingService.GetSubProductAsync();
        var extensionTasks = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);

        await Task.WhenAll(logStatisticsDetailTask, mainCategoriesTask, communicationToolsTask, productsTask, subProductsTask, extensionTasks);

        var logStatisticsDetail = logStatisticsDetailTask.Result;
        var mainCategories = mainCategoriesTask.Result;
        var communicationTools = communicationToolsTask.Result;
        var products = productsTask.Result;
        var subProducts = subProductsTask.Result;
        var extensions = extensionTasks.Result;

        var bytes = excelService.ExportLogStatisticsReportDetail(logStatisticsDetail, mainCategories, communicationTools
            , products, subProducts, extensions, perReadHheadlineInfo);
        return File(bytes, MimeType.XLSX, $"{logStatisticsDetail?.ExcelFileName}.xlsx");
    }
}