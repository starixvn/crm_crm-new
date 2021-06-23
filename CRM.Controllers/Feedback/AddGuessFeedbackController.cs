namespace CRM.Controllers.Feedback
{
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Criteria.Setting;
    using CRM.Models;
    using CRM.Models.Feedback.AddGuessFeedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

    public class AddGuessFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;

        public AddGuessFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
        }
        public IActionResult Index()
        {
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            return View(isHost);
        }

        public async Task<ActionResult> AllSetting()
        {
            var settings = await AllSettingToAddFeedback();
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            if (isHost)
            {
                settings.StatusList = settings.StatusList.Where(s => !s.SettingName.Equals("Deleted", System.StringComparison.OrdinalIgnoreCase));
            }

            return Json(settings);
        }

        public async Task<AllSettingToAddFeedback> AllSettingToAddFeedback()
        {
            try
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
                var extentionList = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Extension);
                var extentionNA = extentionList.FirstOrDefault(s => s.Id == NAConstants.ExtentionNA);
                var ProvinceList = await settingService.GetAllProvinceAsync(new GetAllProvinceCriteria());
                var communicationToolList = await settingService.GetAllCommunicationToolAsync();
                var siteList = await settingService.GetAllSiteAsync();
                var responsesLists = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Response);
                var titleList = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Title);
                var licenseeTypeList = await settingService.GetAllLicenseeTypeAsync();
                var productList = await settingService.GetProductAsync();
                var productNA = productList.FirstOrDefault(p => p.Id == NAConstants.ProductNA);
                var subproduct = await settingService.GetSubProductAsync(new SubProductCriteria { Active = SettingConstants.Active });
                var subproductNA = subproduct.FirstOrDefault(s => s.Id == NAConstants.SubProductNA);
                var bettype = await settingService.GetAllBetTypeAsync(new GetAllBetTypeCriteria { Active = SettingConstants.Active });
                var bettypeNA = bettype.FirstOrDefault(s => s.Id == NAConstants.BettypeNA);
                var mainCategoryList = await settingService.GetMainCategoryAsync(new GetAllMainCategoryCriteria { Active = SettingConstants.ActiveAndInactive });
                var subCategoryList = await settingService.GetSubCategoryAsync(new GetAllSubCategoryCriteria { Active = SettingConstants.ActiveAndInactive });

                var settings = new AllSettingToAddFeedback
                {
                    ExtensionList = extentionList,
                    CountryList = countriesList.Where(x => x.IsActive),
                    ProvinceList = ProvinceList,
                    CommunicationToolList = communicationToolList.Where(x => x.IsActive),
                    LanguageList = languages.Where(x => x.IsActive),
                    SiteList = siteList,
                    ResponseList = responsesLists.Where(x => x.IsActive),
                    StatusList = statusListRemoveDelete,
                    TitleList = titleList.Where(x => x.IsActive),
                    LicenseeType = licenseeTypeList,
                    ProductNA = productNA,
                    SubProductNA = subproductNA,
                    BettypeNA = bettypeNA,
                    ExtensionNA = extentionNA,
                    ProductList = productList.Where(x => x.IsActive),
                    SubProductList = subproduct.Where(x => x.IsActive),
                    BettypeList = bettype.Where(x => x.IsActive),
                    MainCategoryList = mainCategoryList.Where(x => x.IsActive),
                    SubCategoryList = subCategoryList.Where(x => x.IsActive)
                };

                return settings;
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
