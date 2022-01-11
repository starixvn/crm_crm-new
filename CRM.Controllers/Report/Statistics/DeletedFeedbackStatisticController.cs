namespace CRM.Controllers.Report.Statistics
{
    using CRM.Core.Constants;
    using Fanex.NAP.Client.AspNetCore.Attributes;
    using Fanex.NAP.Core.Business;
    using Microsoft.AspNetCore.Mvc;

    [Route("Report/DeletedFeedbackStatistic")]
    public class DeletedFeedbackStatisticController : Controller
    {
        [NapAuth(FunctionKey = FunctionKey.DeletedFeedbackStatistic, Policy = Constant.Policy.Read)]
        public IActionResult Index()
        {
            return View("../Report/DeleteFeedbackStatistic/Index");
        }

        //[HttpPost]
        //[NapAuth(FunctionKey = FunctionKey.DeletedFeedbackStatistic, Policy = Constant.Policy.Read)]
        //public async Task<IActionResult> GetReportDeletedFeedback([FromBody] GetDeletedFeedbackParam param)
        //{
        //    IEnumerable<DeletedFeedback> feedbacks = await feedbackService.GetDeletedFeedbackAsync(param);
        //    IEnumerable<Setting> mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

        //    int totalItems = feedbacks.Count();
        //    if (totalItems > 0)
        //    {
        //        feedbacks = feedbacks.Skip(param.PageSize * (param.PageIndex - 1)).Take(param.PageSize).ToList();
        //    }
        //    return Json(new { data = feedbacks, mainCategories, totalItems });
        //}
    }
}
