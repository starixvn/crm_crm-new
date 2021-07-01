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
                settings.StatusList = settings.StatusList.Where(s => !s.SettingName.Equals("Deleted", StringComparison.OrdinalIgnoreCase));
            }

            return Json(settings);
        }

        public async Task<AllSettingToAddFeedback> AllSettingToAddFeedback()
        {
            try
            {

                var languages = await settingService.GetAllLanguageAsync(new GetAllLanguageCriteria
                {
                    Active = SettingConstants.Active
                });
                var languagesList = languages.ToList();

                languagesList.Insert(
                    0,
                    new Setting
                    {
                        SettingId = 0,
                        SettingName = ViewResources.Symbol_NA,
                        IsActive = true
                    });

                var countries = await settingService.GetAllCountryAsync(new GetAllCountryCriteria
                {
                    Active = SettingConstants.Active
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

                var extentionList = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Extension, SettingConstants.Active);
                var extentionListRemmoveNA = extentionList.Where(x => x.Id != NAConstants.ExtentionNA);
                var extentionNA = extentionList.FirstOrDefault(s => s.Id == NAConstants.ExtentionNA);

                var statusList = await settingService.GetAllStatusAsync(ViewTypeConstants.CommunicationTool);
                var statusListRemoveDelete = statusList.Where(s => s.Id != (int)CRMStatus.Deleted).ToList();
              
                var ProvinceList = await settingService.GetAllProvinceAsync(new GetAllProvinceCriteria());

                var communicationToolList = await settingService.GetAllCommunicationToolAsync(SettingConstants.Active);

                var siteList = await settingService.GetAllSiteAsync();

                var responsesLists = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Response, SettingConstants.Active);

                var titleList = await settingService.GetAllSettingRelationsByName(SettingTypeConstants.Title, SettingConstants.Active);

                var licenseeTypeList = await settingService.GetAllLicenseeTypeAsync();

                var productList = await settingService.GetProductAsync(SettingConstants.Active);
                var productListRemoveNAAndActive = productList.Where(p => p.Id != NAConstants.ProductNA);
                var productNA = productList.FirstOrDefault(p => p.Id == NAConstants.ProductNA);

                var subproduct = await settingService.GetSubProductAsync(new SubProductCriteria { Active = SettingConstants.Active });
                var subproductRemoveNA = subproduct.Where(p => p.Id != NAConstants.SubProductNA);
                var subproductNA = subproduct.FirstOrDefault(s => s.Id == NAConstants.SubProductNA);

                var bettype = await settingService.GetAllBetTypeAsync(new GetAllBetTypeCriteria { Active = SettingConstants.Active });
                var bettypeRemoveNAAndActive = bettype.Where(b => b.Id != NAConstants.BettypeNA);
                var bettypeNA = bettype.FirstOrDefault(b => b.Id == NAConstants.BettypeNA);

                var mainCategoryList = await settingService.GetMainCategoryAsync(new GetAllMainCategoryCriteria { Active = SettingConstants.Active });
                var subCategoryList = await settingService.GetSubCategoryAsync(new GetAllSubCategoryCriteria { Active = SettingConstants.Active });

                var settings = new AllSettingToAddFeedback
                {
                    ExtensionList = extentionListRemmoveNA,
                    CountryList = countriesList,
                    ProvinceList = ProvinceList,
                    CommunicationToolList = communicationToolList,
                    LanguageList = languagesList,
                    SiteList = siteList,
                    ResponseList = responsesLists,
                    StatusList = statusListRemoveDelete,
                    TitleList = titleList,
                    LicenseeType = licenseeTypeList,
                    ProductNA = productNA,
                    SubProductNA = subproductNA,
                    BettypeNA = bettypeNA,
                    ExtensionNA = extentionNA,
                    ProductList = productListRemoveNAAndActive,
                    SubProductList = subproductRemoveNA,
                    BettypeList = bettypeRemoveNAAndActive,
                    MainCategoryList = mainCategoryList,
                    SubCategoryList = subCategoryList
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
