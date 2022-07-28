namespace CRM.Controllers.Feedback
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.AddFeedback;
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
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly INapSettings napSettings;
        private readonly IUserService userService;

        public AddGuestFeedbackController(
            INapSession napSession,
            ISettingService settingService,
            IBaseService baseService,
            INapSettings napSettings,
            IUserService userService)
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.baseService = baseService;
            this.napSettings = napSettings;
            this.userService = userService;
        }

        public async Task<ActionResult> AllSetting()
        {
            var hasCreateFeedbackPermission = userService.IsHavingPermission(napSession.UserId, napSettings.SiteId, FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy.Host);
            var languagesTask = settingService.GetLanguageAsync(SettingConstants.Active, true);
            var countriesTask = settingService.GetCountryAsync(SettingConstants.Active, true);
            var extentionsTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statusesTask = settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var communicationToolsTask = settingService.GetCommunicationToolAsync(SettingConstants.Active);
            var responsesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active);
            var titlesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active);
            var licenseeTypesTask = settingService.GetLicenseeTypeAsync();
            var productsTask = settingService.GetProductAsync(SettingConstants.Active);
            var subproductsTask = settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypesTask = settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var mainCategorysTask = settingService.GetMainCategoryAsync(SettingConstants.Active);
            var subCategorysTask = settingService.GetSubCategoryAsync(active: SettingConstants.Active);

            await Task.WhenAll(languagesTask, countriesTask, extentionsTask, statusesTask, communicationToolsTask, responsesTask, titlesTask, licenseeTypesTask,
                productsTask, subproductsTask, bettypesTask, mainCategorysTask, subCategorysTask);

            var extentionNA = extentionsTask.Result.FirstOrDefault(s => s.Id == NAConstants.ExtentionNA);
            var productNA = productsTask.Result.FirstOrDefault(p => p.Id == NAConstants.ProductNA);
            var subproductNA = subproductsTask.Result.FirstOrDefault(s => s.Id == NAConstants.SubProductNA);
            var bettypeNA = bettypesTask.Result.FirstOrDefault(b => b.Id == NAConstants.BettypeNA);


            var settings = new CreateFeedbackViewModel
            {
                Extensions = extentionsTask.Result.Where(x => x.Id != NAConstants.ExtentionNA),
                Countries = countriesTask.Result,
                CommunicationTools = communicationToolsTask.Result,
                Languages = languagesTask.Result,
                Responses = responsesTask.Result,
                Statuses = statusesTask.Result.Where(s => s.StatusId != (int)FeedbackStatus.Deleted),
                Titles = titlesTask.Result,
                LicenseeTypes = licenseeTypesTask.Result,
                ProductNA = productNA,
                SubProductNA = subproductNA,
                BettypeNA = bettypeNA,
                ExtensionNA = extentionNA,
                Products = productsTask.Result.Where(p => p.Id != NAConstants.ProductNA),
                SubProducts = subproductsTask.Result.Where(p => p.Id != NAConstants.SubProductNA && p.ParentId != 0),
                Bettypes = bettypesTask.Result.Where(b => b.Id != NAConstants.BettypeNA),
                MainCategories = mainCategorysTask.Result,
                SubCategories = subCategorysTask.Result
            };

            if (hasCreateFeedbackPermission)
            {
                settings.Statuses = settings.Statuses.Where(s => !s.Name.Equals("Deleted", System.StringComparison.OrdinalIgnoreCase));
            }

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