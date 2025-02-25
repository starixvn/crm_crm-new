namespace CRM.Services.ExportExcel
{
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using CRM.Models.Report;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class IssueStatisticsExcel : ExcelBase
    {
        private readonly IssuesStatisticsReportInfo issuesStatistics;
        private readonly string titleExcel;
        private readonly int totalColumns;
        private const int RowStartBody = 5;
        private const byte RowStartHeader = 4;
        private const byte StartCountryColumnIndex = 2;

        protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);

        public IssueStatisticsExcel(string templatePath, IssuesStatisticsReportInfo issuesStatistics, string titleExcel)
            : base(templatePath, 0, ViewResources.IssueStatistic_Report)
        {
            this.issuesStatistics = issuesStatistics;
            this.titleExcel = titleExcel;
            totalColumns = issuesStatistics.Total.ChildReports.Count() + StartCountryColumnIndex + 1;
        }
        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, totalColumns - 1]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, totalColumns - 1]);
            worksheet.Cells[1, 1].Value = titleExcel;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var countries = issuesStatistics.Total.ChildReports;
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartCountryColumnIndex]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartCountryColumnIndex]);
            for (var index = 0; index < countries.Count; index++)
            {
                worksheet.Cells[RowStartHeader, StartCountryColumnIndex + index + 1].Value = countries[index].CountryInfo.Name;
                DrawBorderCell(worksheet.Cells[RowStartHeader + index, 1, RowStartHeader + index, StartCountryColumnIndex + countries.Count]);
            }
            worksheet.Cells[RowStartHeader, StartCountryColumnIndex + countries.Count + 1].Value = ViewResources.Total;
            DrawBorderCell(worksheet.Cells[RowStartHeader, StartCountryColumnIndex + countries.Count + 1]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var colIndex = 1;
            var childData = issuesStatistics.ChildReports;
            var totals = issuesStatistics.Total.ChildReports;
            var rowIndex = RowStartBody;

            for (var index = 0; index < childData.Count; index++)
            {
                colIndex = 1;
                var totalChild = childData[index].Total;
                var timeReport = childData[index].ChildReports;
                var countries = childData[index].ChildReports[0].ChildReports;
                worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[rowIndex, colIndex++].Value = childData[index].ShortName;
                worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[rowIndex, colIndex++].Value = childData[index].ChildReports[0].ShortName;

                for (var countryIndex = 0; countryIndex < totals.Count; countryIndex++)
                {
                    worksheet.Cells[rowIndex, colIndex++].Value = countries[countryIndex].NumberOfIssues;
                }
                worksheet.Cells[rowIndex, colIndex].Value = childData[index].ChildReports[0].NumberOfIssues;

                if (timeReport.Count > 1)
                {
                    RenderMergeCountryInfo(worksheet, timeReport.Count, childData[index].ChildReports, rowIndex);
                }
                rowIndex += timeReport.Count;
                colIndex = 1;
                SetBackgroundChildTotalRow(worksheet.Cells[rowIndex, colIndex, rowIndex, totalColumns]);
                worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[rowIndex, colIndex++].Value = totalChild.ShortName;
                worksheet.Cells[rowIndex, colIndex++].Value = string.Empty;
                for (var countryIndex = 0; countryIndex < totals.Count; countryIndex++)
                {
                    worksheet.Cells[rowIndex, colIndex++].Value = totalChild.ChildReports[countryIndex].NumberOfIssues;
                }
                worksheet.Cells[rowIndex, colIndex].Value = totalChild.NumberOfIssues;
                rowIndex++;
            }
            RendeGrandTotal(worksheet, totals, issuesStatistics.Total.NumberOfIssues, rowIndex, totalColumns);
            DrawBorderCell(worksheet.Cells[RowStartBody, 1, rowIndex, 1]);
            DrawBorderCell(worksheet.Cells[RowStartBody, StartCountryColumnIndex, rowIndex, totalColumns]);
        }

        protected internal virtual void RendeGrandTotal(ExcelWorksheet worksheet,
            IList<IssuesStatisticsReportInfo> totals, int numberOfIssuesTotal, int rowTotal, int totalColumns)
        {
            var colIndex = 1;
            worksheet.Cells[rowTotal, colIndex++].Value = ViewResources.Grand_Total;
            worksheet.Cells[rowTotal, colIndex++].Value = string.Empty;
            foreach (var total in totals)
            {
                worksheet.Cells[rowTotal, colIndex++].Value = total.NumberOfIssues;
            }
            worksheet.Cells[rowTotal, colIndex].Value = numberOfIssuesTotal;
            SetBackgroundTotalRow(worksheet.Cells[rowTotal, 1, rowTotal, colIndex]);
        }

        protected internal virtual void RenderMergeCountryInfo(ExcelWorksheet worksheet, int mergeCount, IList<IssuesStatisticsReportInfo> childReport, int rowIndex)
        {
            var mergeEndRow = mergeCount - 1 + rowIndex;
            StyleMergeCell(worksheet, rowIndex, 1, mergeEndRow);
            var countryRemoveFirstElement = childReport.Skip(1).ToList();
            for(var index = 0; index < countryRemoveFirstElement.Count; index ++)
            {
                rowIndex++;
                var country = countryRemoveFirstElement[index];
                var colIndex = StartCountryColumnIndex;
                worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[rowIndex, colIndex++].Value = country.ShortName;
                foreach (var child in country.ChildReports)
                {
                    worksheet.Cells[rowIndex, colIndex++].Value = child.NumberOfIssues;
                }
                worksheet.Cells[rowIndex, colIndex].Value = country.NumberOfIssues;
            }
        }

        protected internal virtual void SetBackgroundTotalRow(ExcelRange cell)
        {
            SetBackgroundColor(cell, HeaderTitleColor);
            cell.Style.Font.Color.SetColor(Color.White);
            cell.Style.Font.Bold = true;
        }

        protected internal virtual void SetBackgroundChildTotalRow(ExcelRange cell)
        {
            SetBackgroundColor(cell, GroupBackgroundColor);
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
            SetBackgroundColor(worksheet.Cells[RowStartHeader, StartCountryColumnIndex + 1, RowStartHeader, totalColumns], HeaderTitleColor);
            worksheet.Cells[RowStartHeader, StartCountryColumnIndex + 1, RowStartHeader, totalColumns].Style.Font.Bold = true;
            worksheet.Cells[RowStartHeader, StartCountryColumnIndex + 1, RowStartHeader, totalColumns].Style.Font.Color.SetColor(Color.White);
            worksheet.Cells[RowStartHeader, StartCountryColumnIndex + 1, RowStartHeader, totalColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }


        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthLarge = 35;
            const int WidthNormal = 18;
            const int WithSmall = 15;
            const int timeColumn = 2;

            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = WidthLarge;
            worksheet.Column(timeColumn).Width = WithSmall;
        }

        protected internal virtual void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
            DrawBorderCell(worksheet.Cells[startRow, colIndex, endRow, colIndex]);
        }
    }
}

