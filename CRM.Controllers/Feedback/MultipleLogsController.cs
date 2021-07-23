namespace CRM.Controllers.Feedback
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Core.Models;
    using CRM.Core.Services;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models.Feedback.MultipleLogs;
    using CRM.Resources;
    using CRM.Services;
    using CRM.ViewModels.Feedback;
    using Fanex.NAP.Client.Helpers.Web;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.CreateUpdateFeedbackAndCustomerInfo, Policy = Policy.Host)]
    public class MultipleLogsController : BaseController
    {
        private readonly INapSession napSession;
        private readonly IBaseService baseService;
        private readonly ISettingService settingService;

        public MultipleLogsController(
            INapSession napSession,
            IBaseService baseService,
            ISettingService settingService)
        {
            this.napSession = napSession;
            this.baseService = baseService;
            this.settingService = settingService;
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMultipleLogsCommand command)
        {
            command.CreatorId = napSession.UserId;
            command.UserId = napSession.UserId;
            command.IP = ClientIP;
            CommandResult commandResult = await baseService.ExecuteNonQueryAsync(command);
            return Json(commandResult);
        }

        public async Task<IActionResult> GetSettings()
        {
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var products = await settingService.GetProductAsync(SettingConstants.Active);
            var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var settings = new CreateFeedbackViewModel
            {
                Extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
                CommunicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active),
                Statuses = statuses.Where(x => x.StatusId != (int)Core.Enumerables.FeedbackStatus.Deleted),
                Responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
                Languages = await settingService.GetLanguageAsync(SettingConstants.Active, true),
                Countries = await settingService.GetCountryAsync(SettingConstants.Active, true),
                MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
                Products = products.Where(x => x.Id != NAConstants.ProductNA),
                SubProducts = subproducts.Where(x => x.Id != NAConstants.SubProductNA),
                Bettypes = bettypes.Where(x => x.Id != NAConstants.BettypeNA),
                ProductNA = products.FirstOrDefault(x => x.Id == NAConstants.ProductNA),
                SubProductNA = subproducts.FirstOrDefault(x => x.Id == NAConstants.SubProductNA),
                BettypeNA = bettypes.FirstOrDefault(x => x.Id == NAConstants.BettypeNA),
                ExtensionNA = extentions.FirstOrDefault(x => x.Id == NAConstants.ExtentionNA)
            };

            return Json(settings);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyCustomer([FromBody] VerifyCustomerCriteria criteria)
        {
            var customers = await baseService.GetDataAsync<VerifyCustomerResult>(criteria);
            return Json(customers);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyRelatedCustomer([FromBody] VerifyRelatedCustomerCriteria criteria)
        {
            var customers = await baseService.GetDataAsync<VerifyRelatedCustomerResult>(criteria);
            return Json(customers);
        }

        [HttpPost]
        public async Task<IActionResult> CheckNotExistCommunicationToolSetting([FromBody] CheckNotExistCommunicationToolSettingCriteria criteria)
        {
            var customers = await baseService.GetDataAsync<VerifyCommunicationToolSetting>(criteria);
            return Json(customers);
        }
    }
}