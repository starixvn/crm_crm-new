namespace CRM.Services.ExportExcel;

using System;
using System.Collections.Generic;
using System.Linq;
using CRM.Extensions;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;

public class DeletedFeedbackExcel(
    string templatePath,
    IEnumerable<FeedbackDetail> feedbacks,
    IEnumerable<Setting> mainCategories)
    : ExcelBase(templatePath, 0, ViewResources.DeletedFeedback)
{
    private const byte RowStartBody = 5;
    private const byte RowStartHeader = 4;
    private const byte StartComToolsIndex = 7;

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, StartComToolsIndex - 1]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, StartComToolsIndex - 1]);
        worksheet.Cells[1, 1].Value = string.Format(ViewResources.DeletedFeedback);
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]);
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        int rowIndex = RowStartBody;
        for (var index = 0; index < feedbacks.Count(); index++)
        {
            RenderRow(worksheet, feedbacks.ToList()[index], index + 1, rowIndex++);
        }
    }

    protected internal virtual void RenderRow(ExcelWorksheet worksheet, FeedbackDetail feedbackDetail, int index,
        int rowIndex)
    {
        var colIndex = 1;
        var feedbackCellValue = GetFeedbackCellValue(feedbackDetail);
        var categoryContents = BuildCategoryContent(feedbackDetail, mainCategories);
        var categoryCellValue = string.Join("\n\n", categoryContents);
        worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.FeedbackId;
        worksheet.Cells[rowIndex, colIndex++].Value = feedbackCellValue;
        worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.Username;
        worksheet.Cells[rowIndex, colIndex++].Value = categoryCellValue;
        worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.Status;
        worksheet.Cells[rowIndex, colIndex].Value = feedbackDetail.RelatedCustomer.Replace(",", ", ");

        if ((index & 1) == 0)
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
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
        worksheet.Column(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
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
        const int TotalColumn = ColumnRelCustomer;
        worksheet.DefaultColWidth = WidthLarge;
        worksheet.Cells.AutoFitColumns();
        worksheet.Column(ColumnRunningNo).Width = WidthNormal;
        worksheet.Column(ColumnFeedback).Width = WidthLarge;
        worksheet.Column(ColumnCustomer).Width = WidthLarge;
        worksheet.Column(ColumnCategory).Width = WidthLarge;
        worksheet.Column(ColumnStatus).Width = WidthNormal;
        worksheet.Column(ColumnRelCustomer).Width = WidthLarge;
        for (var index = 0; index < feedbacks.Count(); index++)
        {
            worksheet.Row(RowStartBody + index).Height = RowHeight;
            DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumn]);
        }
    }

    public static string[] GetCategoryContent(
        IEnumerable<FeedbackSettingRelation> settings,
        IEnumerable<Setting> mainCategories)
    {
        return settings
            .GroupBy(s => s.SettingId)
            .Select(s =>
            {
                var con = GetMainCategoryName(s.Key, mainCategories);
                var subIds = s.Select(e => e.SubSettingId).ToList();
                foreach (var id in subIds)
                {
                    con = string.Join(string.Empty, con, "\n  ", GetSubCategoryName(s.Key, id, mainCategories));
                }

                return con;
            })
            .ToArray();
    }

    protected static string[] BuildCategoryContent(FeedbackDetail feedback, IEnumerable<Setting> mainCategories)
        => GetCategoryContent(feedback.Settings, mainCategories);

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
        var cellValue =
            $"{feedback.Subject}\n{"Feedback date " + feedback.FeedbackDate.ToShortDateTimeFormat()}\n{"By " +
                feedback.CreatorName + " on " + feedback.CreateDate.ToShortDateTimeFormat()}\n" +
            $"{"Solving Duration: " + feedback.DurationTime}";

        if (!string.IsNullOrEmpty(feedback.ReviewerName))
        {
            var reviewText = $"\nReviewed by {feedback.ReviewerName} on {feedback.SolveDate.ToShortDateTimeFormat()}";
            return cellValue + reviewText;
        }

        return cellValue;
    }

    private static string[] GetCategoryContent(IList<FeedbackSettingRelation> settings,
        IEnumerable<Setting> mainCategories)
        => GetCategoryContent(settings.Where(i => i.SettingType == "Category"), mainCategories);
}