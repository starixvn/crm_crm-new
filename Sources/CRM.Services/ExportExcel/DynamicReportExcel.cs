namespace CRM.Services.ExportExcel;

using CRM.Extensions;
using CRM.Models.Report.DynamicReport;
using CRM.Models.Setting;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text.RegularExpressions;

public class DynamicReportExcel(
    string templatePath,
    DynamicReportInfo dynamicReportInfos,
    IEnumerable<Setting> mainCategories,
    string titleExcel)
    : ExcelBase(templatePath, 0, ViewResources.DynamicReport)
{
    private const byte RowStartHeader = 4;
    private const byte RowStartBody = 5;
    private const byte TotalCols = 10;
    private int RowStart = 5;

    private const int ColumnIndexNumber = 1;
    private const int ColumnRunningNo = 2;
    private const int ColumnFeedbackDate = 3;
    private const int ColumnCategory = 4;
    private const int ColumnSubject = 5;
    private const int ColumnStatus = 6;
    private const int ColumnDuration = 7;
    private const int ColumnUsername = 8;
    private const int ColumnHandler = 9;
    private const int ColumnReviewer = 10;

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
        var toltalReport = 0;
        dynamicReportInfos.ChildReports.ForEach(dynamicReportInfo => toltalReport += dynamicReportInfo.TotalChildReports);
        worksheet.Cells[1, 1].Value = titleExcel + " [" + toltalReport + "]";
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var index = 1;
        foreach (var dynamicReportInfo in dynamicReportInfos.ChildReports)
        {
            var range = string.Format("A{0}:J{0}", RowStart);
            worksheet.Cells[range].Merge = true;
            worksheet.Cells[RowStart, ColumnReviewer].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
            worksheet.Cells[range].Value = $"{dynamicReportInfo.Name} [{dynamicReportInfo.TotalChildReports}]";
            worksheet.Cells[range].Style.Font.Color.SetColor(Color.Blue);
            worksheet.Cells[range].Style.Font.Bold = true;
            SetBackgroundColor(worksheet.Cells[range], ColorTranslator.FromHtml("#d4d2d2"));

            RenderRow(worksheet, dynamicReportInfo, index, RowStart);
            index++;
        }
    }

    protected internal virtual void RenderRow(ExcelWorksheet worksheet, DynamicReportInfo dynamicReportInfo, int index, int rowIndex)
    {
        rowIndex++;
        var indexNumber = 1;
        var colClosed = ColorTranslator.FromHtml("#dddddd");
        var colPending = ColorTranslator.FromHtml("#f0edc4");
        var colChecked = ColorTranslator.FromHtml("#f2f2f2");
        foreach (var dynamic in dynamicReportInfo.ChildReports)
        {
            var colIndex = 1;
            var categoryContents = BuildCategoryContent(dynamic.FeedbackId);
            var categoryCellValue = string.Join("\n\n", categoryContents);
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex++].Value = indexNumber;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
            worksheet.Cells[rowIndex, colIndex++].Value = dynamic.FeedbackId;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex++].Value = dynamic.FeedbackDate.ToLongDateTimeFormat();
            worksheet.Cells[rowIndex, colIndex++].Value = categoryCellValue;
            worksheet.Cells[rowIndex, colIndex++].Value = dynamic.Subject;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex++].Value = dynamic.Status;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex++].Value = Regex.Replace(dynamic.Duration, @"[\s+g]", "");
            worksheet.Cells[rowIndex, colIndex++].Value = dynamic.UserName;
            worksheet.Cells[rowIndex, colIndex++].Value = dynamic.HandledBy;
            worksheet.Cells[rowIndex, colIndex].Value = dynamic.ReviewedBy;

            if (dynamic.Status == "Closed")
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colClosed);
            }
            if (dynamic.Status == "Pending")
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colPending);
            }
            if (dynamic.Status == "Checked")
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colChecked);
            }

            indexNumber++;
            rowIndex++;
        }
        RowStart = rowIndex;
    }

    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet);
    }

    protected internal virtual void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        const int WidthSmall = 10;
        const int WidthNormal = 15;
        const int RowHeight = 30;
        const int WidthLarge = 25;
        const int WidthLarger = 40;

        const int TotalColumn = TotalCols;
        worksheet.DefaultColWidth = WidthNormal;
        worksheet.Cells.AutoFitColumns();

        worksheet.Column(ColumnIndexNumber).Width = WidthSmall;
        worksheet.Column(ColumnRunningNo).Width = WidthNormal;
        worksheet.Column(ColumnFeedbackDate).Width = WidthNormal;
        worksheet.Column(ColumnCategory).Width = WidthLarger;
        worksheet.Column(ColumnSubject).Width = WidthLarge;
        worksheet.Column(ColumnStatus).Width = WidthNormal;
        worksheet.Column(ColumnDuration).Width = WidthNormal;
        worksheet.Column(ColumnUsername).Width = WidthNormal;
        worksheet.Column(ColumnHandler).Width = WidthNormal;
        worksheet.Column(ColumnReviewer).Width = WidthNormal;

        var childReports = dynamicReportInfos.ChildReports.Count;
        for (var index = 0; index < dynamicReportInfos.TotalChildReports + childReports; index++)
        {
            worksheet.Row(RowStartBody + index).Height = RowHeight;
            DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumn]);
        }
    }

    private string[] BuildCategoryContent(int feedbackId)
    {
        var settings = dynamicReportInfos.DynamicSettings.Where(x => x.FeedbackId == feedbackId);
        return settings.GroupBy(s => s.MainCategoryId)
            .Select(s =>
            {
                var content = GetMainCategoryName(s.Key);
                var subIds = s.Select(e => e.SubCategoryId).ToList();
                foreach (var id in subIds)
                {
                    content = string.Join(string.Empty, content, "\n  ", GetSubCategoryName(s.Key, id));
                }

                return content;
            }).ToArray();
    }

    private string GetMainCategoryName(int mainCategoryId)
    {
        var mainCategory = mainCategories.FirstOrDefault(c => c.SettingId == mainCategoryId);
        return mainCategory == null ? string.Empty : mainCategory.SettingValue;
    }

    private string GetSubCategoryName(int mainCategoryId, int subCategoryId)
    {
        var mainCategory = mainCategories.FirstOrDefault(c => c.SettingId == mainCategoryId);
        var child = mainCategory?.ChildSettings.Find(c => c.SubCategoryId == subCategoryId);
        return child == null ? string.Empty : child.Name;
    }
}