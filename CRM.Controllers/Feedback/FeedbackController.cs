namespace CRM.Controllers.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Criteria.Feedback;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    public class FeedbackController : BaseController
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

        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> GetNoOfInquiryByFeedbackId(int id)
        {
            EditNoOfInquiry feedback = await feedbackService.GetNoOfInquiryByFeedbackIdAsync(id);
            return Json(feedback);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
        public async Task<IActionResult> EditNoOfInquiry([FromBody] EditNoOfInquiryCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await feedbackService.EditNoOfInquiryAsync(command);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetCustomerFeedbackById(int id)
        {
            CustomerFeedback feedback = await feedbackService.GetCustomerFeedbackByIdAsync(id);
            var settings = await GetEditCustomerFeedbackSettingAsync(feedback);
            return Json(new { feedback, settings });
        }

        [HttpPost]
        public async Task<IActionResult> EditCustomerFeedback([FromBody] EditCustomerFeedbackCommand command)
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

            CommandResult commandResult = CheckEditCustomerFeedbackPermission(command);
            if (commandResult.IsSuccessful)
            {
                commandResult = await feedbackService.EditCustomerFeedbackAsync(command);
            }

            return Json(commandResult);
        }

        protected internal virtual async Task<IActionResult> GetEditCustomerFeedbackSettingAsync(CustomerFeedback feedback)
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

            var settings = new
            {
                extensions = GetExtentions(extentions, feedbackSettings),
                communicationTools = GetCommunicationTools(communicationTools, feedbackSettings),
                responses = responses.Where(x => x.IsActive || x.Id == feedback.ResponseId).ToList(),
                languages = languages.Where(x => x.IsActive || x.Id == feedback.LanguageId).ToList(),
                statuses = GetStatusAsync(feedback),
                roles = roles.Where(x => x.IsActive || x.Id == feedback.RoleId).ToList(),
                countries = countries.Where(x => x.IsActive || x.Id == feedback.CountryId).ToList(),
                titles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active),
                licenseeTypes = await settingService.GetLicenseeTypeAsync(),
                sites = await settingService.GetAllSitesWithGroupAsync(),
                mainCategories = await GetMainCategoryAsync(feedbackSettings),
                subCategories = await GetSubCategoryAsync(feedbackSettings),
                products = GetProducts(products, feedbackSettings),
                subProducts = GetSubProducts(subProducts, feedbackSettings),
                bettypes = GetBetTypes(betTypes, feedbackSettings),
                productNA = products.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.ProductNA),
                subProductNA = subProducts.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.SubProductNA),
                bettypeNA = betTypes.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.BettypeNA),
                extensionNA = extentions.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.ExtentionNA),
                communicationToolNA = communicationTools.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.CommunicationNA)
            };

            return Json(settings);
        }

        private static IList<FeedbackSettingRelation> GetFeedbackSettingByType(IEnumerable<FeedbackSettingRelation> settings, string settingType)
        {
            return settings.Where(y => y.SettingType.Equals(settingType, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        private static IList<SettingRelation> GetExtentions(IEnumerable<SettingRelation> extentions, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Status);
            return extentions.Where(x => x.IsActive
                || (x.Id != NAConstants.ExtentionNA && feedbackSettings.Any(y => y.SettingId == x.Id))).ToList();
        }

        private static IList<Setting> GetCommunicationTools(IEnumerable<Setting> communicationTools, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.CommunicationTool);
            return communicationTools.Where(x => x.IsActive
                || (x.Id != NAConstants.CommunicationNA && feedbackSettings.Any(y => y.SettingId == x.Id))).ToList();
        }

        private async Task<IList<FeedbackStatus>> GetStatusAsync(CustomerFeedback feedback)
        {
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            return statuses.Where(x => (x.IsActive || x.StatusId == feedback.StatusId)
                && !string.Equals(x.Name, ViewResources.Deleted, StringComparison.OrdinalIgnoreCase)).ToList();
        }

        private async Task<IList<Setting>> GetMainCategoryAsync(IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.MainCategory);
            var mainCategories = await settingService.GetMainCategoryAsync();
            return mainCategories.Where(x => x.IsActive || feedbackSettings.Any(y => y.SettingId == x.MainCategoryID)).ToList();
        }

        private async Task<IList<Setting>> GetSubCategoryAsync(IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.MainCategory);
            var subCategories = await settingService.GetSubCategoryAsync();
            return subCategories.Where(x => x.IsActive || feedbackSettings.Any(y => y.SubSettingId == x.SubCategoryId)).ToList();
        }

        private static IList<Product> GetProducts(IEnumerable<Product> products, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
            return products.Where(x => x.IsActive
                || (x.Id != NAConstants.ProductNA && feedbackSettings.Any(y => y.SettingId == x.Id))).ToList();
        }

        private static IList<Product> GetSubProducts(IEnumerable<Product> subProducts, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
            return subProducts.Where(x => x.IsActive
                || (x.Id != NAConstants.SubProductNA && feedbackSettings.Any(y => y.SubSettingId == x.Id))).ToList();
        }

        private static IList<Product> GetBetTypes(IEnumerable<Product> betTypes, IEnumerable<FeedbackSettingRelation> settings)
        {
            var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
            return betTypes.Where(x => x.IsActive
                || (x.Id != NAConstants.BettypeNA && feedbackSettings.Any(y => y.SubSettingIdLevel3 == x.Id))).ToList();
        }

        protected internal virtual CommandResult CheckEditCustomerFeedbackPermission(EditCustomerFeedbackCommand command)
        {
            if (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host)
                || (!userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host) &&
                    command.UpdateReviewedMode != (byte)ReviewFeedbackMode.NotUpdate))
            {
                return new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNoEditFeedbackPermission
                };
            }

            return new CommandResult
            {
                Code = 0
            };
        }
    }
}