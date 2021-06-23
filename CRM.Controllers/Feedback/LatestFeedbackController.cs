namespace CRM.Controllers.Feedback
{
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Models;
    using CRM.Core.Models.Feedback;
    using CRM.Criteria.Feedback;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Feedback;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.LatestFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using static Fanex.NAP.Core.Business.Constant;

    public class LatestFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;


        public LatestFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            IExportExcelService excelService,
        ISettingService settingService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.settingService = settingService;
            this.excelService = excelService;
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

            var statusList = await settingService.GetAllStatusAsync(new GetAllStatusCriteria { });
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
            var mainCategories = await settingService.GetAsync(new GetSettingParam
            {
                SettingName = SettingName.MainCategory,
                IsActive = true
            });

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
        public async Task<IActionResult> EditQuickUpdateFeedback([FromBody] EditQuickUpdateFeedback model)
        {
            CommandResult commandResult = await feedbackService.UpdateQuickUpdateFeedback(model);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetNoInquiries(int id)
        {
            EditQuickUpdateFeedback feedback = await feedbackService.GetNoInquiriesAsync(id);
            return Json(feedback);
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var settings = new
            {
                Titles = await settingService.GetSettingRelations(new GetSettingRelationByNameCriteria
                {
                    SettingName = SettingName.Title,
                    ParentID = 0,
                    Active = SettingConstants.ActiveAndInactive
                }),
                ExtensionList = settingService.GetSettingRelations(new GetSettingRelationByNameCriteria
                {
                    SettingName = SettingName.Extension,
                    ParentID = 0,
                    Active = SettingConstants.Active
                }),
                CommunicationToolList = await settingService.GetAllCommunicationToolAsync(),
                Countries = await settingService.GetAllCountryAsync(new GetAllCountryCriteria()),
                Provinces = settingService.GetAllProvinceAsync(new GetAllProvinceCriteria()),
                Languages = await settingService.GetAllLanguageAsync(new GetAllLanguageCriteria()),
                StatusList = await settingService.GetAllStatusAsync(new GetAllStatusCriteria()),
                Roles = settingService.GetSettingRelations(new GetSettingRelationByNameCriteria
                {
                    SettingName = SettingName.Role,
                    ParentID = 0,
                    Active = SettingConstants.ActiveAndInactive
                }),
                Responses = settingService.GetSettingRelations(new GetSettingRelationByNameCriteria
                {
                    SettingName = SettingName.Response,
                    ParentID = 0,
                    Active = SettingConstants.ActiveAndInactive
                }),
                LicenseeTypes = settingService.GetAllLicenseeTypeAsync(new GetAllLicenseeTypeCriteria()),
                ProductNA = settingService.GetSettingRelations(new GetSettingRelationByNameCriteria
                {
                    SettingName = SettingName.Product,
                    ParentID = 0,
                    Active = SettingConstants.Active
                }),
                ProductList = settingService.GetSettingRelations(new GetSettingRelationByNameCriteria
                {
                    SettingName = SettingName.Product,
                    ParentID = 0,
                    Active = SettingConstants.ActiveAndInactive
                }),
                SubProductList = settingService.GetSubProductAsync(new SubProductCriteria()),
                BettypeList = settingService.GetAllBetTypeAsync(new GetAllBetTypeCriteria()),
                MainCategoryList = await settingService.GetMainCategoryAsync(),
                SubCategoryList = await settingService.GetSubCategoryAsync()
            };

            return Json(settings);
        }
    }
}
