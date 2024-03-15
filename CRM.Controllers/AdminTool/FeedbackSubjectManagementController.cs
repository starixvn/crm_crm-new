namespace CRM.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Models.FeedbackSubject;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.FeedbackSubject, Policy = Policy.Read)]
    public class FeedbackSubjectManagementController : BaseController
    {
        private readonly IFeedbackSubjectService feedbackSubjectService;

        public FeedbackSubjectManagementController(
            IFeedbackSubjectService feedbackSubjectService)
        {
            this.feedbackSubjectService = feedbackSubjectService;
        }

        [HttpPost]
        public async Task<IActionResult> GetFeedbackSubject([FromBody] GetFeedbackSubjectParam param)
        {
            IEnumerable<FeedbackSubjectTemplate> feedbacks = await feedbackSubjectService.GetFeedbackSubjectTemplateAsync(param);
            return Json(new { totalItems = param.TotalRows, data = feedbacks });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActiveFeedbackSubject()
        {
            IEnumerable<FeedbackSubjectTemplate> allActiveFeedbackSubject = await feedbackSubjectService.GetAllActiveFeedbackSubjectTemplateAsync();
            return Json(allActiveFeedbackSubject);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFeedbackSubject([FromBody]CreateFeedbackSubjectTemplate model)
        {
            CommandResult commandResult = await feedbackSubjectService.CreateFeedbackSubjectTemplateAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.FeedbackSubject, Policy = Policy.Host)]
        public async Task<IActionResult> EditFeedbackSubject([FromBody]EditFeedbackSubjectTemplate model)
        {
            CommandResult commandResult = await feedbackSubjectService.EditFeedbackSubjectTemplateAsync(model);
            return Json(commandResult);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.FeedbackSubject, Policy = Policy.Host)]
        public async Task<IActionResult> EditStatusFeedbackSubject([FromBody]EditStatusFeedbackSubjectTemplate model)
        {
            CommandResult commandResult = await feedbackSubjectService.EditStatusFeedbackSubjectTemplateAsync(model);
            return Json(commandResult);
        }
    }
}