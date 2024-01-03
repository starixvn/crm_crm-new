namespace CRM.Controllers
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Services;
    using CRM.Criteria.Common;
    using CRM.Criteria.NotificationType;
    using CRM.Models.FeedbackSubject;
    using CRM.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    public class CommonController : BaseController
    {
        private readonly INotificationTypeService notificationTypeService;
        private readonly ICommonService commonService;
        private readonly IFeedbackSubjectService feedbackSubjectService;
        private readonly IPermissionService permissionService;
        private readonly ISessionService sessionService;

        public CommonController(
            INotificationTypeService notificationTypeService,
            ICommonService commonService,
            IFeedbackSubjectService feedbackSubjectService,
            IPermissionService permissionService,
            ISessionService sessionService)
        {
            this.notificationTypeService = notificationTypeService;
            this.commonService = commonService;
            this.feedbackSubjectService = feedbackSubjectService;
            this.permissionService = permissionService;
            this.sessionService = sessionService;
        }

        [HttpPost]
        public async Task<IActionResult> GetPermission([FromBody] GetPermissionCriteria criteria)
        {
            var permission = await permissionService.GetPolicyPermissionAsync(criteria.functionKey);
            return Json(permission);
        }

        public async Task<IActionResult> GetHostPermissionOnCurrentCustomer()
        {
            bool hasHostOnCurrentCustomer = false;
            var currentCustomer = sessionService.CurrentCustomer;
            var hasHostCreditPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit, Policy.Host);
            var hasHostLicenseePermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee, Policy.Host);

            if (currentCustomer is not null)
            {
                if (currentCustomer.CustType is null || currentCustomer.CustType == SiteType.NA)
                {
                    hasHostOnCurrentCustomer = hasHostCreditPermission || hasHostLicenseePermission;
                }

                if (currentCustomer.CustType == SiteType.Licensee)
                {
                    hasHostOnCurrentCustomer = hasHostLicenseePermission;
                }

                if (currentCustomer.CustType == SiteType.Credit)
                {
                    hasHostOnCurrentCustomer = currentCustomer.IsGuest ? hasHostCreditPermission : await permissionService.IsHavingPermissionByPolicyAsync(currentCustomer.SiteLabel, Policy.Host);
                }
            }
            return Json(hasHostOnCurrentCustomer);
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