namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Feedback;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class LatestFeedbackController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IFeedbackService feedbackService;

        public LatestFeedbackController(
            IExportExcelService excelService,
            ISettingService settingService,
            IFeedbackService feedbackService)
        {
            this.settingService = settingService;
            this.excelService = excelService;
            this.feedbackService = feedbackService;
        }

        [HttpPost]
        public async Task<IActionResult> GetLatestFeedback([FromBody] GetLatestFeedbackCriteria criteria)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(criteria);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

            return Json(new { data = feedbacks, mainCategories });
        }

        [HttpPost]
        public async Task<IActionResult> GetLatestFeedbackByCustId([FromBody] GetLatestFeedbackByCustIdCriteria criteria)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(criteria);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

            return Json(new { data = feedbacks, mainCategories });
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetLatestFeedbackCriteria criteria)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(criteria);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

            var bytes = excelService.ExportLatestFeedbackReport(feedbacks, mainCategories, criteria.Top);
            string reportName = string.Format(ViewResources.FeedbackReport_Title, criteria.Top);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}