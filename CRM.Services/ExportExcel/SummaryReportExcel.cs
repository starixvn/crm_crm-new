using CRM.Models.Report.CategoriesSummaryReport;
using CRM.Resources;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Services.ExportExcel
{
    public class SummaryReportExcel : ExcelBase
    {
        private const int widthColumnSmall = 15;
        private const int widthColumnLarge = 25;
        private const int widthColumnNormal = 20;
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte LastColumns = 4;
        private int rowIndex = RowStartBody;
        private readonly SummaryReportModel summaryreportInfo;

        public SummaryReportExcel(string templatePath, SummaryReportModel report)
            : base(templatePath, 0, ViewResources.SheetNameSummaryReport)
        {
            this.summaryreportInfo = report;
        }


        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {

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
            worksheet.Cells[1, 1].Value = summaryreportInfo.ReportTitle;
        }
    }
}
