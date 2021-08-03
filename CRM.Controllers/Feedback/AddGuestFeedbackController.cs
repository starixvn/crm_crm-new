namespace CRM.Controllers.Feedback
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.AddGuestFeedback;
    using CRM.Services;
    using CRM.ViewModels.Feedback;
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Helpers.Web;
    using Fanex.NAP.Client.Services;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
    public class AddGuestFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;

        public AddGuestFeedbackController(
            INapSession napSession,
            INapSettings napSettings,
            IUserService userService,
            ISettingService settingService,
            IBaseService baseService)
        {
            this.napSession = napSession;
            this.napSettings = napSettings;
            this.userService = userService;
            this.settingService = settingService;
            this.baseService = baseService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<ActionResult> AllSetting()
        {
            var languages = await settingService.GetLanguageAsync(SettingConstants.Active, true);
            var countries = await settingService.GetCountryAsync(SettingConstants.Active, true);
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var extentionNA = extentions.FirstOrDefault(s => s.Id == NAConstants.ExtentionNA);
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var communicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active);
            var responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active);
            var titles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active);
            var licenseeTypes = await settingService.GetLicenseeTypeAsync();
            var products = await settingService.GetProductAsync(SettingConstants.Active);
            var productNA = products.FirstOrDefault(p => p.Id == NAConstants.ProductNA);
            var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var subproductNA = subproducts.FirstOrDefault(s => s.Id == NAConstants.SubProductNA);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var bettypeNA = bettypes.FirstOrDefault(b => b.Id == NAConstants.BettypeNA);
            var mainCategorys = await settingService.GetMainCategoryAsync(SettingConstants.Active);
            var subCategorys = await settingService.GetSubCategoryAsync(active: SettingConstants.Active);
            var settings = new CreateFeedbackViewModel
            {
                Extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
                Countries = countries,
                CommunicationTools = communicationTools,
                Languages = languages,
                Responses = responses,
                Statuses = statuses.Where(s => s.StatusId != (int)FeedbackStatus.Deleted),
                Titles = titles,
                LicenseeTypes = licenseeTypes,
                ProductNA = productNA,
                SubProductNA = subproductNA,
                BettypeNA = bettypeNA,
                ExtensionNA = extentionNA,
                Products = products.Where(p => p.Id != NAConstants.ProductNA),
                SubProducts = subproducts.Where(p => p.Id != NAConstants.SubProductNA && p.ParentId != 0),
                Bettypes = bettypes.Where(b => b.Id != NAConstants.BettypeNA),
                MainCategories = mainCategorys,
                SubCategories = subCategorys
            };

            return Json(settings);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddGuestFeedbackCommand command)
        {
            command.CreatorId = napSession.UserId;
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            var result = await baseService.ExecuteNonQueryAsync(command);
            return Json(result);
        }
    }
}