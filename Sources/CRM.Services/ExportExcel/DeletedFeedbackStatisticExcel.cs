namespace CRM.Services.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using CRM.Models.Feedback;
using CRM.Models.Report.DeletedFeedbackStatistic;
using CRM.Models.Setting;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;

public class DeletedFeedbackStatisticExcel(
    string templatePath,
    IEnumerable<DeletedFeedbackByHandler> deletedFeedbacks,
    IEnumerable<Setting> mainCategories)
    : ExcelBase(templatePath, 0, ViewResources.DeletedFeedbackStatistic)
{
    private const int RowStartBody = 5;
    private const byte RowStartHeader = 4;
    private const byte TotalColumns = 7;

    protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
        worksheet.Cells[1, 1].Value = string.Format(ViewResources.DeletedFeedbackStatistic);
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalColumns]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalColumns]);
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var rowIndex = RowStartBody;
        var countTotalGrant = 0;
        var countLastItem = 0;
        for (var index = 0; index < deletedFeedbacks.Count(); index++)
        {
            var feedbacksDetails = deletedFeedbacks.ToList()[index];
            rowIndex += index;

            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalColumns], GroupBackgroundColor);
            SetColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalColumns]);
            var handlerFormat = $"{feedbacksDetails.Handler} ({feedbacksDetails.DeletedFeedbacks.Count()})";
            countTotalGrant += feedbacksDetails.DeletedFeedbacks.Count();

            worksheet.Cells[rowIndex++, 1].Value = handlerFormat;
            foreach (var feedback in feedbacksDetails.DeletedFeedbacks)
            {
                countLastItem++;
                var colIndex = 1;
                var categoryContents = BuildCategoryContent(feedback, mainCategories);
                var categoryCellValue = string.Join("\n\n", categoryContents);
                worksheet.Cells[rowIndex, colIndex++].Value = feedback.CreateDate.ToString("MMM dd, yyyy");
                worksheet.Cells[rowIndex, colIndex++].Value = feedback.Handler;
                worksheet.Cells[rowIndex, colIndex++].Value = feedback.Deletor;
                worksheet.Cells[rowIndex, colIndex++].Value = feedback.Subject;
                worksheet.Cells[rowIndex, colIndex++].Value = categoryCellValue;
                worksheet.Cells[rowIndex, colIndex++].Value = feedback.Customer;
                worksheet.Cells[rowIndex, colIndex].Value = feedback.RelatedCustomer.Replace(",", ", ");

                if (countLastItem != feedbacksDetails.DeletedFeedbacks.Count() || countLastItem == 1)
                {
                    rowIndex++;
                }
            }
        }
        rowIndex++;
        SetBackgroundTotalRow(worksheet.Cells[rowIndex, 1, rowIndex, TotalColumns]);
        worksheet.Cells[rowIndex, 1].Value = $"Grand Total ({countTotalGrant})";
    }

    protected internal virtual void SetColor(ExcelRange cell)
    {
        cell.Style.Font.Color.SetColor(HeaderTitleColor);
        cell.Style.Font.Bold = true;
    }

    protected internal virtual void SetBackgroundTotalRow(ExcelRange cell)
    {
        SetBackgroundColor(cell, HeaderTitleColor);
        cell.Style.Font.Color.SetColor(Color.White);
        cell.Style.Font.Bold = true;
    }

    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet);
    }

    protected internal virtual void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
        worksheet.Cells[1, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        var rowIndex = RowStartBody - 1;
        const int RowHeight = 30;
        const int WidthNormal = 25;
        const int WidthLarge = 35;
        const int ColumnDate = 1;
        const int ColumnHandler = 2;
        const int ColumnDeletedBy = 3;
        const int ColumnFeedback = 4;
        const int ColumnCategory = 5;
        const int Customer = 6;
        const int ColumnRelCustomer = 7;
        worksheet.DefaultColWidth = WidthLarge;
        worksheet.Cells.AutoFitColumns();
        worksheet.Column(ColumnDate).Width = WidthNormal;
        worksheet.Column(ColumnHandler).Width = WidthNormal;
        worksheet.Column(ColumnDeletedBy).Width = WidthNormal;
        worksheet.Column(ColumnFeedback).Width = WidthLarge;
        worksheet.Column(ColumnCategory).Width = WidthLarge;
        worksheet.Column(Customer).Width = WidthNormal;
        worksheet.Column(ColumnRelCustomer).Width = WidthNormal;
        for (var index = 0; index < deletedFeedbacks.Count(); index++)
        {
            rowIndex++;
            var feedbackDetails = deletedFeedbacks.ToList()[index].DeletedFeedbacks.ToList();
            for (var indexFb = 0; indexFb < feedbackDetails.Count; indexFb++)
            {
                rowIndex++;
                worksheet.Row(rowIndex).Height = RowHeight;
                DrawBorderCell(worksheet.Cells[rowIndex, 1, rowIndex, TotalColumns]);
            }
        }
    }

    protected static string[] BuildCategoryContent(DeletedFeedbackStatistic deletedFeedback, IEnumerable<Setting> mainCategories)
        => GetCategoryContent(deletedFeedback.Settings, mainCategories);

    private static string[] GetCategoryContent(IList<FeedbackSettingRelation> settings, IEnumerable<Setting> mainCategories)
        => GetCategoryContentWithoutSettingType(settings.Where(i => i.SettingType == "Category"), mainCategories);

    public static string[] GetCategoryContentWithoutSettingType(
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
}