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
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
    public class AddGuestFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;
        private readonly IPermissionService permissionService;

        public AddGuestFeedbackController(
            INapSession napSession,
            ISettingService settingService,
            IBaseService baseService,
            ICommonService commonService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.baseService = baseService;
            this.commonService = commonService;
            this.permissionService = permissionService;
        }

        public async Task<ActionResult> AllSetting()
        {
            short licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

            var subproductsTask = settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypesTask = settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var mainCategorysTask = settingService.GetMainCategoryAsync(SettingConstants.Active);
            var subCategorysTask = settingService.GetSubCategoryAsync(active: SettingConstants.Active);
            var communicationToolsTask = settingService.GetCommunicationToolAsync(SettingConstants.Active);
            var responsesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active);
            var titlesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active);
            var licenseeTypesTask = settingService.GetLicenseeTypeAsync();
            var hasCreateFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback);
            var languagesTask = settingService.GetLanguageAsync(SettingConstants.Active, true);
            var countriesTask = settingService.GetCountryAsync(SettingConstants.Active, true);
            var extentionsTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statusesTask = settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var productsTask = settingService.GetProductAsync(SettingConstants.Active);
            var sitesTask = settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType);

            await Task.WhenAll(languagesTask, countriesTask, extentionsTask, statusesTask, communicationToolsTask, responsesTask, titlesTask, licenseeTypesTask,
                productsTask, subproductsTask, bettypesTask, mainCategorysTask, subCategorysTask, sitesTask);

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
                Sites = sitesTask.Result,
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
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> Create([FromBody] AddGuestFeedbackCommand command)
        {
            command.CreatorId = napSession.UserId;
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            command.FeedbackDate = commonService.ConvertToServerDateTime(command.FeedbackDate);
            command.ResolutionDate = commonService.ConvertToServerDateTime(command.ResolutionDate);
            command.FirstResponseTime = command.FirstResponseTime.HasValue ? commonService.ConvertToServerDateTime(command.FirstResponseTime.Value) : null;
            var result = await baseService.ExecuteNonQueryAsync(command);
            return Json(result);
        }
    }
}