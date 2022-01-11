namespace CRM.Controllers.Report.Statistics
{
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Criteria.Report.SettlementReport;
    using CRM.Models.Report.DeletedFeedbackStatistic;
    using CRM.Repositories;
    using CRM.Services;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;

    public class DeletedFeedbackStatisticController : Controller
    {
        private readonly IFeedbackRepository feedbackRepository;
        private readonly ICommonService commonService;
        public DeletedFeedbackStatisticController(IFeedbackRepository feedbackRepository, ICommonService commonService)
        {
            this.feedbackRepository = feedbackRepository;
            this.commonService = commonService;
        }

        //[NapAuth(FunctionKey = FunctionKey.DeletedFeedbackStatistic, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View("../Report/DeleteFeedbackStatistic/Index");
        }

        [HttpPost]
        [NapAuth(FunctionKey = FunctionKey.DeletedFeedbackStatistic, Policy = Constant.Policy.Read)]
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

            return Json(new { grandTotal = deletedFeedbacks.ToList().Count, data = deletedFeedbackByHandler });
           
        }
    }
}
