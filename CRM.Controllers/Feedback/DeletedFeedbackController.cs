namespace CRM.Controllers.Feedback
{
    using System.Linq;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.Feedback;
    using CRM.Models.DeletedFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions;

    //[CrmPermission(FunctionKey = FunctionKey.DeleteFeedback, Policy = Policy.Read)]
    public class DeletedFeedbackController : Controller
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

        public IActionResult Index()
        {
            return View(true);
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var status = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var reviews = Enum.GetValues(typeof(ReviewStatus)).Cast<ReviewStatus>()
                .Select(type => new Setting { SettingId = (int)type, SettingValue = EnumHelper.GetDesciption(type) });
            var settings = new
            {
                reviews = reviews,
                customerTypes = settingService.GetAllCustomerTypes(),
                customerResponses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
                mainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                subCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
                communications = await settingService.GetCommunicationToolAsync(SettingConstants.Active,true),
                statuses = status.Where(x => !string.Equals(x.Name, ViewResources.Deleted, StringComparison.OrdinalIgnoreCase))
            };

            return Json(settings);
        }

        [HttpPost]
        public async Task<IActionResult> SearchDeletedFeedback([FromBody] GetDeletedFeedbackParam param)
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
        public async Task<IActionResult> ExportDeletedFeedbackReport([FromBody] GetDeletedFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetDeletedFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            
            var bytes = excelService.ExportDeletedFeedbackReport(feedbacks, mainCategories);
            string reportName = ViewResources.DeletedFeedbackReport_Title;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
