namespace CRM.Services.ExportExcel
{
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Web;
    using CRM.Models.Report;
    using CRM.Models.Report.LogStatistics;
    using CRM.Models.Setting;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class IssueStatisticsExcel : ExcelBase
    {
        private readonly IssuesStatisticsReportInfo issuesStatistics;
        private readonly string titleExcel;
        private const int RowStartBody = 5;
        private const byte RowStartHeader = 4;
        private const byte BaseColumnIndex = 2;

        protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);

        public IssueStatisticsExcel(string templatePath, IssuesStatisticsReportInfo issuesStatistics, string titleExcel)
            : base(templatePath, 0, ViewResources.IssueStatistic_Report)
        {
            this.issuesStatistics = issuesStatistics;
            this.titleExcel = titleExcel;
        }
        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var totalColumns = getTotalRow(issuesStatistics);
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, totalColumns]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, totalColumns]);
            worksheet.Cells[1, 1].Value = titleExcel;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var Countries = issuesStatistics.Total.ChildReports;
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, BaseColumnIndex]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, BaseColumnIndex]);
            for (var index = 0; index < Countries.Count; index++)
            {
                worksheet.Cells[RowStartHeader, BaseColumnIndex + index + 1].Value = Countries[index].CountryInfo.Name;
            }

        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var colIndex = 1;
            var rowIndex = RowStartBody;
            var childData = issuesStatistics.ChildReports;
            for (var index = 0; index < childData.Count; index++)
            {
                rowIndex += index;
                var timeReport = childData[index];
                if(timeReport.ChildReports.Count > 1)
                {
                    var mergeEndRow = timeReport.ChildReports.Count + rowIndex;
                    StyleMergeCell(worksheet, rowIndex, 1, mergeEndRow)
                }
                worksheet.Cells[rowIndex, colIndex++].Value = timeReport.ShortName;
            }

            //for (var index = 0; index < issuesStatistics.Count(); index++)
            //{
            //    var feedbacksDetails = issuesStatistics.ToList()[index];
            //    rowIndex += index;

                //    SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalColumns], GroupBackgroundColor);
                //    SetColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalColumns]);
                //    var handlerFormat = string.Format("{0} ({1})", feedbacksDetails.Handler, feedbacksDetails.DeletedFeedbacks.Count());
                //    countTotalGrant += feedbacksDetails.DeletedFeedbacks.Count();

                //    worksheet.Cells[rowIndex++, 1].Value = handlerFormat;
                //    foreach (var feedback in feedbacksDetails.DeletedFeedbacks)
                //    {
                //        countLastItem++;
                //        colIndex = 1;
                //        var categoryContents = BuildCategoryContent(feedback, mainCategories);
                //        var categoryCellValue = String.Join("\n\n", categoryContents);
                //        worksheet.Cells[rowIndex, colIndex++].Value = feedback.CreateDate.ToString("MMM dd, yyyy");
                //        worksheet.Cells[rowIndex, colIndex++].Value = feedback.Handler;
                //        worksheet.Cells[rowIndex, colIndex++].Value = feedback.Deletor;
                //        worksheet.Cells[rowIndex, colIndex++].Value = feedback.Subject;
                //        worksheet.Cells[rowIndex, colIndex++].Value = categoryCellValue;
                //        worksheet.Cells[rowIndex, colIndex++].Value = feedback.Customer;
                //        worksheet.Cells[rowIndex, colIndex].Value = feedback.RelatedCustomer.Replace(",", ", ");

                //        if (countLastItem != feedbacksDetails.DeletedFeedbacks.Count() || countLastItem == 1)
                //        {
                //            rowIndex++;
                //        }
                //    }
                //}

                // SetBackgroundTotalRow(worksheet.Cells[rowIndex, 1, rowIndex, TotalColumns]);
                //worksheet.Cells[rowIndex, 1].Value = string.Format("Grand Total ({0})", countTotalGrant);
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
            var totalColumns = getTotalRow(issuesStatistics);
            const byte firstRow = 1;
            const byte spaceRowTitle = 3;
            worksheet.Cells[firstRow, 1, firstRow + 1, totalColumns].Merge = true;
            worksheet.Cells[spaceRowTitle, 1, spaceRowTitle, totalColumns].Merge = true;
            SetBackgroundColor(worksheet.Cells[RowStartHeader, BaseColumnIndex + 1, RowStartHeader, totalColumns], HeaderTitleColor);
            worksheet.Cells[RowStartHeader, BaseColumnIndex + 1, RowStartHeader, totalColumns].Style.Font.Bold = true;
            worksheet.Cells[RowStartHeader, BaseColumnIndex + 1, RowStartHeader, totalColumns].Style.Font.Color.SetColor(Color.White);
            worksheet.Cells[RowStartHeader, BaseColumnIndex + 1, RowStartHeader, totalColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }


        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            var rowIndex = RowStartBody - 1;
            const int WidthLarge = 35;
            const int WidthNormal = 25;
            const int WithSmall = 15;
            const int timeColumn = 2;
            var TotalColumns = getTotalRow(issuesStatistics);


            worksheet.DefaultColWidth = WithSmall;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = WidthLarge;
            worksheet.Column(timeColumn).Width = WidthNormal;
            for (var index = 0; index < issuesStatistics.ChildReports.Count(); index++)
            {
                rowIndex++;
                DrawBorderCell(worksheet.Cells[rowIndex, 1, rowIndex, TotalColumns]);
            }
        }

        protected internal virtual void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
            DrawBorderCell(worksheet.Cells[startRow, colIndex]);
        }

        private int getTotalRow(IssuesStatisticsReportInfo issuesStatistics)
        {
            return issuesStatistics.Total.ChildReports.Count() + BaseColumnIndex;
        }
    }
}

