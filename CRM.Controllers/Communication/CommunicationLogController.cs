namespace CRM.Controllers.Communication
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Communication;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Communication;
    using CRM.ViewModels.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermissionAttribute(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Read)]
    public class CommunicationLogController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ICommunicationService communicationService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;

        public CommunicationLogController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ICommunicationService communicationService,
            ISettingService settingService,
            IBaseService baseService,
            ICommonService commonService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.communicationService = communicationService;
            this.settingService = settingService;
            this.baseService = baseService;
            this.commonService = commonService;
        }
       

        [HttpPost]
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
                statuses = statuses.Where(x => x.StatusId != (int)FeedbackStatus.Deleted);
            }
            return Json(statuses);
        }

        public async Task<IActionResult> GetLogByFeedbackId(int id)
        {
            var log = await communicationService.GetLogByFeedbackIdAsync(id);
            var settings = await GetAllSettings();
            var hasReviewFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host);

            return Json(new { log, settings, hasReviewFeedbackPermission });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> EditCommunicationLog([FromBody] EditCommunicationLogCommand command)
        {
            CommandResult commandResult = CheckEditCustomerFeedbackPermission(command);
            if (commandResult.IsSuccessful)
            {
                command.UserId = napSession.UserId;
                command.IP = ClientIP;
                command.StartTime = commonService.ConvertToServerDateTime(command.StartTime);
                command.EndTime = commonService.ConvertToServerDateTime(command.EndTime);
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
            if (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedback, Policy.Host)
                || (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host) &&
                    command.UpdateReviewedMode != EditReviewedModeConstants.NotChange))
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotEditCommunicationLogPermission
                };
            }

            var isChangedStatusFromDeleted = command.IsDeletedFeedbackView && command.StatusId != (int)FeedbackStatus.Deleted;
            var isChangedStatusToDeleted = !command.IsDeletedFeedbackView && command.StatusId == (int)FeedbackStatus.Deleted;
            if (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedback, Policy.Host)
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

        public async Task<CreateFeedbackViewModel> GetAllSettings()
        {
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var products = await settingService.GetProductAsync(SettingConstants.Active);
            var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role);
            var settings = new CreateFeedbackViewModel
            {
                Extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
                ExtensionNA = extentions.FirstOrDefault(x => x.Id == NAConstants.ExtentionNA),
                Statuses = statuses,
                CommunicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active),
                Languages = await settingService.GetLanguageAsync(SettingConstants.Active, true),
                Responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
                Roles = roles.Where(x => x.IsActive),
                Sites = await settingService.GetAllSitesWithGroupAsync(),
                Countries = await settingService.GetCountryAsync(SettingConstants.Active, true),
                MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
                LicenseeTypes = await settingService.GetLicenseeTypeAsync(),
                Bettypes = bettypes.Where(x => x.Id != NAConstants.BettypeNA),
                BettypeNA = bettypes.FirstOrDefault(x => x.Id == NAConstants.BettypeNA),
                Products = products.Where(x => x.Id != NAConstants.ProductNA),
                ProductNA = products.FirstOrDefault(x => x.Id == NAConstants.ProductNA),
                SubProducts = subproducts.Where(x => x.Id != NAConstants.SubProductNA),
                SubProductNA = subproducts.FirstOrDefault(x => x.Id == NAConstants.SubProductNA),
            };
            return settings;
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> CreateCommunicationLog([FromBody] CreateCommunicationLogCommand command)
        {
            command.IP = ClientIP;
            command.UserId = napSession.UserId;
            command.StartTime = commonService.ConvertToServerDateTime(command.StartTime);
            command.EndTime = commonService.ConvertToServerDateTime(command.EndTime);
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }
    }
}
