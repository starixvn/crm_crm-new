using CRM.Models.Report.DirectCustomerReport;
using CRM.Resources;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Services.ExportExcel
{
    public class DirectReportExcel : ExcelBase
    {
        private readonly DirectCustomerReportInfo directreportInfo;
        private const int widthColumnLarge = 45;
        private const int heightRowLarge = 30;
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const int FromRowMergeTitle = 3;
        private const int RowMergeHeader = 0b10;
        private const int GrandTotalRow = 2;
        private readonly byte LastColumns = 29;
        private int rowIndex = RowStartBody;

        public DirectReportExcel(string templatePath, DirectCustomerReportInfo report)
    : base(templatePath, 0, string.Format(ViewResources.DirectCustomerReport))
        {
            this.directreportInfo = report;
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            throw new NotImplementedException();
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            throw new NotImplementedException();
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            throw new NotImplementedException();
        }
    }
}
