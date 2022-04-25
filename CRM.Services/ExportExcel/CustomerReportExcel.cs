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

        public CustomerReportExcel(
            string templatePath,
            CustomerReportInfo customerReportInfo
        ) : base (templatePath, 0, ViewResources.CustomerReport)
        {
            this.customerReportInfo = customerReportInfo;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
              .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
            worksheet.Cells[1, 1].Value = ViewResources.CustomerReport;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]
              .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            int rowIndex = RowStartBody;
            for (var index = 0; index < customerReportInfo.CustomerList.Count(); index++)
            {
                RenderRow(worksheet, customerReportInfo.CustomerList.ToList()[index], index + 1, rowIndex++);
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
            SetStyle(worksheet);
            SetWidthColumn(worksheet);
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
            for (var index = 0; index < customerReportInfo.CustomerList.Count(); index++)
            {
                worksheet.Row(RowStartBody + index).Height = RowHeight;
                DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumn]);
            }
        }
    }
}
