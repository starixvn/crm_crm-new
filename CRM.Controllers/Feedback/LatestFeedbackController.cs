namespace CRM.Controllers.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Criteria.Feedback.LatestFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Read)]
    public class LatestFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IFeedbackService feedbackService;

        public LatestFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IExportExcelService excelService,
            ISettingService settingService,
            IFeedbackService feedbackService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.excelService = excelService;
            this.feedbackService = feedbackService;
        }

        public IActionResult Index()
        {
            ViewBag.HasReviewFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.ReviewFeedback, Policy.Host);
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(isHost);
        }

        [HttpPost]
        public async Task<IActionResult> GetLatestFeedback([FromBody] GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await GetAllMainCategoriesFromAllSettings();

            return Json(new { data = feedbacks, mainCategories });
        }

        private async Task<IEnumerable<Setting>> GetAllMainCategoriesFromAllSettings()
        {
            var mainCategories = await settingService.GetSettingAsync(SettingName.MainCategory, true);
            var subCategories = await settingService.GetSubCategoryAsync();

            foreach (var category in mainCategories)
            {
                category.ChildSettings = subCategories.Where(x => x.MainCategoryID == category.SettingId).OrderBy(s => s.DisplayOrder).ToList();
            }

            return mainCategories;
        }

        [HttpPost]
        public async Task<IActionResult> ExportLatestFeedbackReport([FromBody] GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);
            IEnumerable<Setting> mainCategories = await GetAllMainCategoriesFromAllSettings();

            var bytes = excelService.ExportLatestFeedbackReport(feedbacks, mainCategories, param.Top);
            string reportName = string.Format(ViewResources.FeedbackReport_Title, param.Top);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statues = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var products = await settingService.GetProductAsync(SettingConstants.Active);
            var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);

            var settings = new
            {
                extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
                communicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active),
                roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role, SettingConstants.Active),
                responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
                countries = await settingService.GetCountryAsync(SettingConstants.Active, true),
                languages = await settingService.GetLanguageAsync(SettingConstants.Active, true),
                statuses = statues.Where(x => !string.Equals(x.Name, ViewResources.Deleted, StringComparison.OrdinalIgnoreCase)),
                titles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active),
                licenseeTypes = await settingService.GetLicenseeTypeAsync(),
                sites = await settingService.GetAllSitesWithGroupAsync(),
                products = products.Where(x => x.Id != NAConstants.ProductNA),
                subProducts = subproducts.Where(x => x.Id != NAConstants.SubProductNA),
                bettypes = bettypes.Where(x => x.Id != NAConstants.BettypeNA),
                mainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                subCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
                productNA = products.FirstOrDefault(x => x.Id == NAConstants.ProductNA),
                subProductNA = subproducts.FirstOrDefault(x => x.Id == NAConstants.SubProductNA),
                bettypeNA = bettypes.FirstOrDefault(x => x.Id == NAConstants.BettypeNA),
                extensionNA = extentions.FirstOrDefault(x => x.Id == NAConstants.ExtentionNA)
            };

            return Json(settings);
        }

        public async Task<IActionResult> GetFeedbackById(int id)
        {
            CustomerFeedback feedback = await feedbackService.GetFeedbackByIdAsync(id);
            return Json(feedback);
        }

        [HttpPost]
        public async Task<IActionResult> EditFeedback([FromBody] EditFeedbackCommand command)
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

            var commandResult = await feedbackService.EditFeedbackAsync(command);

            return Json(commandResult);
        }
    }
}