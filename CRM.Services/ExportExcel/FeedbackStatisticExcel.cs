namespace CRM.Services.ExportExcel
{
    using System.Drawing;
    using System.Linq;
    using CRM.Models.Report.FeedbackStatistic;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class FeedbackStatisticExcel : ExcelBase
    {
        private readonly FeedbackStatisticInfo feedbackStatistic;
        private readonly int totalColumns;
        private const int RowStartBody = 5;
        private const byte RowStartHeader = 4;
        private const byte StartUserNameColumnIndex = 1;

        protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);

        public FeedbackStatisticExcel(string templatePath, FeedbackStatisticInfo feedbackStatistic)
            : base(templatePath, 0, ViewResources.FeedbackStatistics_SheetName)
        {
            this.feedbackStatistic = feedbackStatistic;
            totalColumns = feedbackStatistic.Usernames.Count() + StartUserNameColumnIndex;
        }
        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, totalColumns - 1]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, totalColumns - 1]);
            worksheet.Cells[1, 1].Value = feedbackStatistic.Title;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var usernames = feedbackStatistic.Usernames;
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartUserNameColumnIndex]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartUserNameColumnIndex]);
            for (var index = 0; index < usernames.Count; index++)
            {
                worksheet.Cells[RowStartHeader, StartUserNameColumnIndex + index + 1].Value = usernames[index].Name;
                DrawBorderCell(worksheet.Cells[RowStartHeader, StartUserNameColumnIndex + index + 1]);
            }
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var colIndex = 1;
            var rowIndex = RowStartBody;
            const string parternMain = "{0} - {1} item(s)";

            for (var index = 0; index < feedbackStatistic.FeedbackCategories.Count; index++)
            {
                colIndex = 1;
                var fbCategories = feedbackStatistic.FeedbackCategories[index];
                worksheet.Cells[rowIndex, 1, rowIndex, totalColumns].Merge = true;
                SetBackgroundMainCategory(worksheet.Cells[rowIndex, 1, rowIndex, totalColumns]);
                worksheet.Cells[rowIndex, colIndex].Value = string.Format(parternMain, fbCategories.Name, fbCategories.FeedbackSubcategories.Count);
                for (var indexSub = 0; indexSub < fbCategories.FeedbackSubcategories.Count; indexSub++)
                {
                    rowIndex++;
                    colIndex = 1;
                    var sub = fbCategories.FeedbackSubcategories[indexSub];
                    worksheet.Cells[rowIndex, colIndex++].Value = sub.Name + " (" + sub.Total + ")";

                    foreach (var resolve in sub.Resolves)
                    {
                        worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                        worksheet.Cells[rowIndex, colIndex++].Value = resolve;
                    }
                }
                colIndex = 1;
                rowIndex++;
                SetSubTotalColor(worksheet.Cells[rowIndex, colIndex]);
                worksheet.Cells[rowIndex, colIndex++].Value = "Sub Total (" + fbCategories.SubTotal.Total + ")";
                foreach (var total in fbCategories.SubTotal.Resolves)
                {
                    worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    worksheet.Cells[rowIndex, colIndex].Style.Font.Bold = true;
                    worksheet.Cells[rowIndex, colIndex++].Value = total;
                }
                rowIndex++;
            }
            RendeGrandTotal(worksheet, rowIndex);
        }

        protected internal virtual void RendeGrandTotal(ExcelWorksheet worksheet, int rowTotal)
        {
            var colIndex = 1;
            worksheet.Cells[rowTotal, colIndex++].Value = ViewResources.Grand_Total;
            foreach (var total in feedbackStatistic.GrandTotals)
            {
                worksheet.Cells[rowTotal, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[rowTotal, colIndex++].Value = total;
            }
            SetBackgroundTotalRow(worksheet.Cells[rowTotal, 1, rowTotal, colIndex -1]);
            DrawBorderCell(worksheet.Cells[RowStartBody, 1, rowTotal, totalColumns]);
        }

        protected internal virtual void SetBackgroundTotalRow(ExcelRange cell)
        {
            SetBackgroundColor(cell, HeaderTitleColor);
            cell.Style.Font.Color.SetColor(Color.White);
            cell.Style.Font.Bold = true;
        }

        protected internal virtual void SetBackgroundMainCategory(ExcelRange cell)
        {
            SetBackgroundColor(cell, GroupBackgroundColor);
            cell.Style.Font.Color.SetColor(Color.Blue);
            cell.Style.Font.Bold = true;
        }

        protected internal virtual void SetSubTotalColor (ExcelRange cell)
        {
            cell.Style.Font.Color.SetColor(Color.Black);
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
            const byte firstRow = 1;
            const byte spaceRowTitle = 3;
            worksheet.Cells[firstRow, 1, firstRow + 1, totalColumns].Merge = true;
            worksheet.Cells[spaceRowTitle, 1, spaceRowTitle, totalColumns].Merge = true;
            SetBackgroundColor(worksheet.Cells[RowStartHeader, StartUserNameColumnIndex + 1, RowStartHeader, totalColumns], HeaderTitleColor);
            worksheet.Cells[RowStartHeader, StartUserNameColumnIndex + 1, RowStartHeader, totalColumns].Style.Font.Bold = true;
            worksheet.Cells[RowStartHeader, StartUserNameColumnIndex + 1, RowStartHeader, totalColumns].Style.Font.Color.SetColor(Color.White);
            worksheet.Cells[RowStartHeader, StartUserNameColumnIndex + 1, RowStartHeader, totalColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }


        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthLarge = 40;
            const int WithSmall = 15;

            worksheet.DefaultColWidth = WithSmall;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = WidthLarge;
        }
    }
}

