namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.DeletedFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.DeleteFeedback, Policy = Policy.Read)]
    public class DeletedFeedbackController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IFeedbackService feedbackService;

        public DeletedFeedbackController(
            ISettingService settingService,
            IExportExcelService excelService,
            IFeedbackService feedbackService)
        {
            this.settingService = settingService;
            this.excelService = excelService;
            this.feedbackService = feedbackService;
        }

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

            IList<DeletedFeedback> feedbacks = (await feedbacksTask).ToList();
            IEnumerable<Setting> mainCategories = await mainCategoriesTask;

            int totalItems = feedbacks.Count;
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

            IEnumerable<DeletedFeedback> feedbacks = feedbacksTask.Result;
            IEnumerable<Setting> mainCategories = mainCategoriesTask.Result;

            var bytes = excelService.ExportDeletedFeedbackReport(feedbacks, mainCategories);
            string reportName = ViewResources.DeletedFeedbackReport_Title;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}