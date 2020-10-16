namespace CRM.Services
{
    using System.Drawing;
    using System.IO;
    using CRM.Models.Report.SettlementReport;
    using Microsoft.AspNetCore.Hosting;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public interface ISettlementReportExcel
    {
        byte[] Export(SettlementReportInfo reportInfo);
    }

    public class SettlementReportExcel : BaseExcel, ISettlementReportExcel
    {
        private const string CustomPath = "ExcelTemplates/Settlement_Issues_Report.xlsx";
        private const int widthColumnSmall = 15;
        private const int widthColumnLarge = 25;
        private const int widthColumnNormal = 20;
        private const byte RowStartBody = 5;
        private const byte LastColumns = 4;
        private readonly IHostingEnvironment hostingEnvironment;

        public SettlementReportExcel(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public byte[] Export(SettlementReportInfo reportInfo)
        {
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, CustomPath);
            using (var templatePackage = new ExcelPackage(new FileInfo(templatePath)))
            {
                using (var xlPackage = new ExcelPackage())
                {
                    var template = templatePackage.Workbook.Worksheets[0];
                    var worksheet = xlPackage.Workbook.Worksheets.Add(reportInfo.Name);
                    SetDefaultStyle(worksheet);
                    var rowIndex = 1;
                    RenderTitleAndHeader(template, worksheet, RowStartBody - 1, LastColumns);
                    worksheet.Cells[1, 1].Value = reportInfo.Name;
                    rowIndex = RowStartBody;
                    foreach (var report in reportInfo.ChildReports)
                    {
                        SetValueRow(rowIndex, report, worksheet);
                        rowIndex += report.ChildReports.Count;
                    }
                    SetValueRow(rowIndex, reportInfo.Total, worksheet);

                    SetBackgroundTotalRow(worksheet.Cells[rowIndex, 1, rowIndex + reportInfo.Total.ChildReports.Count - 1, LastColumns]);
                    rowIndex += reportInfo.Total.ChildReports.Count - 1;
                    DrawBorderCell(worksheet.Cells[RowStartBody, 1, rowIndex, LastColumns]);
                    return xlPackage.GetAsByteArray();
                }
            }
        }

        protected internal void SetValueRow(int rowIndex, SettlementReportInfo report, ExcelWorksheet worksheet)
        {
            const byte colIndex = 1;
            if (report.ChildReports.Count > 1)
            {
                int rowMerge = rowIndex + report.ChildReports.Count - 1;
                worksheet.Cells[rowIndex, 1, rowMerge, 1].Merge = true;
                worksheet.Cells[rowIndex, LastColumns, rowMerge, LastColumns].Merge = true;
            }
            worksheet.Cells[rowIndex, colIndex].Value = report.Name;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            for (int i = 0; i < report.ChildReports.Count; i++)
            {
                var colIndexChild = colIndex + 1;
                worksheet.Cells[rowIndex + i, colIndexChild++].Value = report.ChildReports[i].Name;
                worksheet.Cells[rowIndex + i, colIndexChild].Value = report.ChildReports[i].NumberOfIssues;
            }

            worksheet.Cells[rowIndex, LastColumns].Value = report.NumberOfIssues;
            worksheet.Cells[rowIndex, LastColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal void SetBackgroundTotalRow(ExcelRange cell)
        {
            SetBackgroudColor(cell, HeaderTitleColor);
            cell.Style.Font.Color.SetColor(Color.White);
            cell.Style.Font.Bold = true;
        }

        protected internal void SetDefaultStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            const byte CountryColumn = 2;
            const byte AmountColumn = 3;
            worksheet.Column(1).Width = widthColumnSmall;
            worksheet.Column(LastColumns).Width = widthColumnNormal;
            worksheet.Column(CountryColumn).Width = widthColumnLarge;
            worksheet.Column(AmountColumn).Width = widthColumnLarge;
        }
    }
}