namespace CRM.Controllers.Report.Statistics
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Criteria.Report.DeletedFeedbackStatisticsCriteria;
    using CRM.Models.Report.DeletedFeedbackStatistic;
    using CRM.Models.Setting;
    using CRM.Repositories;
    using CRM.Resources;
    using CRM.Services;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;

    public class DeletedFeedbackStatisticController : Controller
    {
        private readonly IFeedbackRepository feedbackRepository;
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        public DeletedFeedbackStatisticController(IFeedbackRepository feedbackRepository,
            ICommonService commonService,
            ISettingService settingService,
            IExportExcelService excelService)
        {
            this.feedbackRepository = feedbackRepository;
            this.commonService = commonService;
            this.settingService = settingService;
            this.excelService = excelService;
        }

       // [NapAuth(FunctionKey = FunctionKey.DeletedFeedbackStatistic, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View("../Report/DeleteFeedbackStatistic/Index");
        }

        [HttpPost]
       // [NapAuth(FunctionKey = FunctionKey.DeletedFeedbackStatistic, Policy = Constant.Policy.Read)]
        public async Task<IActionResult> GetDeletedFeedbackStatistics([FromBody] DeletedFeedbackStatisticsCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertToServerDateTime(criteria.ToDate);
            var deletedFeedbacks = await feedbackRepository.GetDeletedFeedbackStatisticAsync(criteria);
            var deletedFeedbackGroup = deletedFeedbacks.GroupBy(p => p.Handler);
            var deletedFeedbackByHandler = deletedFeedbackGroup.Select(p =>
                     new DeletedFeedbackByHandler
                     {
                         Handler = p.Key,
                         DeletedFeedbacks = p
                     });
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

            return Json(new { data = deletedFeedbackByHandler, mainCategories });
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] DeletedFeedbackStatisticsCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertToServerDateTime(criteria.ToDate);
            var deletedFeedbacks = await feedbackRepository.GetDeletedFeedbackStatisticAsync(criteria);
            var deletedFeedbackGroup = deletedFeedbacks.GroupBy(p => p.Handler);
            var deletedFeedbackByHandler = deletedFeedbackGroup.Select(p =>
                     new DeletedFeedbackByHandler
                     {
                         Handler = p.Key,
                         DeletedFeedbacks = p
                     });
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

            var bytes = excelService.ExportDeletedFeedbackStatisticReport(deletedFeedbackByHandler, mainCategories);
            string reportName = ViewResources.DeletedFeedbacStatistickReport_Title;
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
