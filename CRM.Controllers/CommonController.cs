namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Criteria.Common;
    using CRM.Criteria.NotificationType;
    using CRM.Models.FeedbackSubject;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;

    public class CommonController : BaseController
    {
        private readonly INotificationTypeService notificationTypeService;
        private readonly ICommonService commonService;
        private readonly IFeedbackSubjectService feedbackSubjectService;

        public CommonController(
            INotificationTypeService notificationTypeService,
            ICommonService commonService,
            IFeedbackSubjectService feedbackSubjectService)
        {
            this.notificationTypeService = notificationTypeService;
            this.commonService = commonService;
            this.feedbackSubjectService = feedbackSubjectService;
        }

        public async Task<IActionResult> GetNotificationTypes()
        {
            var notificationTypes = await notificationTypeService.GetNotificationTypeAsync(new GetNotificationTypeCriteria());
            return Json(notificationTypes);
        }

        [HttpPost]
        public async Task<IActionResult> GetHeadlines([FromBody] GetHeadlinesCriteria criteria)
        {
            var headlines = await commonService.GetHeadlineAsync(criteria);
            return Json(headlines);
        }

        [HttpPost]
        public async Task<IActionResult> GetRecipients([FromBody] GetRecipientsCriteria criteria)
        {
            var recipients = await commonService.GetRecipientAsync(criteria);
            return Json(recipients);
        }

        public async Task<IActionResult> GetFeedbackSubjectTemplate(string subject)
        {
            var param = new GetFeedbackSubjectParam
            {
                Subject = subject,
                IsActive = true,
                PageIndex = 1,
                PageSize = 50
            };
            var feedbackSubjectTemplates = await feedbackSubjectService.GetFeedbackSubjectTemplateAsync(param);
            return Json(feedbackSubjectTemplates);
        }
    }
}