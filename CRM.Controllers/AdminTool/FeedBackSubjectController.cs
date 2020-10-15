namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Models.FeedbackSubject;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.FeedbackSubject, Policy = Policy.Read)]
    public class FeedbackSubjectController : BaseController
    {
        private readonly IFeedbackSubjectService feedbackSubjectService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;

        public FeedbackSubjectController(
            IFeedbackSubjectService feedbackSubjectService,
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService)
        {
            this.feedbackSubjectService = feedbackSubjectService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
        }

        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.FeedbackSubject, Policy.Host);
            return View(isHost);
        }

        [HttpPost]
        public async Task<IActionResult> GetFeedbackSubject([FromBody] GetFeedbackSubjectParam param)
        {
            IEnumerable<FeedbackSubjectTemplate> feedbacks = await feedbackSubjectService.GetFeedbackSubjectTemplateAsync(param);
            return Json(new { totalItems = param.TotalRows, data = feedbacks });
        }

        [HttpPost]
        public async Task<IActionResult> CreateFeedbackSubject([FromBody]CreateFeedbackSubjectTemplate model)
        {
            CommandResult commandResult = await feedbackSubjectService.CreateFeedbackSubjectTemplateAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> EditFeedbackSubject([FromBody]EditFeedbackSubjectTemplate model)
        {
            CommandResult commandResult = await feedbackSubjectService.EditFeedbackSubjectTemplateAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        public async Task<IActionResult> EditStatusFeedbackSubject([FromBody]EditStatusFeedbackSubjectTemplate model)
        {
            CommandResult commandResult = await feedbackSubjectService.EditStatusFeedbackSubjectTemplateAsync(model);
            return Json(commandResult);
        }
    }
}