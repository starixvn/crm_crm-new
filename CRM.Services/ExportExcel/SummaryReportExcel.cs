namespace CRM.Services.ExportExcel
{
    using CRM.Models.Report.CategoriesSummaryReport;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    using System;
    using System.Drawing;

    public class SummaryReportExcel : ExcelBase
    {
        private readonly SummaryReportModel summaryreportInfo;
        private const int widthColumnLarge = 45;
        private const int heightRowLarge = 30;
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const int FromRowMergeTitle = 3;
        private const int RowMergeHeader = 0b10;
        private const int GrandTotalRow = 2;
        private readonly byte LastColumns;
        private int rowIndex = RowStartBody;        

        public SummaryReportExcel(string templatePath, SummaryReportModel report, int year)
            : base(templatePath, 0, string.Format(ViewResources.SheetNameSummaryReport, year))
        {
            this.summaryreportInfo = report;
            LastColumns = Convert.ToByte(this.summaryreportInfo.Months.Count + 1);
        }


        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            SetValueMonths(summaryreportInfo, worksheet);
            SetValueRow(summaryreportInfo, worksheet);
            SetValueGrandTotal(summaryreportInfo, worksheet);
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, LastColumns]
                    .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader, LastColumns]);
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, LastColumns]
                 .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, LastColumns]);
            worksheet.Cells[1, 1, RowStartHeader - RowMergeHeader, summaryreportInfo.Months.Count+1].Merge = true;
            worksheet.Cells[FromRowMergeTitle, 1, RowStartHeader - 1, summaryreportInfo.Months.Count+1].Merge = true;
            worksheet.Cells[1, 1].Value = summaryreportInfo.ReportTitle;
            worksheet.Cells[1, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal virtual void SetValueMonths(SummaryReportModel report, ExcelWorksheet worksheet)
        {
            var colIndexMonth = 2;
            foreach (var item in report.Months)
            {
                worksheet.Cells[rowIndex - 1, colIndexMonth].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[rowIndex - 1, colIndexMonth++].Value = item;
            }
        }

        protected internal virtual void SetValueGrandTotal(SummaryReportModel report, ExcelWorksheet worksheet)
        {
            worksheet.Cells[rowIndex, 1].Value = "Grand Total";
            for (int i = 0; i < report.GrandTotals.Count; i++)
            {
                SetValueGrandTotalMonth(report, i, worksheet);
            }
        }

        protected internal virtual void SetValueGrandTotalMonth(SummaryReportModel report, int i, ExcelWorksheet worksheet)
        {
            for (int j = 0; j < report.Months.Count; j++)
            {
                if (report.GrandTotals[i].Month == report.Months[j])
                {
                    worksheet.Cells[rowIndex, GrandTotalRow + j].Value = report.GrandTotals[i].Amount;
                    worksheet.Cells[rowIndex, GrandTotalRow + j].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                }
            }
        }

        protected internal virtual void SetValueAmountMonthMainCategory(
            CategorySummary itemMainCategory,
            byte colIndex, 
            SummaryReportModel report, 
            int i, 
            ExcelWorksheet worksheet)
        {
            for (int j = 0; j < report.Months.Count; j++)
            {
                if (itemMainCategory.Summaries[i].Month == report.Months[j] && itemMainCategory.Summaries[i].Amount != 0)
                {
                    worksheet.Cells[rowIndex, colIndex + 1 + j].Value = itemMainCategory.Summaries[i].Amount;
                    worksheet.Cells[rowIndex, colIndex + 1 + j].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                }
            }
        }

        protected internal virtual void SetValueAmountMonthSubCategory(
            CategorySummary itemSubCategory,
            byte colIndex,
            SummaryReportModel report,
            int i,
            ExcelWorksheet worksheet)
        {
            for (int j = 0; j < report.Months.Count; j++)
            {
                if (itemSubCategory.Summaries[i].Month == report.Months[j] && itemSubCategory.Summaries[i].Amount != 0)
                {
                    worksheet.Cells[rowIndex, colIndex + 1 + j].Value = itemSubCategory.Summaries[i].Amount;
                    worksheet.Cells[rowIndex, colIndex + 1 + j].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                }
            }
        }

        protected internal virtual void SetValueColMonthsMainCategory(
            CategorySummary itemMainCategory, 
            byte colIndex, 
            SummaryReportModel report,  
            ExcelWorksheet worksheet)
        {
            for (int i = 0; i < itemMainCategory.Summaries.Count; i++)
            {
                SetValueAmountMonthMainCategory(itemMainCategory, colIndex, report, i, worksheet);
            }
        }

        protected internal virtual void SetValueColMonthsSubCategory(
           CategorySummary itemSubCategory,
           byte colIndex,
           SummaryReportModel report,
           ExcelWorksheet worksheet)
        {
            for (int i = 0; i < itemSubCategory.Summaries.Count; i++)
            {
                SetValueAmountMonthSubCategory(itemSubCategory, colIndex, report, i, worksheet);
            }
        }

        protected internal virtual void SetValueSubCategory(
            CategorySummary itemMainCategory,
            byte colIndex,
            SummaryReportModel report,
            ExcelWorksheet worksheet)
        {
            foreach (var itemSubCategory in itemMainCategory.SubCategories)
            {
                worksheet.Cells[rowIndex, colIndex].Value = itemSubCategory.Name;
                SetValueColMonthsSubCategory(itemSubCategory, colIndex, report, worksheet);
                rowIndex++;
            }
        }

        protected internal virtual void SetValueRow(SummaryReportModel report, ExcelWorksheet worksheet)
        {
            const byte colIndex = 1;
            foreach (var itemMainCategory in report.CategorySummaries)
            {
                worksheet.Cells[rowIndex, colIndex].Value = itemMainCategory.Name;
                worksheet.Row(rowIndex).Height = heightRowLarge;
                SetBackgroundCategories(worksheet.Cells[rowIndex, colIndex, rowIndex, LastColumns]);
                SetValueColMonthsMainCategory(itemMainCategory, colIndex, report, worksheet);
                rowIndex++;
                SetValueSubCategory(itemMainCategory, colIndex, report, worksheet);                
            }
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetDefaultStyle(worksheet);
            SetBackground(worksheet.Cells[rowIndex, 1, rowIndex, LastColumns]);
            SetBackground(worksheet.Cells[RowStartBody - 1 , 1, RowStartBody - 1, LastColumns]);
            DrawBorderCell(worksheet.Cells[RowStartBody - 1, 1, rowIndex, LastColumns]);
        }

        protected internal virtual void SetDefaultStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            worksheet.Column(1).Width = widthColumnLarge;
        }

        protected internal virtual void SetBackground(ExcelRange cell)
        {
            SetBackgroundColor(cell, HeaderTitleColor);
            cell.Style.Font.Color.SetColor(Color.White);
            cell.Style.Font.Bold = true;
        }

        protected internal virtual void SetBackgroundCategories(ExcelRange cell)
        {
            SetBackgroundColor(cell, Color.LightGray);
            cell.Style.Font.Color.SetColor(Color.Blue);            
            cell.Style.Font.Bold = true;
        }
    }
}
