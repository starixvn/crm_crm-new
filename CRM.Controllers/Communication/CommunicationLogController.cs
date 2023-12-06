namespace CRM.Controllers.Communication
{
    using System.Collections.Generic;
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
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Read)]
    public class CommunicationLogController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ICommunicationService communicationService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;
        private readonly IPermissionService permissionService;

        public CommunicationLogController(
            INapSession napSession,
            ICommunicationService communicationService,
            ISettingService settingService,
            IBaseService baseService,
            ICommonService commonService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.communicationService = communicationService;
            this.settingService = settingService;
            this.baseService = baseService;
            this.commonService = commonService;
            this.permissionService = permissionService;
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
            var statuses = await GetStatusListAsync(isEdit);
            return Json(statuses);
        }

        public async Task<IActionResult> GetLogByFeedbackId(int id)
        {
            var log = await communicationService.GetLogByFeedbackIdAsync(id);
            var settings = await GetAllSettings(true);
            var hasReviewFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);

            return Json(new { log, settings, hasReviewFeedbackPermission });
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> EditCommunicationLog([FromBody] EditCommunicationLogCommand command)
        {
            CommandResult commandResult = await CheckEditCustomerFeedbackPermission(command);
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

        private async Task<CommandResult> CheckEditCustomerFeedbackPermission(EditCommunicationLogCommand command)
        {
            var commandResult = new CommandResult { Code = 0 };
            var isReadCustInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit) || await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee);
            var isHostCreateFeedback = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host);
            var isHostReviewFeedback = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);

            if (!isReadCustInfo || !isHostCreateFeedback || (command.UpdateReviewedMode != (byte)ReviewFeedbackMode.NotUpdate && !isHostReviewFeedback))
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotEditCommunicationLogPermission
                };
            }

            var isChangedStatusFromDeleted = command.IsDeletedFeedbackView && command.StatusId != (int)FeedbackStatus.Deleted;
            var isChangedStatusToDeleted = !command.IsDeletedFeedbackView && command.StatusId == (int)FeedbackStatus.Deleted;
            if (!await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Read)
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

        public async Task<CreateFeedbackViewModel> GetAllSettings(bool isEdit)
        {
            var licenseeType = await permissionService.GetCurrentUserSitePermissionAsync();
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statuses = await GetStatusListAsync(isEdit);
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
                Sites = await settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType),
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

        private async Task<IEnumerable<Models.Setting.FeedbackStatus>> GetStatusListAsync(bool isEdit = false)
        {
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var isHostDeleteFbPermision = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.DeleteFeedback, Policy.Host);

            if (!isEdit || !isHostDeleteFbPermision)
            {
                statuses = statuses.Where(x => x.StatusId != (int)FeedbackStatus.Deleted);
            }

            return statuses;
        }
    }
}
