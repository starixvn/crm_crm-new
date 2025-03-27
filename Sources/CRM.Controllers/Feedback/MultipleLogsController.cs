namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models.Feedback.MultipleLogs;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using CRM.ViewModels.Feedback;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Read)]
    public class MultipleLogsController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly IFeedbackService feedbackService;
        private readonly ICommonService commonService;
        private readonly IPermissionService permissionService;

        public MultipleLogsController(
            INapSession napSession,
            IBaseService baseService,
            ISettingService settingService,
            IFeedbackService feedbackService,
            ICommonService commonService,
            IPermissionService permissionService
        )
        {
            this.napSession = napSession;
            this.baseService = baseService;
            this.settingService = settingService;
            this.feedbackService = feedbackService;
            this.commonService = commonService;
            this.permissionService = permissionService;
        }

        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMultipleLogsCommand command)
        {
            command.CreatorId = napSession.UserId;
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            command.StartTime = commonService.ConvertToServerDateTime(command.StartTime);
            command.EndTime = commonService.ConvertToServerDateTime(command.EndTime);
            command.FirstResponseTime = command.FirstResponseTime.HasValue ? commonService.ConvertToServerDateTime(command.FirstResponseTime.Value) : null;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetSettings()
        {
            var settings = await GetAllSettingAsync();
            var statusRemoveDelete = settings.Statuses.Where(x => x.StatusId != (int)Core.Enumerables.FeedbackStatus.Deleted);
            settings.Statuses = statusRemoveDelete;
            return Json(settings);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyCustomer([FromBody] VerifyCustomerCriteria criteria)
        {
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var customers = await baseService.GetDataAsync<VerifyCustomerResult>(criteria);
            return Json(customers);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyRelatedCustomer([FromBody] VerifyRelatedCustomerCriteria criteria)
        {
            criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
            criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
            var customers = await baseService.GetDataAsync<VerifyRelatedCustomerResult>(criteria);
            return Json(customers);
        }

        [HttpPost]
        public async Task<IActionResult> CheckNotExistCommunicationToolSetting([FromBody] CheckNotExistCommunicationToolSettingCriteria criteria)
        {
            var customers = await baseService.GetDataAsync<VerifyCommunicationToolSetting>(criteria);
            return Json(customers);
        }

        public async Task<ActionResult> GetLogByFeedbackId(int id)
        {
            var logInfo = await feedbackService.GetLogByFeedbackIdAsync(id);
            var statuses = await GetStatusListAsync();
            return Json(new { logInfo, statuses });
        }

        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        [HttpPost]
        public async Task<ActionResult> EditMultipleLogStatuses([FromBody] EditMultipleLogStatusCommand command)
        {
            CommandResult commandResult = await CheckEditMultipleLogPermission(command);
            if (commandResult.IsSuccessful)
            {
                command.ReviewerId = string.IsNullOrEmpty(command.ReviewNote) ? 0 : napSession.UserId;
                command.UserId = napSession.UserId;
                command.IP = ClientIP;
                var result = await baseService.ExecuteNonQueryAsync(command);
                return Json(result);
            }
            return Json(commandResult);
        }

        private async Task<CommandResult> CheckEditMultipleLogPermission(EditMultipleLogStatusCommand command)
        {
            var commandResult = new CommandResult { Code = 0 };
            bool isHostCreateFb = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host);
            bool isHostReviewFb = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);
            if (!isHostCreateFb)
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotEditFeedbackPermission
                };
            }

            if (command.IsReviewed && !isHostReviewFb)
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.NoReviewPermission
                };
            }

            return commandResult;
        }

        public async Task<IActionResult> GetLogSettingByFeedbackId(int id)
        {
            short licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

            var communicationLogTask = feedbackService.GetLogByFeedbackIdAsync(id);
            var settingTask = GetAllSettingAsync();
            var rolesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role, SettingConstants.Active);
            var sitesTask = settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType);
            var licenseeTypesTask = settingService.GetLicenseeTypeAsync();

            await Task.WhenAll(communicationLogTask, settingTask, rolesTask, sitesTask, licenseeTypesTask);

            var communicationLog = communicationLogTask.Result;
            var settings = settingTask.Result;

            settings.Sites = sitesTask.Result;
            settings.Roles = rolesTask.Result;
            settings.LicenseeTypes = licenseeTypesTask.Result;

            var hasReviewFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);
            return Json(new { communicationLog, settings, hasReviewFeedbackPermission });
        }

        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        [HttpPost]
        public async Task<ActionResult> EditMultipleLogs([FromBody] EditMultipleLogsCommand command)
        {
            var result = new CommandResult();

            bool hostReviewFb = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);

            if (command.IsUpdateReview && !hostReviewFb)
            {
                result.Message = ViewResources.NoReviewPermission;
            }
            else
            {
                command.ReviewerId = !command.IsReviewed ? 0 : napSession.UserId;
                command.UserId = napSession.UserId;
                command.IP = ClientIP;
                command.FeedbackDate = commonService.ConvertToServerDateTime(command.FeedbackDate);
                command.ResolutionDate = commonService.ConvertToServerDateTime(command.ResolutionDate);
                command.FirstResponseTime = command.FirstResponseTime.HasValue ? commonService.ConvertToServerDateTime(command.FirstResponseTime.Value) : null;
                result = await baseService.ExecuteNonQueryAsync(command);
            }

            return Json(result);
        }

        private async Task<CreateFeedbackViewModel> GetAllSettingAsync()
        {
            var extentionsTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statusesTask = GetStatusListAsync();
            var productsTask = settingService.GetProductAsync(SettingConstants.Active);
            var subproductsTask = settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypesTask = settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var responseTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active);
            var languagesTask = settingService.GetLanguageAsync(SettingConstants.Active, true);
            var countriesTask = settingService.GetCountryAsync(SettingConstants.Active, true);
            var mainCategoriesTask = settingService.GetMainCategoryAsync(SettingConstants.Active);
            var subCategoriesTask = settingService.GetSubCategoryAsync(active: SettingConstants.Active);
            var communicationToolsTask = settingService.GetCommunicationToolAsync(SettingConstants.Active);

            await Task.WhenAll(extentionsTask, statusesTask, productsTask, subproductsTask, bettypesTask, responseTask, languagesTask, countriesTask,
                mainCategoriesTask, subCategoriesTask, communicationToolsTask);

            var settings = new CreateFeedbackViewModel
            {
                Extensions = extentionsTask.Result.Where(x => x.Id != NAConstants.ExtentionNA),
                CommunicationTools = communicationToolsTask.Result,
                Statuses = statusesTask.Result,
                Responses = responseTask.Result,
                Languages = languagesTask.Result,
                Countries = countriesTask.Result,
                MainCategories = mainCategoriesTask.Result,
                SubCategories = subCategoriesTask.Result,
                Products = productsTask.Result.Where(x => x.Id != NAConstants.ProductNA),
                SubProducts = subproductsTask.Result.Where(x => x.Id != NAConstants.SubProductNA),
                Bettypes = bettypesTask.Result.Where(x => x.Id != NAConstants.BettypeNA),
                ProductNA = productsTask.Result.FirstOrDefault(x => x.Id == NAConstants.ProductNA),
                SubProductNA = subproductsTask.Result.FirstOrDefault(x => x.Id == NAConstants.SubProductNA),
                BettypeNA = bettypesTask.Result.FirstOrDefault(x => x.Id == NAConstants.BettypeNA),
                ExtensionNA = extentionsTask.Result.FirstOrDefault(x => x.Id == NAConstants.ExtentionNA),
            };

            return settings;
        }

        private async Task<IEnumerable<Models.Setting.FeedbackStatus>> GetStatusListAsync()
        {
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var isHostDeleteFbPermision = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.DeleteFeedback, Policy.Host);

            if (!isHostDeleteFbPermision)
            {
                statuses = statuses.Where(x => x.StatusId != (int)Core.Enumerables.FeedbackStatus.Deleted);
            }

            return statuses;
        }
    }
}