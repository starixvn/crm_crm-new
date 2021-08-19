namespace CRM.Controllers.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Extensions;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Feedback;
    using CRM.Criteria.Feedback.ManageFeedback;
    using CRM.Models.CommunicationLogs;
    using CRM.Models.Feedback;
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

    public class FeedbackController : Controller
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IFeedbackService feedbackService;

        public FeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            IFeedbackService feedbackService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.feedbackService = feedbackService;
        }

        //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> GetNoOfInquiryByFeedbackId(int id)
        {
            EditNoOfInquiry feedback = await feedbackService.GetNoOfInquiryByFeedbackIdAsync(id);
            return Json(feedback);
        }

        [HttpPost]
        //[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditNoOfInquiry([FromBody] EditNoOfInquiryCommand command)
        {
            command.UserId = napSession.UserId;
            //command.IP = ClientIP;
            CommandResult commandResult = await feedbackService.EditNoOfInquiryAsync(command);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetCustomerFeedbackById(int id, bool isDeletedFeedbackView = false)
        {
            CustomerFeedback feedback = await feedbackService.GetCustomerFeedbackByIdAsync(id);
            var settings = await GetEditCustomerFeedbackSettingAsync(feedback, isDeletedFeedbackView);
            //var hasReviewFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host);
            var hasReviewFeedbackPermission = true;
            return Json(new { feedback, settings, hasReviewFeedbackPermission });
        }

        [HttpPost]
        public async Task<IActionResult> EditCustomerFeedback([FromBody] EditCustomerFeedbackCommand command)
        {
            CommandResult commandResult = CheckEditCustomerFeedbackPermission(command);
            if (commandResult.IsSuccessful)
            {
                command.UserId = napSession.UserId;
               // command.IP = ClientIP;
                if (command.IsReviewed)
                {
                    command.ReviewerId = napSession.UserId;
                }
                else
                {
                    command.Review = string.Empty;
                }

                commandResult = await feedbackService.EditCustomerFeedbackAsync(command);
            }

            return Json(commandResult);
        }

        private CommandResult CheckEditCustomerFeedbackPermission(EditCustomerFeedbackCommand command)
        {
            var commandResult = new CommandResult { Code = 0 };
            if (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host)
                || (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host) &&
                    command.UpdateReviewedMode != (byte)ReviewFeedbackMode.NotUpdate))
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotEditFeedbackPermission
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
                    Message = ViewResources.DoNotDeleteFeedbackPermission
                };
            }

            return commandResult;
        }

        public async Task<ActionResult> GetLogByFeedbackId(int id)
        {
            var result = await feedbackService.GetLogByFeedbackIdAsync(id);
            return Json(result);
        }

        [HttpPost]
        public async Task<ActionResult> EditMultipleLogStatuses([FromBody] EditMultipleLogStatusCommand command)
        {
            //CommandResult commandResult = CheckEditMultipleLogPermission();
            //if (commandResult.IsSuccessful)
            //{
                command.ReviewerId = string.IsNullOrEmpty(command.ReviewNote) ? 0 : napSession.UserId;
                command.UserId = napSession.UserId;
                //command.IP = ClientIP;
                command.IP = "ClientIP";
                var result = await feedbackService.EditMultipleLogStatusesAsync(command);
                return Json(result);
            //}
            //return Json(commandResult);
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
            var communicationLogs = await feedbackService.GetLogByFeedbackIdAsync(id);
            var settings = await GetEditMultipleLogsSettingAsync();
            //var hasReviewFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host);
            var hasReviewFeedbackPermission = true;
            return Json(new { communicationLogs, settings, hasReviewFeedbackPermission });
        }

        private async Task<CreateFeedbackViewModel> GetEditMultipleLogsSettingAsync()
        {
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var products = await settingService.GetProductAsync(SettingConstants.Active);
            var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role, SettingConstants.Active);
            var settings = new CreateFeedbackViewModel
            {
                Extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
                Sites = await settingService.GetAllSitesWithGroupAsync(),
                Roles = roles,
                LicenseeTypes = await settingService.GetLicenseeTypeAsync(),
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
                ExtensionNA = extentions.FirstOrDefault(x => x.Id == NAConstants.ExtentionNA)
            };

            return settings;
        }

        private async Task<CreateFeedbackViewModel> GetEditCustomerFeedbackSettingAsync(CustomerFeedback feedback, bool isDeletedFeedbackView = false)
        {
            var feedbackSettings = feedback.Settings;
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension);
            var communicationTools = await settingService.GetCommunicationToolAsync(isIncludeNA: true);
            var products = await settingService.GetProductAsync();
            var subProducts = await settingService.GetSubProductAsync();
            var betTypes = await settingService.GetBetTypeAsync();
            var responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response);
            var languages = await settingService.GetLanguageAsync(isIncludeNA: true);
            var roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role);
            var countries = await settingService.GetCountryAsync(isIncludeNA: true);

            var settings = new CreateFeedbackViewModel
            {
                Extensions = GetExtentions(extentions, feedbackSettings),
                CommunicationTools = GetCommunicationTools(communicationTools, feedbackSettings),
                Responses = responses.Where(x => x.IsActive || x.Id == feedback.ResponseId).ToList(),
                Languages = languages.Where(x => x.IsActive || x.LanguageId == feedback.LanguageId).ToList(),
                Statuses = await GetStatusAsync(feedback, isDeletedFeedbackView),
                Roles = roles.Where(x => x.IsActive || x.Id == feedback.RoleId).ToList(),
                Countries = countries.Where(x => x.IsActive || x.Id == feedback.CountryId).ToList(),
                Titles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active),
                LicenseeTypes = await settingService.GetLicenseeTypeAsync(),
                Sites = await settingService.GetAllSitesWithGroupAsync(),
                MainCategories = await GetMainCategoryAsync(feedbackSettings),
                SubCategories = await GetSubCategoryAsync(feedbackSettings),
                Products = GetProducts(products, feedbackSettings),
                SubProducts = GetSubProducts(subProducts, feedbackSettings),
                Bettypes = GetBetTypes(betTypes, feedbackSettings),
                ProductNA = products.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.ProductNA),
                SubProductNA = subProducts.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.SubProductNA),
                BettypeNA = betTypes.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.BettypeNA),
                ExtensionNA = extentions.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.ExtentionNA),
                CommunicationToolNA = communicationTools.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.CommunicationNA)
            };

            return settings;
        }

        private static IList<FeedbackSettingRelation> GetFeedbackSettingByType(IEnumerable<FeedbackSettingRelation> settings, string settingType)
        {
            return settings.Where(y => y.SettingType.Equals(settingType, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        private static IList<SettingRelation> GetExtentions(IEnumerable<SettingRelation> extentions, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, "Station");
            return extentions.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SettingId == x.Id))
                && x.Id != NAConstants.ExtentionNA).ToList();
        }

        private static IList<Setting> GetCommunicationTools(IEnumerable<Setting> communicationTools, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.CommunicationTool);
            return communicationTools.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SettingId == x.Id))
                && x.Id != NAConstants.CommunicationNA).ToList();
        }

        private async Task<IList<Models.Setting.FeedbackStatus>> GetStatusAsync(CustomerFeedback feedback, bool isDeletedFeedbackView = false)
        {
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            statuses = statuses.Where(x => (x.IsActive || x.StatusId == feedback.StatusId)).ToList();

            if (!isDeletedFeedbackView
                || !userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host))
            {
                return statuses.Where(x => x.StatusId != (int)Core.Enumerables.FeedbackStatus.Deleted).ToList();
            }

            return statuses.ToList();
        }

        private async Task<IList<Setting>> GetMainCategoryAsync(IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, "Category");
            var mainCategories = await settingService.GetMainCategoryAsync();
            return mainCategories.Where(x => x.IsActive || feedbackSettings.Any(y => y.SettingId == x.MainCategoryID)).ToList();
        }

        private async Task<IList<Setting>> GetSubCategoryAsync(IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, "Category");
            var subCategories = await settingService.GetSubCategoryAsync();
            return subCategories.Where(x => x.IsActive || feedbackSettings.Any(y => y.SubSettingId == x.SubCategoryId)).ToList();
        }

        private static IList<Product> GetProducts(IEnumerable<Product> products, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
            return products.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SettingId == x.Id))
                && x.Id != NAConstants.ProductNA).ToList();
        }

        private static IList<Product> GetSubProducts(IEnumerable<Product> subProducts, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
            return subProducts.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SubSettingId == x.Id))
                && x.Id != NAConstants.SubProductNA).ToList();
        }

        private static IList<Product> GetBetTypes(IEnumerable<Product> betTypes, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
            return betTypes.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SubSettingIdLevel3 == x.Id))
                && x.Id != NAConstants.BettypeNA).ToList();
        }
    }
}