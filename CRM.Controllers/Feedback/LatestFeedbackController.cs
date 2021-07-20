namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class LatestFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IFeedbackService feedbackService;

        public LatestFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IExportExcelService excelService,
            ISettingService settingService,
            IFeedbackService feedbackService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.excelService = excelService;
            this.feedbackService = feedbackService;
        }

        public IActionResult Index()
        {
            ViewBag.HasReviewFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host);
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(isHost);
        }

        [HttpPost]
        public async Task<IActionResult> GetLatestFeedback([FromBody] GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await GetAllMainCategoriesFromAllSettings();

            return Json(new { data = feedbacks, mainCategories });
        }

        private async Task<IEnumerable<Setting>> GetAllMainCategoriesFromAllSettings()
        {
            var mainCategories = await settingService.GetSettingAsync(SettingName.MainCategory, true);
            var subCategories = await settingService.GetSubCategoryAsync();

            foreach (var category in mainCategories)
            {
                category.ChildSettings = subCategories.Where(x => x.MainCategoryID == category.SettingId).OrderBy(s => s.DisplayOrder).ToList();
            }

            return mainCategories;
        }

        [HttpPost]
        public async Task<IActionResult> ExportLatestFeedbackReport([FromBody] GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await GetAllMainCategoriesFromAllSettings();

            var bytes = excelService.ExportLatestFeedbackReport(feedbacks, mainCategories, param.Top);
            string reportName = string.Format(ViewResources.FeedbackReport_Title, param.Top);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}