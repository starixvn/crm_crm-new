namespace CRM.Controllers.Feedback
{
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;
    using CRM.Criteria.Feedback.LatestFeedback;
    using CRM.Models;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

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
            this.settingService = settingService;
            this.excelService = excelService;
            this.feedbackService = feedbackService;
        }
        public IActionResult Index()
        {
            //var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.LatestFeedback, Policy.Host);
            return View(true);
        }
        [HttpPost]
        public async Task<IActionResult> GetLatestFeedback([FromBody] GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await GetFeedbacks(param);
            IEnumerable<Setting> mainCategories = await GetAllMainCategoriesFromAllSettings();

            return Json(new { data = feedbacks, mainCategories });
        }

        private async Task<IEnumerable<DeletedFeedback>> GetFeedbacks(GetLatestFeedbackParam param)
        {
            IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetLatestFeedbackAsync(param);

            var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusHash = statusList.ToDictionary(k => k.SettingId, v => v.SettingName);
            statusHash.Add(1, ViewResources.Symbol_NotApply);

            foreach (var feedback in feedbacks)
            {
                feedback.Status = statusHash.ContainsKey(feedback.StatusId) ? statusHash[feedback.StatusId] : string.Empty;
            }

            return feedbacks;
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
            var reports = await GetFeedbacks(param);
            var bytes = excelService.ExportLatestFeedbackReport(reports);
            string reportName = string.Format(ViewResources.FeedbackReport_Title, param.Top);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        public IActionResult GetTops()
        {
            var tops = new List<BaseModel>
                {
                    new BaseModel { Id = 10, Name = "10" },
                    new BaseModel { Id = 20, Name = "20" },
                    new BaseModel { Id = 30, Name = "30" },
                    new BaseModel { Id = 40, Name = "40" },
                    new BaseModel { Id = 50, Name = "50" }
                };

            return Json(tops);
        }

        [HttpPost]
        public async Task<IActionResult> EditNoInquiries([FromBody] EditNoInquiries model)
        {
            CommandResult commandResult = await feedbackService.EditNoInquiries(model);
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
            var statusListRemoveDelete = statusList.Where(s => s.Id != (int)CRMStatus.Deleted).ToList();
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
            var criteria = new GetFeedbackByIdCriteria
            {
                FeedbackID = id
            };
            var feedback = await feedbackService.GetFeedbackById(criteria);

            return Json(feedback);
        }

        [HttpPost]
        public async Task<IActionResult> EditFeedback([FromBody] EditFeedbackCommand command)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var commandResult = await feedbackService.EditFeedbackAsync(command);

            return Json(commandResult);
        }
    }
}
