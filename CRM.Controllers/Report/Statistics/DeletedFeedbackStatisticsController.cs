namespace CRM.Controllers.Report.Statistics
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Filters;
    using CRM.Criteria.Report.DeletedFeedbackStatisticsCriteria;
    using CRM.Models.Report.DeletedFeedbackStatistic;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using Microsoft.AspNetCore.Mvc;
    using static Fanex.NAP.Client.Helpers.Business.Constant;

    public class DeletedFeedbackStatisticsController : BaseController
    {
        private readonly IFeedbackService feedbackService;
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;

        public DeletedFeedbackStatisticsController(IFeedbackService feedbackService,
            ICommonService commonService,
            ISettingService settingService,
            IExportExcelService excelService)
        {
            this.feedbackService = feedbackService;
            this.commonService = commonService;
            this.settingService = settingService;
            this.excelService = excelService;
        }

        [HttpPost]
        [CrmPermission(FunctionKey = FunctionKey.DeletedFeedbackStatistic, Policy = Policy.Read)]
        public async Task<IActionResult> GetDeletedFeedbackStatistics([FromBody] DeletedFeedbackStatisticsCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var deletedFeedbacks = await feedbackService.GetDeletedFeedbackStatisticAsync(criteria);
            if (deletedFeedbacks.Any())
            {
                foreach (var deletedFeedback in deletedFeedbacks)
                {
                    deletedFeedback.CreateDate = commonService.ConvertToClientDateTime(deletedFeedback.CreateDate);
                }
            }
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
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var deletedFeedbacks = await feedbackService.GetDeletedFeedbackStatisticAsync(criteria);
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