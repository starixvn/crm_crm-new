namespace CRM.Controllers.Feedback;

using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Feedback;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Feedback;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models.Feedback.LatestFeedback;
using Services.ExportExcel;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Read)]
public class LatestFeedbackController(
    IExportExcelService excelService,
    ISettingService settingService,
    IFeedbackService feedbackService,
    IPermissionService permissionService)
    : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetLatestFeedback([FromBody] GetLatestFeedbackCriteria criteria)
    {
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var feedbacksTask = feedbackService.GetLatestFeedbackAsync(criteria);
        var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();

        await Task.WhenAll(feedbacksTask, mainCategoriesTask);

        var feedbacks = await feedbacksTask;
        var mainCategories = await mainCategoriesTask;

        return Json(new { data = feedbacks, mainCategories });
    }

    [HttpPost]
    public async Task<IActionResult> GetLatestFeedbackByCustId([FromBody] GetLatestFeedbackByCustIdCriteria criteria)
    {
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

        var feedbacksTask = feedbackService.GetLatestFeedbackAsync(criteria);
        var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();

        await Task.WhenAll(feedbacksTask, mainCategoriesTask);

        var feedbacks = await feedbacksTask;
        var mainCategories = await mainCategoriesTask;

        return Json(new { data = feedbacks, mainCategories });
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcel([FromBody] GetLatestFeedbackCriteria criteria)
    {
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var feedbacksTask = feedbackService.GetLatestFeedbackAsync(criteria);
        var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
        await Task.WhenAll(feedbacksTask, mainCategoriesTask);
        var feedbacks = feedbacksTask.Result;
        var mainCategories = await mainCategoriesTask;

        var bytes = excelService.ExportLatestFeedbackReport(feedbacks, mainCategories, criteria.Top, string.Empty);
        var reportName = string.Format(ViewResources.LatestFeedbackReport_File, criteria.Top);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }

    [HttpPost]
    public async Task<IActionResult> SearchByCustExportExcel([FromBody] GetLatestFeedbackParam param)
    {
        var criteria = new GetLatestFeedbackByCustIdCriteria
        {
            Top = param.Top,
            CustID = param.CustID,
            LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync(),
            SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync()
        };
        var feedbacksTask = feedbackService.GetLatestFeedbackAsync(criteria);
        var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
        await Task.WhenAll(feedbacksTask, mainCategoriesTask);
        var feedbacks = await feedbacksTask;
        var mainCategories = await mainCategoriesTask;

        var bytes = excelService.ExportLatestFeedbackReport(feedbacks, mainCategories, param.Top, param.UserName);
        var reportName = string.Format(ViewResources.LatestFeedback_Report_ByCustId_File, param.Top, param.UserName);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }
}