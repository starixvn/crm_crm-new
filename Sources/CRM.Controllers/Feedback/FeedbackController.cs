namespace CRM.Controllers.Feedback;

using Constants;
using CRM.Criteria.Customer;
using CRM.Criteria.Feedback;
using CRM.Models.Customer;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Customer;
using CRM.Services.Feedback;
using CRM.ViewModels.Feedback;
using Enumerables;
using Fanex.Logging.Extensions;
using Fanex.NAP.Client;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Fanex.NAP.Client.Helpers.Business.Constant;
using FeedbackStatus = Enumerables.FeedbackStatus;

public class FeedbackController(
    INapSession napSession,
    ISettingService settingService,
    IFeedbackService feedbackService,
    ITicketRefService ticketRefService,
    ICRMLogService logService,
    IPermissionService permissionService,
    ICustomerService customerService,
    IBaseService baseService)
    : BaseController
{
    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
    public async Task<IActionResult> GetNoOfInquiryByFeedbackId(int id)
    {
        var feedback = await feedbackService.GetNoOfInquiryByFeedbackIdAsync(id);
        return Json(feedback);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
    public async Task<IActionResult> EditNoOfInquiry([FromBody] EditNoOfInquiryCommand command)
    {
        command.UserId = napSession.UserId;
        command.IP = ClientIP;
        var commandResult = await feedbackService.EditNoOfInquiryAsync(command);
        return Json(commandResult);
    }

    public async Task<IActionResult> GetCustomerFeedbackById(int id)
    {
        var feedback = await feedbackService.GetCustomerFeedbackByIdAsync(id);
        if (feedback is not null && feedback.CustId != 0)
        {
            if (feedback.RelatedCustomers is not null && feedback.RelatedCustomers.Any())
            {
                await VerifyCustomerByUsernames(feedback.RelatedCustomers);
            }
            var custPermissionInfo = await customerService.GetSiteTypeByCustIdAsync(feedback.CustId);
            feedback.CustomerType = custPermissionInfo.CustomerType;
        }
        var isDeletedFeedbackView = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.DeleteFeedback, Policy.Host);
        var settings = await GetEditCustomerFeedbackSettingAsync(feedback, isDeletedFeedbackView);
        var hasReviewFeedbackPermission = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);
        return Json(new { feedback, settings, hasReviewFeedbackPermission });
    }

    private async Task VerifyCustomerByUsernames(IEnumerable<RelatedCustomerPermission> customers)
    {
        var criteria = new VerifyRelatedCustomerCriteria
        {
            Username = string.Join(",", customers.Select(x => x.Username)),
            LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync(),
            SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync()
        };
        var verifiedCustomers = await baseService.GetDataAsync<RelatedCustomerPermission>(criteria);
        foreach (var cust in customers)
        {
            var customer = verifiedCustomers.FirstOrDefault(x => x.CustId == cust.CustId);
            cust.IsAuthorized = customer is { IsAuthorized: true };
        }
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
    public async Task<IActionResult> EditCustomerOldFeedback([FromBody] EditCustomerFeedbackCommand command)
    {
        var commandResult = await CheckEditCustomerFeedbackPermission(command.UpdateReviewedMode, command.IsDeletedFeedbackView, command.StatusId);
        if (commandResult.IsSuccessful)
        {
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            if (command.IsReviewed)
            {
                command.ReviewerId = napSession.UserId;
            }
            else
            {
                command.Review = string.Empty;
            }

            commandResult = await feedbackService.EditCustomerFeedbackAsync(command);

            var logMessage = new LogMessage("Update Feedback Params:")
                .AddMessage(JsonConvert.SerializeObject(command, Formatting.Indented))
                .ToString();
            logService.LogInformation(logMessage);
        }

        return Json(commandResult);
    }

    [HttpPost]
    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedback, Policy = Policy.Host)]
    public async Task<IActionResult> EditCustomerNewManualFeedback([FromBody] EditCustomerNewManualFeedbackCommand command)
    {
        var commandResult = await CheckEditCustomerFeedbackPermission(command.UpdateReviewedMode, command.IsDeletedFeedbackView, command.StatusID);
        if (commandResult.IsSuccessful)
        {
            command.UserID = napSession.UserId;
            command.IP = ClientIP;
            if (command.IsReviewed)
            {
                command.ReviewerId = napSession.UserId;
            }
            else
            {
                command.Review = string.Empty;
            }

            commandResult = await feedbackService.EditCustomerNewManualFeedbackAsync(command);

            var logMessage = new LogMessage("Update Feedback Params:")
                .AddMessage(JsonConvert.SerializeObject(command, Formatting.Indented))
                .ToString();
            logService.LogInformation(logMessage);
        }

        return Json(commandResult);
    }

    public async Task<int> CheckFeedbackDuplication([FromBody] CheckFeedbackDuplicationCriteria criteria)
    {
        await feedbackService.CheckFeedbackDuplicationAsync(criteria);
        return criteria.FeedbackId;
    }

    public async Task<ActionResult> GetTicketInfoByRefNo(long refNo)
    {
        const string autoGenerated = "<span style=\"color: rgb(255, 0, 0);\">This is an auto-generated entry.</span>";
        var tickets = await ticketRefService.GetTicketByRefNoAsync(refNo);
        if (tickets.ErrorCode == "0")
        {
            tickets.Description = autoGenerated + "<br /><br />" + tickets.Description;
        }
        return Json(tickets);
    }

    public async Task<string> GetBalanceUpday()
    {
        var balanceDay = await ticketRefService.GetBalanceUpdayAsync();
        var balanceDayFormat = balanceDay.ToString("MM/dd/yyyy");
        return balanceDayFormat;
    }

    private async Task<CommandResult> CheckEditCustomerFeedbackPermission(byte updateReviewedMode,
        bool isDeletedFeedbackView,
        int statusId)
    {
        var commandResult = new CommandResult { Code = 0 };
        var isReadCustInfo = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Credit) ||
                             await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.Licensee);
        var isHostCreateFeedback = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback, Policy.Host);
        var isHostReviewFeedback = await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.ReviewFeedback, Policy.Host);

        if (!isReadCustInfo || !isHostCreateFeedback)
        {
            commandResult = new CommandResult
            {
                Code = 1,
                Message = ViewResources.DoNotEditFeedbackPermission
            };
        }

        if ((updateReviewedMode != (byte)ReviewFeedbackMode.NotUpdate && !isHostReviewFeedback))
        {
            commandResult = new CommandResult
            {
                Code = 1,
                Message = ViewResources.NoReviewPermission
            };
        }

        if (await IsNoPermissionDeleteFeedback(isDeletedFeedbackView, statusId))
        {
            commandResult = new CommandResult
            {
                Code = 1,
                Message = ViewResources.DoNotDeleteFeedbackPermission
            };
        }

        return commandResult;
    }

    private async Task<bool> IsNoPermissionDeleteFeedback(bool isDeletedFeedbackView, int statusId)
    {
        var isChangedStatusFromDeleted = isDeletedFeedbackView && statusId != (int)FeedbackStatus.Deleted;
        var isChangedStatusToDeleted = !isDeletedFeedbackView && statusId == (int)FeedbackStatus.Deleted;
        return !await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.CreateUpdateFeedback)
               && (isChangedStatusFromDeleted || isChangedStatusToDeleted);
    }

    private async Task<CreateFeedbackViewModel> GetEditCustomerFeedbackSettingAsync(CustomerFeedback feedback, bool isDeletedFeedbackView = false)
    {
        var licenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();

        var feedbackSettings = feedback.Settings;
        var extensionTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension);
        var communicationToolsTask = settingService.GetCommunicationToolAsync(isIncludeNA: true);
        var productsTask = settingService.GetProductAsync();
        var subProductsTask = settingService.GetSubProductAsync();
        var betTypesTask = settingService.GetBetTypeAsync();
        var responsesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response);
        var languagesTask = settingService.GetLanguageAsync(isIncludeNA: true);
        var rolesTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role);
        var countriesTask = settingService.GetCountryAsync(isIncludeNA: true);
        var mainCategoriesTask = GetMainCategoryAsync(feedbackSettings);
        var statusesTask = GetStatusAsync(isDeletedFeedbackView);
        var licenseeTypesTask = settingService.GetLicenseeTypeAsync();
        var titleTask = settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Title, SettingConstants.Active);
        var sitesTask = settingService.GetAllSitesWithGroupAsync(licenseeType: licenseeType);
        var subCategoriesTask = GetSubCategoryAsync(feedbackSettings);

        await Task.WhenAll(extensionTask, communicationToolsTask, productsTask, subProductsTask, betTypesTask, responsesTask,
            languagesTask, rolesTask, countriesTask, mainCategoriesTask, statusesTask, licenseeTypesTask, titleTask, sitesTask, subCategoriesTask);

        var settings = new CreateFeedbackViewModel
        {
            Extensions = GetExtensions(extensionTask.Result, feedbackSettings),
            CommunicationTools = GetCommunicationTools(communicationToolsTask.Result, feedbackSettings),
            Responses = responsesTask.Result.Where(x => x.IsActive || x.Id == feedback.ResponseId).ToList(),
            Languages = languagesTask.Result.Where(x => x.IsActive || x.LanguageId == feedback.LanguageId).ToList(),
            Statuses = statusesTask.Result,
            Roles = rolesTask.Result.Where(x => x.IsActive || x.Id == feedback.RoleId).ToList(),
            Countries = countriesTask.Result.Where(x => x.IsActive || x.Id == feedback.CountryId).ToList(),
            Titles = titleTask.Result,
            LicenseeTypes = licenseeTypesTask.Result,
            Sites = sitesTask.Result,
            MainCategories = mainCategoriesTask.Result,
            SubCategories = subCategoriesTask.Result,
            Products = GetProducts(productsTask.Result, feedbackSettings),
            SubProducts = GetSubProducts(subProductsTask.Result, feedbackSettings),
            Bettypes = GetBetTypes(betTypesTask.Result, feedbackSettings),
            ProductNA = productsTask.Result.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.ProductNA),
            SubProductNA = subProductsTask.Result.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.SubProductNA),
            BettypeNA = betTypesTask.Result.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.BettypeNA),
            ExtensionNA = extensionTask.Result.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.ExtentionNA),
            CommunicationToolNA = communicationToolsTask.Result.FirstOrDefault(x => x.IsActive && x.Id == NAConstants.CommunicationNA)
        };

        return settings;
    }

    private static IList<FeedbackSettingRelation> GetFeedbackSettingByType(IEnumerable<FeedbackSettingRelation> settings, string settingType)
        => settings.Where(y => y.SettingType.Equals(settingType, StringComparison.OrdinalIgnoreCase)).ToList();

    private static IList<SettingRelation> GetExtensions(IEnumerable<SettingRelation> extensions,
        IEnumerable<FeedbackSettingRelation> settings)
    {
        var feedbackSettings = GetFeedbackSettingByType(settings, "Station");
        return extensions.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SettingId == x.Id))
                                     && x.Id != NAConstants.ExtentionNA).ToList();
    }

    private static IList<Setting> GetCommunicationTools(IEnumerable<Setting> communicationTools, IEnumerable<FeedbackSettingRelation> settings)
    {
        var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.CommunicationTool);
        return communicationTools.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SettingId == x.Id))
                                             && x.Id != NAConstants.CommunicationNA).ToList();
    }

    private async Task<IList<Models.Setting.FeedbackStatus>> GetStatusAsync(bool isDeletedFeedbackView = false)
    {
        var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);

        if (!isDeletedFeedbackView
            || !await permissionService.IsHavingPermissionByPolicyAsync(FunctionKey.DeleteFeedback, Policy.Host))
        {
            return statuses.Where(x => x.StatusId != (int)FeedbackStatus.Deleted).ToList();
        }

        return statuses.ToList();
    }

    private async Task<IList<Setting>> GetMainCategoryAsync(IEnumerable<FeedbackSettingRelation> settings)
    {
        var feedbackSettings = GetFeedbackSettingByType(settings, "Category");
        var mainCategories = await settingService.GetMainCategoryAsync();
        return mainCategories.Where(x => x.IsActive || feedbackSettings.Any(y => y.SettingId == x.MainCategoryID)).ToList();
    }

    private async Task<IList<Setting>> GetSubCategoryAsync(IEnumerable<FeedbackSettingRelation> settings)
    {
        var feedbackSettings = GetFeedbackSettingByType(settings, "Category");
        var subCategories = await settingService.GetSubCategoryAsync();
        return subCategories.Where(x => x.IsActive || feedbackSettings.Any(y => y.SubSettingId == x.SubCategoryId)).ToList();
    }

    private static IList<Product> GetProducts(IEnumerable<Product> products, IEnumerable<FeedbackSettingRelation> settings)
    {
        var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
        return products.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SettingId == x.Id))
                                   && x.Id != NAConstants.ProductNA).ToList();
    }

    private static IList<Product> GetSubProducts(IEnumerable<Product> subProducts, IEnumerable<FeedbackSettingRelation> settings)
    {
        var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
        return subProducts.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SubSettingId == x.Id))
                                      && x.Id != NAConstants.SubProductNA).ToList();
    }

    private static IList<Product> GetBetTypes(IEnumerable<Product> betTypes, IEnumerable<FeedbackSettingRelation> settings)
    {
        var feedbackSettings = GetFeedbackSettingByType(settings, SettingTypeConstants.Product);
        return betTypes.Where(x => (x.IsActive || feedbackSettings.Any(y => y.SubSettingIdLevel3 == x.Id))
                                   && x.Id != NAConstants.BettypeNA).ToList();
    }
}