namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Common;
    using CRM.Criteria.NotificationType;
    using CRM.Models;
    using CRM.Models.FeedbackSubject;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    public class CommonController : BaseController
    {
        private readonly INotificationTypeService notificationTypeService;
        private readonly ICommonService commonService;
        private readonly IFeedbackSubjectService feedbackSubjectService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;

        public CommonController(
            INotificationTypeService notificationTypeService,
            ICommonService commonService,
            IFeedbackSubjectService feedbackSubjectService,
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService
            )
        {
            this.notificationTypeService = notificationTypeService;
            this.commonService = commonService;
            this.feedbackSubjectService = feedbackSubjectService;
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> GetPermission([FromBody] GetPermissionCriteria criteria)
        {
            var permission = await userService.GetPermissionAsync(napSession.UserId, napSettings.SiteId, criteria.functionKey);
            return Json(permission);
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