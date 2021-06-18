namespace CRM.Controllers.Feedback
{
    using CRM.Core.Constants;
    using CRM.Criteria.Setting;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

    public class LatestFeedbackController : BaseController
    {
        private readonly IFeedbackService feedbackService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;

        public LatestFeedbackController(
            IFeedbackService feedbackService,
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService)
        {
            this.feedbackService = feedbackService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.settingService = settingService;
        }
        public IActionResult Index()
        {
            //var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.LatestFeedback, Policy.Host);
            return View(true);
        }

        [HttpPost]
        public async Task<IActionResult> GetLatestFeedback([FromBody] GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);
            var statusList = settingService.GetAllStatusAsync(new GetAllStatusCriteria { ViewType = ViewTypeConstants.All });
            //var statusHash = statusList.ToDictionary(k => k.Id, v => v.Name);
            //statusHash.Add(1, ViewResources.Symbol_NotApply);

            foreach (var feedback in feedbacks)
            {
               // feedback.Status = statusHash.ContainsKey(feedback.StatusId) ? statusHash[feedback.StatusId] : string.Empty;
            }

            return Json(new { data = feedbacks });
        }
    }
}
