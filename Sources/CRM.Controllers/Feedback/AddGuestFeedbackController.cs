namespace CRM.Controllers.Feedback;

using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Feedback.AddFeedback;
using CRM.Services;
using CRM.ViewModels.Feedback;
using Enum;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

[CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
public class AddGuestFeedbackController(
    INapSession napSession,
    ISettingService settingService,
    IBaseService baseService,
    ICommonService commonService,
    IPermissionService permissionService)
    : BaseController
{
    public async Task<ActionResult> AllSetting()
    {
        var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

        var subProductsTask = settingService.GetSubProductAsync(active: SettingConstants.Active);
        var betTypesTask = settingService.GetBetTypeAsync(active: SettingConstants.Active);
        var mainCategoriesTask = settingService.GetMainCategoryAsync(SettingConstants.Active);
        var subCategoriesTask = settingService.GetSubCategoryAsync(active: SettingConstants.Active);
        var communicationToolsTask = settingService.GetCommunicationToolAsync(SettingConstants.Active);
        var responsesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active);
        var titlesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active);
        var licenseeTypesTask = settingService.GetLicenseeTypeAsync();
        var hasCreateFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback);
        var languagesTask = settingService.GetLanguageAsync(SettingConstants.Active, true);
        var countriesTask = settingService.GetCountryAsync(SettingConstants.Active, true);
        var extensionsTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
        var statusesTask = settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
        var productsTask = settingService.GetProductAsync(SettingConstants.Active);
        var sitesTask = settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType);

        await Task.WhenAll(languagesTask, countriesTask, extensionsTask, statusesTask, communicationToolsTask, responsesTask, titlesTask, licenseeTypesTask,
            productsTask, subProductsTask, betTypesTask, mainCategoriesTask, subCategoriesTask, sitesTask);

        var extensionNA = extensionsTask.Result.FirstOrDefault(s => s.Id == NAConstants.ExtentionNA);
        var productNA = productsTask.Result.FirstOrDefault(p => p.Id == NAConstants.ProductNA);
        var subProductNA = subProductsTask.Result.FirstOrDefault(s => s.Id == NAConstants.SubProductNA);
        var betTypeNA = betTypesTask.Result.FirstOrDefault(b => b.Id == NAConstants.BettypeNA);

        var settings = new CreateFeedbackViewModel
        {
            Extensions = extensionsTask.Result.Where(x => x.Id != NAConstants.ExtentionNA),
            Countries = countriesTask.Result,
            CommunicationTools = communicationToolsTask.Result,
            Languages = languagesTask.Result,
            Responses = responsesTask.Result,
            Statuses = statusesTask.Result.Where(s => s.StatusId != (int)FeedbackStatus.Deleted),
            Titles = titlesTask.Result,
            LicenseeTypes = licenseeTypesTask.Result,
            Sites = sitesTask.Result,
            ProductNA = productNA,
            SubProductNA = subProductNA,
            BettypeNA = betTypeNA,
            ExtensionNA = extensionNA,
            Products = productsTask.Result.Where(p => p.Id != NAConstants.ProductNA),
            SubProducts = subProductsTask.Result.Where(p => p.Id != NAConstants.SubProductNA && p.ParentId != 0),
            Bettypes = betTypesTask.Result.Where(b => b.Id != NAConstants.BettypeNA),
            MainCategories = mainCategoriesTask.Result,
            SubCategories = subCategoriesTask.Result
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