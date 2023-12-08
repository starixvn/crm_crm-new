namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using CRM.Core;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class LatestFeedbackExcel : ExcelBase
    {
        private readonly IEnumerable<FeedbackDetail> feedbacks;
        private readonly IEnumerable<Setting> mainCategories;
        private readonly int top;
        private readonly string username;

        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 6;
        private const byte TotalCols = 5;
        protected static readonly Color PendingColor = Color.FromArgb(240, 237, 196);
        protected static readonly Color ClosedColor = Color.FromArgb(221, 221, 221);
        protected static readonly Color NormalColor = Color.FromArgb(255, 255, 255);

        public LatestFeedbackExcel(
            string templatePath,
            IEnumerable<FeedbackDetail> feedbacks,
            IEnumerable<Setting> mainCategories,
            int top, string username) : base(templatePath, 0, ViewResources.LatestFeedback)
        {
            this.feedbacks = feedbacks;
            this.mainCategories = mainCategories;
            this.top = top;
            this.username = username;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
            worksheet.Cells[1, 1].Value = username == string.Empty ? 
                string.Format(ViewResources.LatestFeedbackReport_Title, top) :
                string.Format(ViewResources.LatestFeedback_Report_ByCustId_Title, top, username);
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]
              .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            int rowIndex = RowStartBody;
            int index = 1;
            foreach (var feedback in feedbacks)
            {
                RenderRow(worksheet, feedback, index, rowIndex++);
                index++;
            }
        }

        protected internal virtual void RenderRow(ExcelWorksheet worksheet, FeedbackDetail feedback, int index, int rowIndex)
        {
            var colIndex = 1;
            var feedbackCellValue = GetFeedbackCellValue(feedback);
            var categoryContents = BuildCategoryContent(feedback);
            var categoryCellValue = string.Join("\n\n", categoryContents);
            worksheet.Cells[rowIndex, colIndex++].Value = feedback.FeedbackId;
            worksheet.Cells[rowIndex, colIndex++].Value = feedbackCellValue;
            worksheet.Cells[rowIndex, colIndex++].Value = categoryCellValue;
            worksheet.Cells[rowIndex, colIndex++].Value = feedback.Status;
            worksheet.Cells[rowIndex, colIndex].Value = feedback.RelatedCustomer.Replace(",", ", ");
            if (feedback.Status == "Pending")
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], PendingColor);
            }
            else if (feedback.Status == "Closed")
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
            worksheet.Column(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthNormal = 15;
            const int RowHeight = 60;
            const int WidthLarge = 35;
            const int ColumnRunningNo = 1;
            const int ColumnFeedback = 2;
            const int ColumnCategory = 3;
            const int ColumnStatus = 4;
            const int ColumnRelCustomer = 5;
            const int TotalColumn = ColumnRelCustomer;
            worksheet.DefaultColWidth = WidthLarge;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(ColumnRunningNo).Width = WidthNormal;
            worksheet.Column(ColumnFeedback).Width = WidthLarge;
            worksheet.Column(ColumnCategory).Width = WidthLarge;
            worksheet.Column(ColumnStatus).Width = WidthNormal;
            worksheet.Column(ColumnRelCustomer).Width = WidthLarge;
            for (var index = 0; index < feedbacks.Count(); index++)
            {
                worksheet.Row(RowStartBody + index).Height = RowHeight;
                DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumn]);
            }
        }

        private string[] BuildCategoryContent(FeedbackDetail feedback)
        {
            var settings = feedback.Settings.Where(i => i.SettingType == "Category");
            return settings.GroupBy(s => s.SettingId)
                    .Select(s =>
                    {
                        var content = GetMainCategoryName(s.Key);
                        var subIds = s.Select(e => e.SubSettingId).ToList();
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

        private static string GetFeedbackCellValue(FeedbackDetail feedback)
        {
            var cellValue = string.Format(
                "{0}\n{1}\n{2}\n{3}",
                feedback.Subject,
                "Feedback date " + feedback.FeedbackDate.ToShortDateTimeFormat(),
                "By " + feedback.CreatorName + " on " + feedback.CreateDate.ToShortDateTimeFormat(),
                "Solving Duration: " + feedback.DurationTime);

            if (!string.IsNullOrEmpty(feedback.ReviewerName))
            {
                var reviewText = string.Format("\nReviewed by {0} on {1}", feedback.ReviewerName, feedback.SolveDate.ToShortDateTimeFormat());
                return cellValue + reviewText;
            }

            return cellValue;
        }
    }
}