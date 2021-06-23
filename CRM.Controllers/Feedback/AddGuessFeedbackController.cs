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
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using System.Linq;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

    public class AddGuessFeedbackController : BaseController
    {
        private readonly IFeedbackService feedbackService;
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;

        public AddGuessFeedbackController(
            IFeedbackService feedbackService,
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService)
        {
            this.feedbackService = feedbackService;
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

        [HttpPost]
        public ActionResult AllSetting()
        {
            var settings = AllSettingToAddFeedback(UserRole.NormalStaff);
            var isHost = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            if (isHost)
            {
                settings.StatusList = settings.StatusList.Where(s => !s.Name.Equals("Deleted", System.StringComparison.OrdinalIgnoreCase));
            }

            return Json(settings);
        }

        public async Task<AllSettingToAddFeedback> AllSettingToAddFeedback(UserRole userRole)
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
            var countrieActive = countries.Where(x => x.IsActive).ToList();

            countrieActive.Insert(
                0,
                new Country
                {
                    Id = 0,
                    Name = ViewResources.Symbol_NA,
                    IsActive = true
                });

            var statusList = await settingService.GetAllStatusAsync(ViewTypeConstants.CommunicationTool)
                                        .Where(s => s.Id != (int)CRMStatus.Deleted).ToList();
            var settings = new AllSettingToAddFeedback
            {
                ExtensionList = ServiceSetting.GetAllExtensions(),
                CountryList = countries.Where(x => x.IsActive),
                ProvinceList = ServiceSetting.GetAllProvinces(),
                CommunicationToolList = ServiceSetting.GetAllCommunicationTools().Where(x => x.IsActive),
                LanguageList = languages.Where(x => x.IsActive),
                SiteList = (userRole == UserRole.CN88Staff) ? ServiceSetting.GetAllSiteWithGroupCN88() : ServiceSetting.GetAllSiteWithGroup(),
                ResponseList = ServiceSetting.GetAllResponses().Where(x => x.IsActive),
                StatusList = statusList,
                TitleList = ServiceSetting.GetAllTitles().Where(x => x.IsActive),
                LicenseeType = ServiceSetting.GetAllLicenseeTypes(),
                ProductNA = ServiceSetting.GetProductNA(),
                SubProductNA = ServiceSetting.GetSubProductNA(),
                BettypeNA = ServiceSetting.GetBettypeNA(),
                ExtensionNA = ServiceSetting.GetExtensionNA(),
                ProductList = ServiceSetting.GetProducts().Where(x => x.IsActive),
                SubProductList = ServiceSetting.GetSubProducts().Where(x => x.IsActive),
                BettypeList = ServiceSetting.GetBettypes().Where(x => x.IsActive),
                MainCategoryList = ServiceSetting.GetMainCategories().Where(x => x.IsActive),
                SubCategoryList = ServiceSetting.GetSubCategories().Where(x => x.IsActive),
            };

            return settings;
        }
    }
}
