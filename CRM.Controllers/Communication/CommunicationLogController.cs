namespace CRM.Controllers.Communication
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Communication;
    using CRM.Models.Customer;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Communication;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class CommunicationLogController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ICommunicationService communicationService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;

        public CommunicationLogController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ICommunicationService communicationService,
            ISettingService settingService,
            IBaseService baseService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.communicationService = communicationService;
            this.settingService = settingService;
            this.baseService = baseService;
        }

        public IActionResult Index()
        {
            var permission = new GetPermissionCustomer
            {
                CustomerInfoPolicy = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo),
                UpdateHeadlineInfoPolicy = userService.GetPermission(napSession.UserId, napSettings.SiteId, FunctionKey.Updateheadlineinfo)
            };

            return View(permission);
        }

        public async Task<IActionResult> GetLogsByCustomerId([FromBody] GetLogsByCustomerIdCriteria criteria)
        {
            var logs = await communicationService.GetLogsByCustomerIdAsync(criteria);
            var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            return Json(new { data = logs, mainCategories });
        }

        public async Task<IActionResult> GetAllStatus(bool isEdit)
        {
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            if (!isEdit || !userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.DeleteFeedback, Policy.Host))
            {
                statuses = statuses.Where(x => x.StatusId != (int)Core.Enumerables.FeedbackStatus.Deleted);
            }
            return Json(statuses);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditCommunicationLog([FromBody] EditCommunicationLogCommand command)
        {
            CommandResult commandResult = CheckEditCustomerFeedbackPermission(command);
            if (commandResult.IsSuccessful)
            {
                command.UserId = napSession.UserId;
                command.IP = ClientIP;
                if (command.IsReviewed)
                {
                    command.ReviewerId = napSession.UserId;
                }
                else
                {
                    command.Review = string.Empty;
                }

                commandResult = await baseService.ExecuteNonQueryAsync(command);
            }

            return Json(commandResult);
        }

        private CommandResult CheckEditCustomerFeedbackPermission(EditCommunicationLogCommand command)
        {
            var commandResult = new CommandResult { Code = 0 };
            if (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host)
                || (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host) &&
                    command.UpdateReviewedMode != EditReviewedModeConstants.NotChange))
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotEditCommunicationLogPermission
                };
            }

            var isChangedStatusFromDeleted = command.IsDeletedFeedbackView && command.StatusId != (int)Core.Enumerables.FeedbackStatus.Deleted;
            var isChangedStatusToDeleted = !command.IsDeletedFeedbackView && command.StatusId == (int)Core.Enumerables.FeedbackStatus.Deleted;
            if (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host)
                && (isChangedStatusFromDeleted || isChangedStatusToDeleted))
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotDeleteCommunicationLogPermission
                };
            }

            return commandResult;
        }
    } 
}
