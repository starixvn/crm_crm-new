namespace CRM.Controllers.Report.Statistics;

using System.Linq;
using System.Threading.Tasks;
using Constants;
using Criteria.Report.DeletedFeedbackStatistic;
using CRM.Models.Report.DeletedFeedbackStatistic;
using CRM.Resources;
using CRM.Services.Feedback;
using Filters;
using Microsoft.AspNetCore.Mvc;
using Services.ExportExcel;
using Services.Interfaces;
using static Fanex.NAP.Client.Helpers.Business.Constant;

public class DeletedFeedbackStatisticsController(
    IFeedbackService feedbackService,
    ICommonService commonService,
    ISettingService settingService,
    IExportExcelService excelService)
    : BaseController
{
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
        var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

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
        var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();

        var bytes = excelService.ExportDeletedFeedbackStatisticReport(deletedFeedbackByHandler, mainCategories);
        var reportName = ViewResources.DeletedFeedbacStatistickReport_Title;
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }
}