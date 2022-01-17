namespace CRM.Controllers.Report.Statistics
{
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Services;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;

    public class LogStatisticsController : Controller
    {
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        public LogStatisticsController(
            ICommonService commonService,
            ISettingService settingService,
            IExportExcelService excelService)
        {
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

        //[HttpPost]
        //[NapAuth(FunctionKey = FunctionKey.LogStatistics, Policy = Constant.Policy.Read)]
        //public async Task<IActionResult> GetDeletedFeedbackStatistics([FromBody] DeletedFeedbackStatisticsCriteria criteria)
        //{
        //    criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
        //    criteria.ToDate = commonService.ConvertToServerDateTime(criteria.ToDate);
        //    var deletedFeedbacks = await feedbackRepository.GetDeletedFeedbackStatisticAsync(criteria);
        //    var deletedFeedbackGroup = deletedFeedbacks.GroupBy(p => p.Handler);
         //    var deletedFeedbackByHandler = deletedFeedbackGroup.Select(p =>
        //             new DeletedFeedbackByHandler
        //             {
        //                 Handler = p.Key,
        //                 DeletedFeedbacks = p
        //             });
        //    IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

        //    return Json(new { data = deletedFeedbackByHandler, mainCategories });
        //}
    }
}
