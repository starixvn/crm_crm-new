namespace CRM.Controllers.Feedback
{
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Models.Feedback;
    using CRM.Models.DeletedFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using CRM.Core.Filters;
    using static Fanex.NAP.Core.Business.Constant;

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

        //[Route("Feedbacks/DeletedFeedback")]
        //public IActionResult Index()
        //{
        //    return View();
        //}

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
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetDeletedFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            
            int totalItems = feedbacks.Count();
            if (totalItems > 0)
            {
                feedbacks = feedbacks.Skip(param.PageSize * (param.PageIndex - 1)).Take(param.PageSize).ToList();
            }
            return Json(new { data = feedbacks, mainCategories, totalItems });
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetDeletedFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetDeletedFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            
            var bytes = excelService.ExportDeletedFeedbackReport(feedbacks, mainCategories);
            string reportName = ViewResources.DeletedFeedbackReport_Title;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
