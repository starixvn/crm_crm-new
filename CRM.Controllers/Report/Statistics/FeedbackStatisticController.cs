namespace CRM.Services.Report
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Controllers;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Criteria.Report.FeedbackStatistic;
    using CRM.Repositories;
    using CRM.Resources;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;

    public class FeedbackStatisticController : Controller
    {
        private readonly IFeedbackRepository feedbackRepository;
        private readonly ICommonService commonService;
        private readonly IExportExcelService excelService;
        public FeedbackStatisticController(IFeedbackRepository feedbackRepository,
            ICommonService commonService,
            ISettingService settingService,
            IExportExcelService excelService)
        {
            this.feedbackRepository = feedbackRepository;
            this.commonService = commonService;
            this.excelService = excelService;
        }

        //[NapAuth(FunctionKey = FunctionKey.FeedbackStatistics, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View("../Report/FeedbackStatistic/Index");
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
    }
}
