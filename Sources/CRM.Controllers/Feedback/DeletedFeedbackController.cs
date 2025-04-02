namespace CRM.Controllers.Feedback;

using Constants;
using CRM.Models.Feedback;
using CRM.Resources;
using CRM.Services.Feedback;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models.Feedback.DeletedFeedback;
using Services.ExportExcel;
using Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.DeleteFeedback, Policy = Policy.Read)]
public class DeletedFeedbackController(
    ISettingService settingService,
    IExportExcelService excelService,
    IFeedbackService feedbackService)
    : BaseController
{
    public async Task<IActionResult> GetAllSettings()
    {
        var settings = new
        {
            customerResponses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
            mainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
            subCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
            communications = await settingService.GetCommunicationToolAsync(SettingConstants.Active, true)
        };

        return Json(settings);
    }

    [HttpPost]
    public async Task<IActionResult> GetDeletedFeedback([FromBody] GetDeletedFeedbackParam param)
    {
        var feedbacksTask = feedbackService.GetDeletedFeedbackAsync(param);
        var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();

        await Task.WhenAll(feedbacksTask, mainCategoriesTask);

        IList<FeedbackDeleted> feedbacks = (await feedbacksTask).ToList();
        var mainCategories = await mainCategoriesTask;

        var totalItems = feedbacks.Count;
        if (totalItems > 0)
        {
            feedbacks = feedbacks.Skip(param.PageSize * (param.PageIndex - 1)).Take(param.PageSize).ToList();
        }
        return Json(new { data = feedbacks, mainCategories, totalItems });
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcel([FromBody] GetDeletedFeedbackParam param)
    {
        var feedbacksTask = feedbackService.GetDeletedFeedbackAsync(param);
        var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
        await Task.WhenAll(feedbacksTask, mainCategoriesTask);

        var feedbacks = feedbacksTask.Result;
        var mainCategories = mainCategoriesTask.Result;

        var bytes = excelService.ExportDeletedFeedbackReport(feedbacks, mainCategories);
        var reportName = ViewResources.DeletedFeedbackReport_Title;
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }
}