namespace CRM.Controllers.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Models.Feedback;
    using CRM.Models.DeletedFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    //[CrmPermission(FunctionKey = FunctionKey.DeleteFeedback, Policy = Policy.Read)]
    public class DeletedFeedbackController : Controller
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IFeedbackService feedbackService;

        public DeletedFeedbackController(
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
           // var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DeleteFeedback, Policy.Host);
            return View(true);
        }

        [HttpPost]
        public async Task<IActionResult> SearchDeletedFeedback([FromBody] GetDeletedFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetDeletedFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

            return Json(new { data = feedbacks, mainCategories });
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
