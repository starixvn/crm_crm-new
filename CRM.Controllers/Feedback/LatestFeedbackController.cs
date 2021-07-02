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

            var statusList = await settingService.GetAllStatusAsync(ViewTypeConstants.CommunicationTool);
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
            var subCategories = await settingService.GetSubCategoryAsync(new GetAllSubCategoryCriteria { Active = SettingConstants.ActiveAndInactive });

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
            var languages = await settingService.GetAllLanguageAsync(new GetAllLanguageCriteria
            {
                Active = SettingConstants.ActiveAndInactive
            });
            var languagesActive = languages.Where(x => x.IsActive).ToList();

            languagesActive.Insert(
                0,
                new Setting
                {
                    Id = 0,
                    Name = ViewResources.Symbol_NA,
                    IsActive = true
                });

            var countries = await settingService.GetAllCountryAsync(new GetAllCountryCriteria
            {
                Active = SettingConstants.ActiveAndInactive
            });
            var countriesList = countries.ToList();

            countriesList.Insert(
                0,
                new Country
                {
                    Id = 0,
                    Name = ViewResources.Symbol_NA,
                    IsActive = true
                });

            var statusList = await settingService.GetAllStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusListRemoveDelete = statusList.Where(s => s.Id != (int)CRMStatus.Deleted).ToList();
            var communicationToolList = await settingService.GetAllCommunicationToolAsync();
            var productList = await settingService.GetProductAsync();
            var roles = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Role);
            var responses = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Response);
            var mainCategoryList = await settingService.GetMainCategoryAsync(new GetAllMainCategoryCriteria { Active = SettingConstants.ActiveAndInactive });
            var subCategoryList = await settingService.GetSubCategoryAsync(new GetAllSubCategoryCriteria { Active = SettingConstants.ActiveAndInactive });
            var subproduct = await settingService.GetSubProductAsync(new SubProductCriteria { Active = SettingConstants.Active });
            var extentionList = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Extension);
            var bettype = await settingService.GetAllBetTypeAsync(new GetAllBetTypeCriteria { Active = SettingConstants.Active });

            var settings = new
            {
                CommunicationToolList = communicationToolList.Where(x => x.IsActive),
                ProductList = productList.Where(x => x.IsActive),
                Roles = roles.Where(x => x.IsActive) ,
                Responses = responses.Where(x => x.IsActive),
                MainCategoryList = mainCategoryList.Where(x => x.IsActive),
                SubCategoryList = subCategoryList.Where(x => x.IsActive),
                SubProductList = subproduct.Where(x => x.IsActive).Select(p =>
                {
                    p.Name = p.Value;
                    return p;
                }).ToList(),
                CountryList = countriesList.Where(x => x.IsActive),
                LanguageList = languagesActive.Where(x => x.IsActive),
                ExtensionList = extentionList.Where(x => x.IsActive),
                StatusList = statusListRemoveDelete,
                BettypeList = bettype.Where(x => x.IsActive)
            };

            return Json(settings);
        }

        public async Task<IActionResult> GetFeedbackById(GetFeedbackByIdCriteria criteria)
        {
            CustomerFeedback feedback = await feedbackService.GetFeedbackById(criteria);
            return Json(feedback);
        }
    }
}
