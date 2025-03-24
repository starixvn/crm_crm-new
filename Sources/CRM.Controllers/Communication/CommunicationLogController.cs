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
    using CRM.Criteria.Customer;
    using CRM.Criteria.Feedback.AddFeedback;
    using CRM.Models.Customer;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Communication;
    using CRM.ViewModels.Feedback;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

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
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            var logs = await communicationService.GetLogsByCustomerIdAsync(criteria);
            var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            return Json(new { data = logs, mainCategories });
        }

        public async Task<IActionResult> GetAllStatus(bool isEdit)
        {
            var statuses = await GetStatusListAsync(isEdit);
            return Json(statuses);
        }

        public async Task<IActionResult> GetLogByFeedbackId(int id, int modeId)
        {
            var log = await communicationService.GetLogByFeedbackIdAsync(id, modeId);

            if (log.RelatedCustomers is not null && log.RelatedCustomers.Any())
            {
                await VerifyCustomerByUsernames(log.RelatedCustomers);
            }

            var settings = await GetAllSettings(true);
            var hasReviewFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);

            return Json(new { log, settings, hasReviewFeedbackPermission });
        }

        private async Task VerifyCustomerByUsernames(IEnumerable<RelatedCustomerPermission> customers)
        {
            var criteria = new VerifyRelatedCustomerCriteria
            {
                Username = string.Join(",", customers.Select(x => x.Username)),
                LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync(),
                SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync()
            };
            IEnumerable<RelatedCustomerPermission> verifiedCustomers = await baseService.GetDataAsync<RelatedCustomerPermission>(criteria);
            foreach (var cust in customers)
            {
                var customer = verifiedCustomers.FirstOrDefault(x => x.CustId == cust.CustId);
                cust.IsAuthorized = customer != null && customer.IsAuthorized;
            }
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

        #pragma warning disable S1541
        private async Task<CommandResult> CheckEditCustomerFeedbackPermission(EditCommunicationLogCommand command)
        #pragma warning restore S1541
        {
            var commandResult = new CommandResult { Code = 0 };
            var isReadCustInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit) || await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee);
            var isHostCreateFeedback = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host);
            var isHostReviewFeedback = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);

            if (!isReadCustInfo || !isHostCreateFeedback)
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotEditCommunicationLogPermission
                };
            }

            if ((command.UpdateReviewedMode != (byte)ReviewFeedbackMode.NotUpdate && !isHostReviewFeedback))
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.NoReviewPermission
                };
            }

            var isChangedStatusFromDeleted = command.IsDeletedFeedbackView && command.StatusId != (int)FeedbackStatus.Deleted;
            var isChangedStatusToDeleted = !command.IsDeletedFeedbackView && command.StatusId == (int)FeedbackStatus.Deleted;
            if (!await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback)
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
            var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
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
        public async Task<IActionResult> CreateCommunicationLog([FromBody] AddCustomerFeedbackCommand command)
        {
            command.UserId = napSession.UserId;
            command.CreatorId = napSession.UserId;
            command.IP = ClientIP;
            command.FeedbackDate = commonService.ConvertToServerDateTime(command.FeedbackDate);
            command.ResolutionDate = commonService.ConvertToServerDateTime(command.ResolutionDate);
            command.FirstResponseTime = command.FirstResponseTime.HasValue ? commonService.ConvertToServerDateTime(command.FirstResponseTime.Value) : null;
            command.IsCommunicationLog = true;
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