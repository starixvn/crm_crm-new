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
    using static Fanex.NAP.Client.Helpers.Business.Constant;

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
            var permission = await permissionService.GetPolicyPermissionAsync(criteria.FunctionKey);
            return Json(permission);
        }

        public async Task<IActionResult> GetHostPermissionOnCurrentCustomer()
        {
            bool hasHostOnCurrentCustomer = false;
            var currentCustomer = sessionService.CurrentCustomer;
            var hostOnCustomerInfoTask = permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CustomerInfo, Policy.Host);
            var hasReadOnCreditTask = permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit);
            var hasReadOnLicenseeTask = permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee);

            await Task.WhenAll(hostOnCustomerInfoTask, hasReadOnCreditTask, hasReadOnLicenseeTask);

            var hostOnCustomerInfo = await hostOnCustomerInfoTask;
            var hasReadOnCredit = await hasReadOnCreditTask;
            var hasReadOnLicensee = await hasReadOnLicenseeTask;

            if (currentCustomer is not null && hostOnCustomerInfo)
            {
                if (currentCustomer.CustType is null || currentCustomer.CustType == SiteType.NA)
                {
                    hasHostOnCurrentCustomer = hasReadOnCredit || hasReadOnLicensee;
                }

                if (currentCustomer.CustType == SiteType.Licensee)
                {
                    hasHostOnCurrentCustomer = hasReadOnLicensee;
                }

                if (currentCustomer.CustType == SiteType.Credit)
                {
                    hasHostOnCurrentCustomer = currentCustomer.IsGuest ? hasReadOnCredit : await permissionService.IsHavingPermissionByPolicyAsync(currentCustomer.SiteLabel);
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