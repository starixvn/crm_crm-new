namespace CRM.Services.ExportExcel
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Core;
    using CRM.Models.Feedback;
    using CRM.Models.Report.DeletedFeedbackStatistic;
    using CRM.Models.Setting;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class DeletedFeedbackStatisticExcel : ExcelBase
    {
        private readonly IEnumerable<DeletedFeedbackStatistic> deletedFeedbacks;
        private readonly IEnumerable<Setting> mainCategories;

        private const byte RowStartBody = 5;
        private const byte RowStartHeader = 4;
        private const byte StartComToolsIndex = 7;

        public DeletedFeedbackStatisticExcel(
            string templatePath,
            IEnumerable<DeletedFeedbackStatistic> deletedFeedbacks,
            IEnumerable<Setting> mainCategories) : base(templatePath, 0, ViewResources.DeletedFeedback)
        {
            this.deletedFeedbacks = deletedFeedbacks;
            this.mainCategories = mainCategories;
        }

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
            for (var index = 0; index < deletedFeedbacks.Count(); index++)
            {
                RenderRow(worksheet, deletedFeedbacks.ToList()[index], index + 1, rowIndex++);
            }
        }

        protected internal virtual void RenderRow(ExcelWorksheet worksheet, DeletedFeedbackStatistic feedbackDetail, int index, int rowIndex)
        {
            //var colIndex = 1;
            //var feedbackCellValue = GetFeedbackCellValue(feedbackDetail);
            //var categoryContents = BuildCategoryContent(feedbackDetail, mainCategories);
            //var categoryCellValue = String.Join("\n\n", categoryContents);
            //worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.FeedbackId;
            //worksheet.Cells[rowIndex, colIndex++].Value = feedbackCellValue;
            //worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.Customer;
            //worksheet.Cells[rowIndex, colIndex++].Value = categoryCellValue;
            //worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.Status;
            //worksheet.Cells[rowIndex, colIndex].Value = feedbackDetail.RelatedCustomer.Replace(",", ", ");

            //if ((index & 1) == 0)
            //{
            //    SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
            //}
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
            for (var index = 0; index < deletedFeedbacks.Count(); index++)
            {
                worksheet.Row(RowStartBody + index).Height = RowHeight;
                DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumn]);
            }
        }

        protected static string[] BuildCategoryContent(DeletedFeedbackStatistic deletedFeedback, IEnumerable<Setting> mainCategories)
        {
            return GetCategoryContent(deletedFeedback.Settings, mainCategories);
        }

        private static string[] GetCategoryContent(IList<FeedbackSettingRelation> settings, IEnumerable<Setting> mainCategories)
        {
            return GetCategoryContentWithoutSettingType(settings.Where(i => i.SettingType == "Category"), mainCategories);
        }

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
            var child = mainCategory?.ChildSettings.FirstOrDefault(c => c.SubCategoryId == subCategoryId);
            return child == null ? string.Empty : child.Name;
        }

        //protected static string GetFeedbackCellValue(DeletedFeedbackStatistic deletedFeedback)
        //{
        //    var cellValue = string.Format(
        //        "{0}\n{1}\n{2}\n{3}",
        //        deletedFeedback.Subject,
        //        "Feedback date " + deletedFeedback.FeedbackDate.ToShortDateTimeFormat(),
        //        "By " + deletedFeedback.CreatorName + " on " + deletedFeedback.CreateDate.ToShortDateTimeFormat(),
        //        "Solving Duration: " + deletedFeedback.DurationTime);

        //    if (!string.IsNullOrEmpty(deletedFeedback.ReviewerName))
        //    {
        //        var reviewText = string.Format("\nReviewed by {0} on {1}", deletedFeedback.ReviewerName, deletedFeedback.SolveDate.ToShortDateTimeFormat());
        //        return cellValue + reviewText;
        //    }

        //    return cellValue;
        //}
    }
}

