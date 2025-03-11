namespace CRM.Controllers.Report.Statistics;

using Constants;
using CRM.Controllers;
using CRM.Criteria.Report.FeedbackStatistic;
using CRM.Resources;
using CRM.Services.Feedback;
using Extensions;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.ExportExcel;
using Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

public class FeedbackStatisticController(
    IFeedbackService feedbackService,
    ICommonService commonService,
    ISettingService settingService,
    IExportExcelService excelService,
    IPermissionService permissionService)
    : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetFeedbackStatistic([FromBody] GetFeedbackStatisticCriteria criteria)
    {
        var title = string.Format(ViewResources.FeedbackStatisticTitle,
            criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
        criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
        criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var feedbackStatistic = await feedbackService.GetFeedbackStatisticAsync(criteria);
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
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        var feedbackDetail = await feedbackService.GetFeedbackStatisticDetailAsync(criteria);
        var total = feedbackDetail.Count();
        if (feedbackDetail.Any())
        {
            feedbackDetail = feedbackDetail.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
        }
        var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
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
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var feedbackStatistic = await feedbackService.GetFeedbackStatisticAsync(criteria);
        feedbackStatistic.Title = title;
        var bytes = excelService.ExportStatisticFeedback(feedbackStatistic);
        var reportName = string.Format(ViewResources.FeedbackStatistic_ExcelFile, fromDateFormat, toDateFormat);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }

    [HttpPost]
    public async Task<IActionResult> ExportExcelDetails([FromBody] GetFeedbackStatisticDetailCriteria criteria)
    {
        criteria.PageIndex = 0;
        criteria.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        criteria.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        var fromDateFormat = criteria.FromDate.ToShortDateFormatNoDash();
        var toDateFormat = criteria.ToDate.ToShortDateFormatNoDash();
        var title = string.Format(ViewResources.FeedbackStatisticDetail_ExcelTitle,
            criteria.FromDate.ToShortDateFormat(), criteria.ToDate.ToShortDateFormat());
        var mainCategories = await settingService.GetMainCategoryWithSubCategoryAsync();
        var feedbacksDetail = await feedbackService.GetFeedbackStatisticDetailAsync(criteria);
        var feedbacksOrder = feedbacksDetail.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);

        var bytes = excelService.ExportStatisticFeedbackDetail(feedbacksOrder, mainCategories, title);
        var reportName = string.Format(ViewResources.FeedbackStatisticDetail_ExcelFile, fromDateFormat, toDateFormat);
        return File(bytes, MimeType.XLSX, $"{reportName}.xlsx");
    }
}