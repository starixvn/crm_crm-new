namespace CRM.Controllers.Feedback
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;
    using CRM.Criteria.Feedback.LatestFeedback;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;

    public class LatestFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        private readonly IFeedbackService feedbackService;

        public LatestFeedbackController(
            INapSession napSession,
            IExportExcelService excelService,
            ISettingService settingService,
            IFeedbackService feedbackService)
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.excelService = excelService;
            this.feedbackService = feedbackService;
        }

        public IActionResult Index()
        {
            return View(true);
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

        [HttpPost]
        public async Task<IActionResult> EditNoInquiries([FromBody] EditNoInquiries model)
        {
            CommandResult commandResult = await feedbackService.EditNoInquiries(model, ClientIP);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetNoInquiries(int id)
        {
            EditNoInquiries feedback = await feedbackService.GetNoInquiriesAsync(id);
            return Json(feedback);
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var languages = await settingService.GetLanguageAsync(SettingConstants.Active, true);
            var countries = await settingService.GetCountryAsync(SettingConstants.Active, true);
            var titles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active);
            var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusListRemoveDelete = statusList.Where(s => s.StatusId != (int)CRMStatus.Deleted).ToList();
            var communicationToolList = await settingService.GetCommunicationToolAsync(SettingConstants.Active);
            var productList = await settingService.GetProductAsync(SettingConstants.Active);
            var roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role, SettingConstants.Active);
            var responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active);
            var mainCategoryList = await settingService.GetMainCategoryAsync(SettingConstants.Active);
            var subCategoryList = await settingService.GetSubCategoryAsync(active: SettingConstants.Active);
            var subproduct = await settingService.GetSubProductAsync();
            var extentionList = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var licenseeTypeList = await settingService.GetLicenseeTypeAsync();
            var sites = await settingService.GetAllSitesWithGroupAsync();

            var settings = new
            {
                CommunicationToolList = communicationToolList,
                ProductList = productList,
                Roles = roles,
                Responses = responses,
                MainCategoryList = mainCategoryList,
                SubCategoryList = subCategoryList,
                SubProductList = subproduct,
                CountryList = countries,
                LanguageList = languages,
                ExtensionList = extentionList,
                StatusList = statusListRemoveDelete,
                BettypeList = bettypes,
                Titles = titles,
                LicenseeType = licenseeTypeList,
                Sites = sites
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
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            var commandResult = await feedbackService.EditFeedbackAsync(command);

            return Json(commandResult);
        }
    }
}