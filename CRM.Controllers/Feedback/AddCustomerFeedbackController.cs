namespace CRM.Controllers.Feedback
{
    using System.Linq;
    using System.Threading.Tasks;
    using Core.Extensions.XML;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.AddFeedback;
    using CRM.Resources;
    using CRM.Services;
    using CRM.ViewModels.Feedback;
    using Fanex.Logging.Extensions;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
    public class AddCustomerFeedbackController : BaseController
    {
        private readonly INapSession napSession;
        private readonly ISettingService settingService;
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;
        private readonly ICRMLogService logService;
        private readonly IPermissionService permissionService;

        public AddCustomerFeedbackController(
            INapSession napSession,
            ISettingService settingService,
            IBaseService baseService,
            ICommonService commonService,
            ICRMLogService logService,
            IPermissionService permissionService)
        {
            this.napSession = napSession;
            this.settingService = settingService;
            this.baseService = baseService;
            this.commonService = commonService;
            this.logService = logService;
            this.permissionService = permissionService;
        }

        public async Task<ActionResult> AllSetting()
        {
            var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

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
            var rolesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role);
            var sitesTask = settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType);
            await Task.WhenAll(languagesTask, countriesTask, extentionsTask, statusesTask, communicationToolsTask, responsesTask,
                titlesTask, licenseeTypesTask, productsTask, subproductsTask, bettypesTask, mainCategorysTask, subCategorysTask, rolesTask, sitesTask);

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
                Roles = rolesTask.Result,
                Sites = sitesTask.Result,
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
            return Json(settings);
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
        public async Task<IActionResult> Create([FromBody] AddCustomerFeedbackCommand command)
        {
            try
            {
                CommandResult commandResult = await CheckAddCustomerFeedbackPermission();
                if (commandResult.IsSuccessful)
                {
                    command.CreatorId = napSession.UserId;
                    command.UserId = napSession.UserId;
                    command.IP = ClientIP;
                    command.FeedbackDate = commonService.ConvertToServerDateTime(command.FeedbackDate);
                    command.ResolutionDate = commonService.ConvertToServerDateTime(command.ResolutionDate);
                    command.IsCommunicationLog = false;
                    command.NewCommunicationTools = command.IsHeadline ? XMLNewHeadlineCommunicationTools(command) : XMLNewNormalCommunicationTools(command);
                    var result = await baseService.ExecuteNonQueryAsync(command);
                    var logMessage = new LogMessage("Add Customer Feedback Params:")
                       .AddMessage(JsonConvert.SerializeObject(command, Formatting.Indented))
                       .ToString();
                    logService.LogInformation(logMessage);
                    return Json(result);
                }

                return Json(commandResult);
            }
            catch (System.Exception ex)
            {
                await logService.ErrorAsync(ex, command);
                return Json(new CommandResult
                {
                    Code = 1,
                    Message = ex.Message
                });
            }
        }

        private static string XMLNewHeadlineCommunicationTools(AddCustomerFeedbackCommand command) => command.HeadlineStaffInfoCommunications.Any() ?
            command.HeadlineStaffInfoCommunications.ToXML("ROOT").ToString() : string.Empty;

        private static string XMLNewNormalCommunicationTools(AddCustomerFeedbackCommand command) => command.OtherAccountCommunicationInfos.Any() ?
            command.OtherAccountCommunicationInfos.ToXML("ROOT").ToString() : string.Empty;

        private async Task<CommandResult> CheckAddCustomerFeedbackPermission()
        {
            var hasCreateFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback);
            var commandResult = new CommandResult { Code = 0 };
            if (!hasCreateFeedbackPermission)
            {
                commandResult = new CommandResult
                {
                    Code = 1,
                    Message = ViewResources.DoNotEditFeedbackPermission
                };
            }

            return commandResult;
        }
    }
}