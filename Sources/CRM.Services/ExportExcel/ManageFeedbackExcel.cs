namespace CRM.Services.ExportExcel;

using CRM.Extensions;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;

public class ManageFeedbackExcel(
    string templatePath,
    IEnumerable<FeedbackDetail> feedbacks,
    IEnumerable<Setting> mainCategories,
    string excelNameManageFeedback,
    string excelTitle)
    : ExcelBase(templatePath, 0,
        string.IsNullOrEmpty(excelNameManageFeedback)
            ? ViewResources.FeedbackStatisticsDetail_SheetName
            : excelNameManageFeedback)
{
    private const byte RowStartBody = 5;
    private const byte RowStartHeader = 4;
    private const byte TotalColum = 7;
    protected static readonly Color PendingColor = Color.FromArgb(240, 237, 196);
    protected static readonly Color ClosedColor = Color.FromArgb(221, 221, 221);
    protected static readonly Color NormalColor = Color.FromArgb(255, 255, 255);

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColum - 1]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalColum - 1]);
        worksheet.Cells[1, 1].Value = excelTitle;
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var total = !string.IsNullOrEmpty(excelNameManageFeedback) ? TotalColum - 1 : TotalColum - 2;
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, total]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, total]);
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        int rowIndex = RowStartBody;
        var feedbackList = feedbacks.ToList();
        for (var index = 0; index < feedbackList.Count; index++)
        {
            RenderRow(worksheet, feedbackList[index], index + 1, rowIndex++);
        }
    }

    protected internal virtual void RenderRow(ExcelWorksheet worksheet, FeedbackDetail feedbackDetail, int index, int rowIndex)
    {
        var colIndex = 1;
        var feedbackCellValue = GetFeedbackCellValue(feedbackDetail);
        var categoryContents = CategoryContent(feedbackDetail, mainCategories);
        var categoryCellValue = string.Join("\n\n", categoryContents);
        if (!string.IsNullOrEmpty(excelNameManageFeedback))
        {
            worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.FeedbackId;
        }
        worksheet.Cells[rowIndex, colIndex++].Value = feedbackCellValue;
        worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.Username;
        worksheet.Cells[rowIndex, colIndex++].Value = categoryCellValue;
        worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.Status;
        worksheet.Cells[rowIndex, colIndex].Value = feedbackDetail.RelatedCustomer != null ? feedbackDetail.RelatedCustomer.Replace(",", ", ") : string.Empty;

        if (feedbackDetail.Status == "Pending")
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], PendingColor);
        }
        else if (feedbackDetail.Status == "Closed")
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], ClosedColor);
        }
        else
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], NormalColor);
        }
    }

    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet);
    }

    protected internal virtual void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
        if (!string.IsNullOrEmpty(excelNameManageFeedback))
        {
            worksheet.Column(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        const int WidthNormal = 15;
        const int RowHeight = 60;
        const int WidthLarge = 35;
        const int ColumnRunningNo = 1;
        const int ColumnFeedback = 2;
        const int ColumnCustomer = 3;
        const int ColumnCategory = 4;
        const int ColumnStatus = 5;
        const int ColumnRelCustomer = 6;
        var TotalColumn = !string.IsNullOrEmpty(excelNameManageFeedback) ? ColumnRelCustomer : ColumnRelCustomer - 1;
        worksheet.DefaultColWidth = WidthLarge;
        worksheet.Cells.AutoFitColumns();
        if (!string.IsNullOrEmpty(excelNameManageFeedback))
        {
            worksheet.Column(ColumnRunningNo).Width = WidthNormal;
        }
        worksheet.Column(ColumnFeedback).Width = WidthLarge;
        worksheet.Column(ColumnCustomer).Width = WidthLarge;
        worksheet.Column(ColumnCategory).Width = WidthLarge;
        worksheet.Column(ColumnStatus).Width = WidthNormal;
        worksheet.Column(ColumnRelCustomer).Width = WidthLarge;
        var feedbacksList = feedbacks.ToList();
        for (var index = 0; index < feedbacksList.Count; index++)
        {
            worksheet.Row(RowStartBody + index).Height = RowHeight;
            DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumn]);
        }
    }

    protected string[] CategoryContent(FeedbackDetail feedback, IEnumerable<Setting> mainCategories)
    {
        return GetCategoryContent(feedback.Settings, mainCategories);
    }

    private string[] GetCategoryContent(IList<FeedbackSettingRelation> settings, IEnumerable<Setting> mainCategories)
    {
        var settingsFilter = !string.IsNullOrEmpty(excelNameManageFeedback) ? settings.Where(i => i.SettingType == "Category") : settings;
        return GetCategoryContentWithoutSettingType(settingsFilter, mainCategories);
    }

    public static string[] GetCategoryContentWithoutSettingType(
        IEnumerable<FeedbackSettingRelation> settings,
        IEnumerable<Setting> mainCategories)
    {
        return settings
            .GroupBy(s => s.SettingId)
            .Select(s =>
            {
                var mainCategoryName = GetMainCategoryName(s.Key, mainCategories);
                var subIds = s.Select(e => e.SubSettingId).ToList();
                foreach (var id in subIds)
                {
                    mainCategoryName = string.Join(string.Empty, mainCategoryName, "\n  ", GetSubCategoryName(s.Key, id, mainCategories));
                }

                return mainCategoryName;
            })
            .ToArray();
    }

    private static string GetMainCategoryName(int mainCategoryId, IEnumerable<Setting> mainCategories)
    {
        var mainCategory = mainCategories.FirstOrDefault(c => c.SettingId == mainCategoryId);
        return mainCategory == null ? string.Empty : mainCategory.SettingValue;
    }

    public static string GetSubCategoryName(
        int mainCategoryId,
        int subCategoryId,
        IEnumerable<Setting> mainCategories)
    {
        var mainCategory = mainCategories.FirstOrDefault(c => c.SettingId == mainCategoryId);
        var child = mainCategory?.ChildSettings.Find(c => c.SubCategoryId == subCategoryId);
        return child == null ? string.Empty : child.Name;
    }

    protected static string GetFeedbackCellValue(FeedbackDetail feedback)
    {
        var creatorName = feedback.CreatorName ?? feedback.Creator;
        var cellValue =
            $"{feedback.Subject}\n{"Feedback date " + feedback.FeedbackDate.ToShortDateTimeFormat()}\n{"By " + creatorName + " on " + feedback.CreateDate.ToShortDateTimeFormat()}\n{"Solving Duration: " + feedback.DurationTime}";

        if (!string.IsNullOrEmpty(feedback.ReviewerName))
        {
            var reviewText = $"\nReviewed by {feedback.ReviewerName} on {feedback.SolveDate.ToShortDateTimeFormat()}";
            return cellValue + reviewText;
        }

        return cellValue;
    }
}