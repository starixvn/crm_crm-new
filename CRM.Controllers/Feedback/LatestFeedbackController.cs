namespace CRM.Controllers.Feedback
{
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;
    using CRM.Core.Models.Feedback;
    using CRM.Criteria.Feedback;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.LatestFeedback;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

    public class LatestFeedbackController : BaseController
    {
        private readonly IFeedbackService feedbackService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;


        public LatestFeedbackController(
            IFeedbackService feedbackService,
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IExportExcelService excelService,
        ISettingService settingService)
        {
            this.feedbackService = feedbackService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.settingService = settingService;
            this.excelService = excelService;
        }
        public IActionResult Index()
        {
            //var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.LatestFeedback, Policy.Host);
            return View(true);
        }

        [HttpPost]
        public async Task<IActionResult> GetLatestFeedback([FromBody] GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await GetFeedbacks(param);

            return Json(new { data = feedbacks });
        }

        private async Task<IEnumerable<DeletedFeedback>> GetFeedbacks(GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);

            var statusList = await settingService.GetAllStatusAsync(new GetAllStatusCriteria { });
            var statusHash = statusList.ToDictionary(k => k.SettingId, v => v.SettingName);
            statusHash.Add(1, ViewResources.Symbol_NotApply);

            foreach (var feedback in feedbacks)
            {
                feedback.Status = statusHash.ContainsKey(feedback.StatusId) ? statusHash[feedback.StatusId] : string.Empty;
            }

            return feedbacks;
        }

        [HttpPost]
        public async Task<IActionResult> ExportLatestFeedbackReport([FromBody] GetLatestFeedbackParam param)
        {
            var reports = await GetFeedbacks(param);
            var bytes = excelService.ExportLatestFeedbackReport(reports);
            string reportName = string.Format(ViewResources.FeedbackReport_Title, param.Top);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        public IActionResult GetTops()
        {
            var tops = new List<BaseModel>
                {
                    new BaseModel { Id = 10, Name = "10" },
                    new BaseModel { Id = 20, Name = "20" },
                    new BaseModel { Id = 30, Name = "30" },
                    new BaseModel { Id = 40, Name = "40" },
                    new BaseModel { Id = 50, Name = "50" }
                };

            return Json(tops);
        }

        [HttpPost]
        public async Task<IActionResult> EditQuickUpdateFeedback([FromBody] EditQuickUpdateFeedback model)
        {
            CommandResult commandResult = await feedbackService.UpdateQuickUpdateFeedback(model);
            return Json(commandResult);
        }
    }
}
