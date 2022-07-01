namespace CRM.Controllers.Feedback
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models;
    using CRM.Models.Feedback.MultipleLogs;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using CRM.ViewModels.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
    public class MultipleLogsController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;
        private readonly IFeedbackService feedbackService;

        public MultipleLogsController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IBaseService baseService,
            ISettingService settingService,
            IFeedbackService feedbackService
        )
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.baseService = baseService;
            this.settingService = settingService;
            this.feedbackService = feedbackService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMultipleLogsCommand command)
        {
            command.CreatorId = napSession.UserId;
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetSettings()
        {
            var settings = await GetAllSettingAsync();
            var statusRemoveDelete =  settings.Statuses.Where(x => x.StatusId != (int)Core.Enumerables.FeedbackStatus.Deleted);
            settings.Statuses = statusRemoveDelete;
            return Json(settings);
        }
        
        [HttpPost]
        public async Task<IActionResult> VerifyCustomer([FromBody] VerifyCustomerCriteria criteria)
        {
            var customers = await baseService.GetDataAsync<VerifyCustomerResult>(criteria);
            return Json(customers);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyRelatedCustomer([FromBody] VerifyRelatedCustomerCriteria criteria)
        {
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
            var result = await feedbackService.GetLogByFeedbackIdAsync(id);
            return Json(result);
        }

        [HttpPost]
        public async Task<ActionResult> EditMultipleLogStatuses([FromBody] EditMultipleLogStatusCommand command)
        {
            CommandResult commandResult = CheckEditMultipleLogPermission();
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

        private CommandResult CheckEditMultipleLogPermission()
        {
            var commandResult = new CommandResult { Code = 0 };
            if (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host)
                || !userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host))
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotEditFeedbackPermission
                };
            }

            if (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host))
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotDeleteFeedbackPermission
                };
            }

            return commandResult;
        }

        public async Task<IActionResult> GetLogSettingByFeedbackId(int id)
        {
            var communicationLog = await feedbackService.GetLogByFeedbackIdAsync(id);
            var settings = await GetAllSettingAsync();
            var roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role, SettingConstants.Active);
            var sites = await settingService.GetAllSitesWithGroupAsync();
            var licenseeTypes = await settingService.GetLicenseeTypeAsync();

            settings.Sites = sites;
            settings.Roles = roles;
            settings.LicenseeTypes = licenseeTypes;

            var hasReviewFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host);
            return Json(new { communicationLog, settings, hasReviewFeedbackPermission });
        }

        [HttpPost]
        public async Task<ActionResult> EditMultipleLogs([FromBody] EditMultipleLogsCommand command)
        {
            command.ReviewerId = !command.IsReviewed ? 0 : napSession.UserId;
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
            
        }

        private async Task<CreateFeedbackViewModel> GetAllSettingAsync()
        {
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var products = await settingService.GetProductAsync(SettingConstants.Active);
            var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var settings = new CreateFeedbackViewModel
            {
                Extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
                CommunicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active),
                Statuses = statuses,
                Responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
                Languages = await settingService.GetLanguageAsync(SettingConstants.Active, true),
                Countries = await settingService.GetCountryAsync(SettingConstants.Active, true),
                MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
                Products = products.Where(x => x.Id != NAConstants.ProductNA),
                SubProducts = subproducts.Where(x => x.Id != NAConstants.SubProductNA),
                Bettypes = bettypes.Where(x => x.Id != NAConstants.BettypeNA),
                ProductNA = products.FirstOrDefault(x => x.Id == NAConstants.ProductNA),
                SubProductNA = subproducts.FirstOrDefault(x => x.Id == NAConstants.SubProductNA),
                BettypeNA = bettypes.FirstOrDefault(x => x.Id == NAConstants.BettypeNA),
                ExtensionNA = extentions.FirstOrDefault(x => x.Id == NAConstants.ExtentionNA),
            };

            return settings;
        }
    }
}