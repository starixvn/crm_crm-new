namespace CRM.Services.ExportExcel
{
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Web;
    using CRM.Models.InformHeadline;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    public class InformHeadlineExcel : ExcelBase
    {
        private readonly IEnumerable<InformHeadlineModel> informs;

        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte TotalCols = 12;

        public InformHeadlineExcel(
            string templatePath, 
            IEnumerable<InformHeadlineModel> informs) : base(templatePath, 0, ViewResources.InformHeadlineCase)
        {
            this.informs = informs;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
            worksheet.Cells[1, 1].Value = ViewResources.InformHeadlineCase;
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]
              .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            int rowIndex = RowStartBody;
            int index = 1;
            foreach (var inform in informs)
            {
                RenderRow(worksheet, inform, index, rowIndex++);
                index++;
            }
        }

        protected internal virtual void RenderRow(ExcelWorksheet worksheet, InformHeadlineModel inform, int index, int rowIndex)
        {
            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = HttpUtility.HtmlDecode(inform.Title);
            worksheet.Cells[rowIndex, colIndex++].Value = inform.ClientCreatedDate;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.Total;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.Status;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.Done;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.RequestToCallBack;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.NoNeedToCall;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.NoReply;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.Uncontactable;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.InternalAccount;
            worksheet.Cells[rowIndex, colIndex++].Value = inform.NeverTouch;
            worksheet.Cells[rowIndex, colIndex].Value = inform.KeptForReference;

            Color colOpen = ColorTranslator.FromHtml("#f0edc4");
            Color colClosed = ColorTranslator.FromHtml("#f2f2f2");
            if (inform.Status == "Open")
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colOpen);
            }
            if (inform.Status == "Closed")
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colClosed);
            }
        }
        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetStyle(worksheet);
            SetWidthColumn(worksheet);
        }

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            for (int index = 3; index <= TotalCols; index++)
            {
                worksheet.Column(index).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            }
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthLarge = 35;
            const int WidthNormal = 15;
            const int RowHeight = 15;
            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = WidthLarge;
            for(int index = 2; index <= TotalCols; index++)
            {
                worksheet.Column(index).Width = WidthNormal;
            }
            for (var index = 0; index < informs.Count(); index++)
            {
                worksheet.Row(RowStartBody + index).Height = RowHeight;
                DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalCols]);
            }
        }
    }
}
