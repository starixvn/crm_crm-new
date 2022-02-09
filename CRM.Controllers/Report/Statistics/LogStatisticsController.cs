namespace CRM.Controllers.Report.Statistics
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Criteria.Report.LogStatistics;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Report.LogStatistics;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;

    public class LogStatisticsController : BaseController
    {
        private readonly ILogStatisticsService logStatisticsService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        public LogStatisticsController(
            ILogStatisticsService logStatisticsService,
            ISettingService settingService,
            IExportExcelService excelService
            )
        {
            this.logStatisticsService = logStatisticsService;
            this.settingService = settingService;
            this.excelService = excelService;
        }

        [NapAuth(FunctionKey = FunctionKey.LogStatistics, Policy = Constant.Policy.Read)]
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
        [NapAuth(FunctionKey = FunctionKey.LogStatistics, Policy = Constant.Policy.Read)]
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
        [NapAuth(FunctionKey = FunctionKey.LogStatistics, Policy = Constant.Policy.Read)]
        public async Task<IActionResult> GetReportDetails([FromBody] LogStatisticsDetailCriteria criteria)
        {
            var reportDetails = await logStatisticsService.GetReportDetailsAsync(criteria);
            var report = reportDetails.ChildReports;
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

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] LogStatisticsCriteria criteria)
        {
            var param = new LogStatisticsCriteria
            {
                ProductId = criteria.ProductId,
                MainCategoryId = criteria.MainCategoryId,
                CommunicationId = criteria.CommunicationId,
                FromDate = criteria.FromDate,
                ToDate = criteria.ToDate,
                ProductType = LogStatisticConstants.ProductTypeDetails,
                CategoryType = LogStatisticConstants.SubCategory,
                SiteType = criteria.SiteType
            };

            var logStatistics = await logStatisticsService.GetReportDataAsync(param);
            var bytes = excelService.ExportLogStatisticsReport(logStatistics);
            return File(bytes, MimeType.XLSX, $"{logStatistics?.ExcelFileName}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcelDetails([FromBody] LogStatisticsDetailCriteria criteria)
        {
            criteria.PageIndex = 0;
            criteria.PageSize = 0;
            var logStatisticsDetail = await logStatisticsService.GetReportDetailsAsync(criteria);
            var mainCategories = await settingService.GetAllMainSubCategoriesAsync();
            var communicationTools = await settingService.GetCommunicationToolAsync();
            var products = await settingService.GetProductAsync();
            var subProducts = await settingService.GetSubProductAsync();
            var extensions = await settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active);
            var bytes = excelService.ExportLogStatisticsReportDetail(logStatisticsDetail, mainCategories, communicationTools
                , products, subProducts, extensions);
            return File(bytes, MimeType.XLSX, $"{logStatisticsDetail?.ExcelFileName}.xlsx");
        }
    }
}
