namespace CRM.Services.ExportExcel
{
    using System.Linq;
    using CRM.Core;
    using CRM.Models.Report.CustomerReport;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class CustomerReportExcel : ExcelBase
    {
        private readonly CustomerReportInfo customerReportInfo;

        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte TotalCols = 31;
        private const int MaxRowPerSheet = 20000;
        private readonly int numberOfSheet;

        public CustomerReportExcel(
            string templatePath,
            CustomerReportInfo customerReportInfo
        ) : base(templatePath, 0, ViewResources.CustomerReport)
        {
            this.customerReportInfo = customerReportInfo;

            var totalRows = customerReportInfo.CustomerList.ToList().Count;
            numberOfSheet = (totalRows / MaxRowPerSheet) + (totalRows % MaxRowPerSheet != 0 ? 1 : 0);
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            for (var index = 0; index < numberOfSheet; index++)
            {
                if (index > 0)
                {
                    worksheet.Workbook.Worksheets.Add(string.Format("{0} - {1}", ViewResources.CustomerReport, index + 1));
                }

                templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
                    .Copy(worksheet.Workbook.Worksheets[index].Cells[1, 1, RowStartHeader - 1, TotalCols]);
                worksheet.Workbook.Worksheets[index].Cells[1, 1].Value = ViewResources.CustomerReport;
            }
            if (numberOfSheet > 1)
            {
                worksheet.Workbook.Worksheets[0].Name = string.Format("{0} - {1}", ViewResources.CustomerReport, 1);
            }
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            for (var index = 0; index < numberOfSheet; index++)
            {
                templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]
                    .Copy(worksheet.Workbook.Worksheets[index].Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
            }
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var customers = customerReportInfo.CustomerList.ToList();

            int rowIndex = RowStartBody;
            var index = 1;
            var key = 0;
            foreach (var customer in customers)
            {
                if (index == MaxRowPerSheet)
                {
                    key++;
                    index = 1;
                    rowIndex = RowStartBody;
                }

                RenderRow(worksheet.Workbook.Worksheets[key], customer, index++, rowIndex++);
            }
        }

        protected internal virtual void RenderRow(ExcelWorksheet worksheet, CustomerInfo customerInfo, int index, int rowIndex)
        {
            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Headline;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Checker;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Position;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Status;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Username;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.FirstName;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.LastName;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Phone1;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Phone2;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Phone3;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Mobile;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Fax;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Email;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Skype;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.MSN;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.WhatsApp;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Line;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.WeChat;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Yahoo;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.BBM;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.QQ;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Language;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.IsVIP ? ViewResources.Symbol_IsVIP : string.Empty;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Pic1;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Pic2;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Pic3;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Pic4;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.BirthDay.HasValue ? customerInfo.BirthDay.Value.ToShortDateFormat() : string.Empty;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.Passport;
            worksheet.Cells[rowIndex, colIndex++].Value = customerInfo.SiteName;
            worksheet.Cells[rowIndex, colIndex].Value = customerInfo.CountryName;

            if ((index & 1) == 0)
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
            }
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            for (var index = 0; index < numberOfSheet; index++)
            {
                SetStyle(worksheet.Workbook.Worksheets[index]);
                SetWidthColumn(worksheet.Workbook.Worksheets[index]);
            }
        }

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            const int ColumnIndexIsVip = 23;
            const int ColumnIndexBirthday = 28;

            StyleDefault(worksheet);
            worksheet.Column(ColumnIndexIsVip).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Column(ColumnIndexBirthday).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthNormal = 25;
            const int RowHeight = 25;
            const int TotalColumn = 31;
            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Cells.AutoFitColumns();
            for (var index = 0; index < MaxRowPerSheet - 1; index++)
            {
                worksheet.Row(RowStartBody + index).Height = RowHeight;
                DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumn]);
            }
        }
    }
}