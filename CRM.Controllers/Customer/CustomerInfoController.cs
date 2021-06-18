namespace CRM.Controllers
{
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;


    [CrmPermission(FunctionKey = FunctionKey.CustomerInfo, Policy = Policy.Read)]
    public class CustomerInfoController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;

        public CustomerInfoController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
        }
        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CustomerInfo, Policy.Host);
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
