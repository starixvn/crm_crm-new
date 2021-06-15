namespace CRM.Controllers.Feedback
{
    using CRM.Core.Constants;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

    public class LatestFeedbackController : BaseController
    {
        private readonly IFeedbackService feedbackService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;

        public LatestFeedbackController(
            IFeedbackService feedbackService,
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService)
        {
            this.feedbackService = feedbackService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
        }
        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.Feedback, Policy.Host);
            return View(isHost);
        }

        //[HttpPost]
        //public async Task<IActionResult> GetLatestFeedback([FromBody] GetFeedbackParam param)
        //{
        //    IEnumerable<FeedbackSubjectTemplate> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);
        //    return Json(new { data = feedbacks });
        //}
    }
}
