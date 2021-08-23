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
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
    public class ManageFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IFeedbackService feedbackService;
        private readonly IExportExcelService exportExcelService;

        public ManageFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            IFeedbackService feedbackService,
            IExportExcelService exportExcelService
            )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.feedbackService = feedbackService;
            this.exportExcelService = exportExcelService;
        }

        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(isHost);
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
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetManageFeedbackAsync(criteria);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);
            return Json(new { data = feedbacksOrder, mainCategories, totalItems = criteria.TotalRows });
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] ManageFeedbackCriteria criteria)
        {
            criteria.PageIndex = 0;
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetManageFeedbackAsync(criteria);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);

            var bytes = exportExcelService.ExportManageFeedbackReport(feedbacks, mainCategories);
            string reportName = ViewResources.Feedback;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}