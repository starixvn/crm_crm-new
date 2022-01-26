namespace CRM.Controllers.Report.Statistics
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Criteria.Report.LogStatistics;
    using CRM.Services;
    using CRM.Services.Report.LogStatistics;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;

    public class LogStatisticsController : Controller
    {
        private readonly ILogStatisticsService logStatisticsService;
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        public LogStatisticsController(
            ILogStatisticsService logStatisticsService,
            ICommonService commonService,
            ISettingService settingService,
            IExportExcelService excelService
            )
        {
            this.logStatisticsService = logStatisticsService;
            this.commonService = commonService;
            this.settingService = settingService;
            this.excelService = excelService;
        }

        //[NapAuth(FunctionKey = FunctionKey.LogStatistics, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View("../Report/LogStatistics/Index");
        }

        public async Task<IActionResult> getAllSettings()
        {
            var products = await settingService.GetProductAsync();
            var mainCategories = await settingService.GetMainCategoryAsync();
            var communicationTools = await settingService.GetCommunicationToolAsync(2, true);
            return Json(new
            {
                products,
                mainCategories,
                communicationTools
            });
        }

        [HttpPost]
        //[NapAuth(FunctionKey = FunctionKey.LogStatistics, Policy = Constant.Policy.Read)]
        public async Task<IActionResult> GetMainReport([FromBody] LogStatisticsCriteria criteria)
        {
            var ibcReport = await logStatisticsService.GetReportDataAsync(new LogStatisticsCriteria
            {
                ProductId = criteria.ProductId,
                MainCategoryId = criteria.MainCategoryId,
                CommunicationId = criteria.CommunicationId,
                FromDate = criteria.FromDate,
                ToDate = criteria.ToDate,
                ProductType = LogStatisticConstants.ProductTypeDetails,
                CategoryType = LogStatisticConstants.SubCategory,
                SiteType = LogStatisticConstants.IBC
            });

            var licenseeReport = await logStatisticsService.GetReportDataAsync(new LogStatisticsCriteria
            {
                ProductId = criteria.ProductId,
                MainCategoryId = criteria.MainCategoryId,
                CommunicationId = criteria.CommunicationId,
                FromDate = criteria.FromDate,
                ToDate = criteria.ToDate,
                ProductType = LogStatisticConstants.ProductTypeDetails,
                CategoryType = LogStatisticConstants.SubCategory,
                SiteType = LogStatisticConstants.Licensee
            });
            return Json(new { ibcReport, licenseeReport });
        }

        [HttpPost]
        public async Task<IActionResult> GetReportDetails([FromBody] LogStatisticsDetailCriteria criteria)
        {
            var report = await logStatisticsService.GetReportDetailsAsync(criteria);
            var mainCategories = await settingService.GetAllMainSubCategoriesAsync();
            var communicationTools = await settingService.GetCommunicationToolAsync();
            var products = await settingService.GetProductAsync();
            var subProducts = await settingService.GetSubProductAsync();
            var extensions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            return Json(new
            {
                report, mainCategories, communicationTools,
                products, subProducts, extensions,
                totalRows = criteria.TotalRows
            });
        }
    }
}
