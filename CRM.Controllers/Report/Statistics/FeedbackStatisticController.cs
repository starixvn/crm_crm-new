namespace CRM.Services.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Controllers;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Criteria.Report.FeedbackStatistic;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Repositories;
    using CRM.Resources;
    using CRM.Services.Feedback;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;

    public class FeedbackStatisticController : BaseController
    {
        private readonly IFeedbackRepository feedbackRepository;
        private readonly IFeedbackService feedbackService;
        private readonly ICommonService commonService;
        private readonly ISettingService settingService;
        private readonly IExportExcelService excelService;
        public FeedbackStatisticController(IFeedbackRepository feedbackRepository,
            IFeedbackService feedbackService,
            ICommonService commonService,
            ISettingService settingService,
            IExportExcelService excelService)
        {
            this.feedbackRepository = feedbackRepository;
            this.feedbackService = feedbackService;
            this.settingService = settingService;
            this.commonService = commonService;
            this.excelService = excelService;
        }


        [HttpPost]
        public async Task<IActionResult> GetFeedbackStatistic([FromBody] GetFeedbackStatisticCriteria criteria)
        {
            var title = string.Format(ViewResources.FeedbackStatisticTitle,
                                        criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var feedbackStatistic = await feedbackRepository.GetFeedbackStatisticAsync(criteria);
            feedbackStatistic.Title = title;
            feedbackStatistic.TotalItems = feedbackStatistic.FeedbackCategories.Count;
            if (feedbackStatistic.TotalItems > 0)
            {
                feedbackStatistic.FeedbackCategories = feedbackStatistic.FeedbackCategories.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
            }

            return Json(feedbackStatistic);
        }

        [HttpPost]
        public async Task<IActionResult> GetFeedbackStatisticDetails([FromBody] GetFeedbackStatisticDetailCriteria criteria)
        {
            var feedbackDetail = await feedbackService.GetFeedbackStatisticAsyncDetail(criteria);
            var total = feedbackDetail.Count();
            if (feedbackDetail.Any())
            {
                feedbackDetail = feedbackDetail.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
            }
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            var feedbacksOrder = feedbackDetail.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);
            return Json(new { data = feedbacksOrder, mainCategories, total });
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcel([FromBody] GetFeedbackStatisticCriteria criteria)
        {
            criteria.PageIndex = 0;
            var fromDateFormat = criteria.FromDate.ToShortDateFormatNoDash();
            var toDateFormat = criteria.ToDate.ToShortDateFormatNoDash();
            var title = string.Format(ViewResources.FeedbackStatisticTitle,
                            criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var feedbackStatistic = await feedbackRepository.GetFeedbackStatisticAsync(criteria);
            feedbackStatistic.Title = title;
            var bytes = excelService.ExportStatisticFeedback(feedbackStatistic);
            string reportName = string.Format(ViewResources.FeedbackStatistic_ExcelFile, fromDateFormat, toDateFormat);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }

        [HttpPost]
        public async Task<IActionResult> ExportExcelDetails([FromBody] GetFeedbackStatisticDetailCriteria criteria)
        {
            criteria.PageIndex = 0;
            var fromDateFormat = criteria.FromDate.ToShortDateFormatNoDash();
            var toDateFormat = criteria.ToDate.ToShortDateFormatNoDash();
            var title = string.Format(ViewResources.FeedbackStatisticDetail_ExcelTitle,
                                        criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
            IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
            IEnumerable<DeletedFeedback> feedbacksDetail = await feedbackService.GetFeedbackStatisticAsyncDetail(criteria);
            var feedbacksOrder = feedbacksDetail.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);

            var bytes = excelService.ExportStatisticFeedbackDetail(feedbacksOrder, mainCategories, title);
            string reportName = string.Format(ViewResources.FeedbackStatisticDetail_ExcelFile, fromDateFormat, toDateFormat);
            return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
        }
    }
}
