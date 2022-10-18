namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class ManageFeedbackController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IFeedbackService feedbackService;
        private readonly IExportExcelService exportExcelService;

        public ManageFeedbackController(
            ISettingService settingService,
            IFeedbackService feedbackService,
            IExportExcelService exportExcelService
            )
        {
            this.settingService = settingService;
            this.feedbackService = feedbackService;
            this.exportExcelService = exportExcelService;
        }

        public async Task<ActionResult> GetAllSettings()
        {
            var customerTypes = settingService.GetAllCustomerTypes();
            var responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response);
            var mainCategories = await settingService.GetMainCategoryAsync();
            var subCategories = await settingService.GetSubCategoryAsync();
            var communications = await settingService.GetCommunicationToolAsync(isIncludeNA:true);
            var status = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var settings = new
            {
                CustomerTypes = customerTypes,
                Responses = responses,
                MainCategories = mainCategories,
                SubCategories = subCategories,
                Communications = communications,
                Statuses = status
            };
            return Json(settings);
        }

        [HttpPost]
        public async Task<ActionResult> SearchManageFeedback([FromBody] ManageFeedbackCriteria criteria)
        {
            var feedbacksTask = feedbackService.GetManageFeedbackAsync(criteria);
            var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
            await Task.WhenAll(feedbacksTask, mainCategoriesTask);

            IEnumerable<DeletedFeedback> feedbacks = feedbacksTask.Result;
            IEnumerable<Setting> mainCategories = mainCategoriesTask.Result;
            var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);
            return Json(new { data = feedbacksOrder, mainCategories, totalItems = criteria.TotalRows });
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] ManageFeedbackCriteria criteria)
        {
            criteria.PageIndex = 0;
            var feedbacksTask = feedbackService.GetManageFeedbackAsync(criteria);
            var mainCategoriesTask = settingService.GetMainCategoryWithSubCategoryAsync();
            await Task.WhenAll(feedbacksTask, mainCategoriesTask);
            IEnumerable<DeletedFeedback> feedbacks = feedbacksTask.Result;
            IEnumerable<Setting> mainCategories = mainCategoriesTask.Result;

            var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);

            string reportName = string.IsNullOrEmpty(criteria.Username) ? ViewResources.Feedback :
                                string.Format(ViewResources.FeedbackFromUsernameExcelFile, criteria.Username);
            string reportTitle = string.IsNullOrEmpty(criteria.Username) ? ViewResources.Feedback :
                                string.Format(ViewResources.FeedbackFromUsernameExcelName, criteria.Username);
            var bytes = exportExcelService.ExportManageFeedbackReport(feedbacksOrder, mainCategories, reportName, reportTitle);

            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}