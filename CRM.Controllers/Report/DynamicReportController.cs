namespace CRM.Controllers.Report
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Core.Filters;
    using CRM.Criteria.Report.DynamicReport;
    using CRM.Services;
    using CRM.Services.Report.DynamicReport;
    using CRM.ViewModels.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Core.Business.Constant;

    [CrmPermission(FunctionKey = FunctionKey.DynamicReport, Policy = Policy.Read)]
    public class DynamicReportController : BaseController
    {
        private readonly ISettingService settingService;
        private readonly IDynamicReportService dynamicReportService;

        public DynamicReportController(
            ISettingService settingService,
            IDynamicReportService dynamicReportService
        )
        {
            this.settingService = settingService;
            this.dynamicReportService = dynamicReportService;
        }

        public IActionResult Index()
        {
            return View("../Report/Dynamic/Index");
        }

        public async Task<IActionResult> GetDynamicReport([FromBody] GetDynamicReportCriteria criteria)
        {
            var logs = await dynamicReportService.GetDynamicReportAsync(criteria);
            var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            return Json(new { data = logs, mainCategories });
        }

        public async Task<IActionResult> GetAllSettings()
        {
            var products = await settingService.GetProductAsync(SettingConstants.Active);
            var subproducts = await settingService.GetSubProductAsync(active: SettingConstants.Active);
            var roles = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role);
            var statuses = await settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool);
            var extentions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);

            var allSettings = new CreateFeedbackViewModel
            {
                CommunicationTools = await settingService.GetCommunicationToolAsync(SettingConstants.Active, true),
                Extensions = extentions.Where(x => x.Id != NAConstants.ExtentionNA),
                MainCategories = await settingService.GetMainCategoryAsync(SettingConstants.Active),
                SubCategories = await settingService.GetSubCategoryAsync(active: SettingConstants.Active),
                Products = products.Where(x => x.Id != NAConstants.ProductNA),
                SubProducts = subproducts.Where(x => x.Id != NAConstants.SubProductNA),
                Responses = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active),
                Roles = roles.Where(x => x.IsActive),
                Sites = await settingService.GetAllSitesWithGroupAsync(),
                Statuses = statuses.Where(s => s.StatusId != (int)FeedbackStatus.Deleted),
                PeriodTypes = settingService.GetAllPeriodTypes()
            };
            return Json(allSettings);
        }
    }
}
