namespace CRM.Controllers.Feedback
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models.Feedback.MultipleLogs;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using CRM.ViewModels.Feedback.MultipleLogs;
    using Microsoft.AspNetCore.Mvc;

    public class MultipleLogsController : BaseController
    {
        private readonly IMultipleLogsService multipleLogsService;
        private readonly ISettingService settingService;

        public MultipleLogsController(
            IMultipleLogsService multipleLogsService,
            ISettingService settingService)
        {
            this.multipleLogsService = multipleLogsService;
            this.settingService = settingService;
        }

        public IActionResult Create()
        {
            return View();
        }

        public async Task<IActionResult> GetSettings()
        {
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var statues = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var products = await settingService.GetProductAsync(SettingConstants.Active);
            var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var bettypes = await settingService.GetBetTypeAsync(active: SettingConstants.Active);
            var settings = new CreateMultipleLogsViewModel
            {
                Extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
                CommunicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active),
                Provinces = await settingService.GetProvinceAsync(),
                Statuses = statues.Where(x => !string.Equals(x.Name, ViewResources.Deleted, StringComparison.OrdinalIgnoreCase)),
                Responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
                Languages = await settingService.GetLanguageAsync(SettingConstants.Active, true),
                Countries = await settingService.GetCountryAsync(SettingConstants.Active, true),
                Products = products.Where(x => x.Id != NAConstants.ProductNA),
                SubProducts = subproducts.Where(x => x.Id != NAConstants.SubProductNA),
                Bettypes = bettypes.Where(x => x.Id != NAConstants.BettypeNA),
                MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
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
            IEnumerable<VerifyCustomerResult> customers = await multipleLogsService.VerifyCustomerAsync(criteria);
            return Json(customers);
        }

        [HttpPost]
        public async Task<IActionResult> VerifyRelatedCustomer([FromBody] VerifyRelatedCustomerCriteria criteria)
        {
            IEnumerable<VerifyRelatedCustomerResult> customers = await multipleLogsService.VerifyRelatedCustomerAsync(criteria);
            return Json(customers);
        }

        [HttpPost]
        public async Task<IActionResult> CheckNotExistCommunicationToolSetting([FromBody] CheckNotExistCommunicationToolSettingCriteria criteria)
        {
            IEnumerable<VerifyCommunicationToolSetting> customers = await multipleLogsService.CheckNotExistCommunicationToolSettingAsync(criteria);
            return Json(customers);
        }
    }
}