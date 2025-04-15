namespace CRM.Controllers.Report.Statistics;

using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.FeedbackStatistic;
using CRM.Resources;
using CRM.Services.Feedback;
using Extensions;
using Microsoft.AspNetCore.Mvc;
using Models.Report.FeedbackStatistic;
using Models.Report.FeedbackStatistic.FeedbackRating;
using Services;
using Services.ExportExcel;
using Services.Interfaces;

public class FeedbackStatisticController(
    IFeedbackService feedbackService,
    ICommonService commonService,
    ISettingService settingService,
    IExportExcelService excelService,
    IPermissionService permissionService)
    : BaseController
{
    [HttpPost]
    public async Task<IActionResult> GetFeedbackStatistic([FromBody] GetFeedbackStaticBaseModel baseModel)
    {
        var title = string.Format(ViewResources.FeedbackStatisticTitle,
            baseModel.FromDate.ToShortDateFormat(), baseModel.ToDate.ToShortDateFormat());
        baseModel.FromDate = commonService.ConvertClientFromTimeToServerTime(baseModel.FromDate);
        baseModel.ToDate = commonService.ConvertClientToTimeToServerTime(baseModel.ToDate);
        baseModel.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        baseModel.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();
        if (baseModel.Type is 12 or 13)
        {
            var ratingFbStatistics = await GetFeedbackRatingStatisticAndPaging(baseModel);
            ratingFbStatistics.Title = title;
            return Json(ratingFbStatistics);
        }

        var feedbackStatistic = await GetFeedbackStatisticAndPaging(baseModel);
        feedbackStatistic.Title = title;
        return Json(feedbackStatistic);
    }

    private async Task<FeedbackStatisticInfo> GetFeedbackStatisticAndPaging(GetFeedbackStaticBaseModel baseCriteria)
    {
        var criteria = new GetFeedbackStatisticCriteria
        {
            FromDate = baseCriteria.FromDate,
            ToDate = baseCriteria.ToDate,
            FromDuration = baseCriteria.FromDuration,
            ToDuration = baseCriteria.ToDuration,
            Type = baseCriteria.Type,
            PageIndex = baseCriteria.PageIndex,
            PageSize = baseCriteria.PageSize,
            SitePermission = baseCriteria.SitePermission,
            LicenseeType = baseCriteria.LicenseeType,
            UserRole = baseCriteria.UserRole
        };
        var feedbackStatistic = await feedbackService.GetFeedbackStatisticAsync(criteria);
        feedbackStatistic.TotalItems = feedbackStatistic.FeedbackCategories.Count;

        if (feedbackStatistic.TotalItems > 0)
        {
            feedbackStatistic.FeedbackCategories = feedbackStatistic.FeedbackCategories
                .Skip(criteria.PageSize * (criteria.PageIndex - 1))
                .Take(criteria.PageSize).ToList();
        }
        return feedbackStatistic;
    }

    private async Task<FeedbackRatingReport> GetFeedbackRatingStatisticAndPaging(GetFeedbackStaticBaseModel baseCriteria)
    {
        var criteria = new GetFeedbackRatingStatisticCriteria
        {
            FromDate = baseCriteria.FromDate,
            ToDate = baseCriteria.ToDate,
            FromDuration = baseCriteria.FromDuration,
            ToDuration = baseCriteria.ToDuration,
            Type = baseCriteria.Type,
            PageIndex = baseCriteria.PageIndex,
            PageSize = baseCriteria.PageSize,
            SitePermission = baseCriteria.SitePermission,
            LicenseeType = baseCriteria.LicenseeType,
            UserRole = baseCriteria.UserRole
        };
        var feedbackStatistic = await feedbackService.GetFeedbackRatingStatisticAsync(criteria);
        feedbackStatistic.TotalItems = feedbackStatistic.Records.Count;
        if (feedbackStatistic.TotalItems > 0)
        {
            feedbackStatistic.Records = feedbackStatistic.Records
                .Skip(criteria.PageSize * (criteria.PageIndex - 1))
                .Take(criteria.PageSize).ToList();
        }
        return feedbackStatistic;
    }

    [HttpPost]
    public async Task<IActionResult> GetFeedbackStatisticDetails([FromBody] GetFeedbackStatisticDetailCriteria criteria)
    {
        if (!string.IsNullOrWhiteSpace(criteria.FeedbackDateString))
        {
            var fbDate = DateTime.Parse(criteria.FeedbackDateString, new CultureInfo("en-US"));
            criteria.FromFeedbackDate = commonService.ConvertClientFromTimeToServerTime(fbDate);
            criteria.ToFeedbackDate = commonService.ConvertClientToTimeToServerTime(fbDate);
        }
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
    public async Task<IActionResult> ExportExcel([FromBody] GetFeedbackStaticBaseModel baseModel)
    {
        baseModel.PageIndex = 0;
        var fromDateFormat = baseModel.FromDate.ToShortDateFormatNoDash();
        var toDateFormat = baseModel.ToDate.ToShortDateFormatNoDash();
        var title = string.Format(ViewResources.FeedbackStatisticTitle,
            baseModel.FromDate.ToShortDateFormat(), baseModel.ToDate.ToShortDateFormat());
        baseModel.FromDate = commonService.ConvertClientFromTimeToServerTime(baseModel.FromDate);
        baseModel.ToDate = commonService.ConvertClientToTimeToServerTime(baseModel.ToDate);
        baseModel.LicenseeType = await permissionService.GetCurrentUserLicenseeTypeAsync();
        baseModel.SitePermission = await permissionService.GetCurrentUserCreditPermissionsAsync();

        if (baseModel.Type is 12 or 13)
        {
            var ratingFbStatistics = await GetFeedbackRatingStatisticAndPaging(baseModel);
            ratingFbStatistics.Title = title;
            var ratingReportExcel = excelService.ExportRatingStatisticFeedback(ratingFbStatistics);
            var ratingReportName = string.Format(ViewResources.FeedbackStatistic_ExcelFile, fromDateFormat, toDateFormat);
            return File(ratingReportExcel, MimeType.XLSX, $"{ratingReportName}.xlsx");
        }

        var feedbackStatistic = await GetFeedbackStatisticAndPaging(baseModel);
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