namespace CRM.Controllers.Feedback
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Models.Feedback.AddGuessFeedback;
    using CRM.Services;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    public class AddGuestFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;

        public AddGuestFeedbackController(
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
                settings.StatusList = settings.StatusList.Where(s => !s.Name.Equals("Deleted", StringComparison.OrdinalIgnoreCase));
            }

            return Json(settings);
        }

        public async Task<AllSettingToAddFeedback> AllSettingToAddFeedback()
        {
            var languages = await settingService.GetLanguageAsync(SettingConstants.Active, true);
            var countries = await settingService.GetCountryAsync(SettingConstants.Active, true);

            var extentionList = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var extentionListRemmoveNA = extentionList.Where(x => x.Id != NAConstants.ExtentionNA);
            var extentionNA = extentionList.FirstOrDefault(s => s.Id == NAConstants.ExtentionNA);

            var statusList = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var statusListRemoveDelete = statusList.Where(s => s.StatusId != (int)CRMStatus.Deleted).ToList();

            var provinces = await settingService.GetProvinceAsync();

            var communicationToolList = await settingService.GetCommunicationToolAsync(SettingConstants.Active);

            var siteList = await settingService.GetSiteAsync();

            var responsesLists = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active);

            var titleList = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active);

            var licenseeTypeList = await settingService.GetLicenseeTypeAsync();

            var productList = await settingService.GetProductAsync(SettingConstants.Active);
            var productListRemoveNAAndActive = productList.Where(p => p.Id != NAConstants.ProductNA);
            var productNA = productList.FirstOrDefault(p => p.Id == NAConstants.ProductNA);

            var subproduct = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var subproductRemoveNA = subproduct.Where(p => p.Id != NAConstants.SubProductNA);
            var subproductNA = subproduct.FirstOrDefault(s => s.Id == NAConstants.SubProductNA);

            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var bettypeRemoveNAAndActive = bettypes.Where(b => b.Id != NAConstants.BettypeNA);
            var bettypeNA = bettypes.FirstOrDefault(b => b.Id == NAConstants.BettypeNA);

            var mainCategoryList = await settingService.GetMainCategoryAsync(SettingConstants.Active);
            var subCategoryList = await settingService.GetSubCategoryAsync(active: SettingConstants.Active);

            var settings = new AllSettingToAddFeedback
            {
                ExtensionList = extentionListRemmoveNA,
                CountryList = countries,
                ProvinceList = provinces,
                CommunicationToolList = communicationToolList,
                LanguageList = languages,
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
    }
}