namespace CRM.Services.ExportExcel
{
    using CRM.Models.InformHeadline;
    using CRM.Models.Setting;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System.Web;

    public class EditInformHeadlineExcel : ExcelBase
    {
        private readonly IEnumerable<EditInform> editInforms;
        private readonly IEnumerable<InformStatus> informStatuses;
        private readonly IEnumerable<Station> informStations;
        private readonly IEnumerable<FeedbackStatus> informProductStatuses;
        private readonly string informHeadlineTitle;

        private const byte RowStartHeader = 6;
        private const byte RowStartBody = 7;
        private const byte TotalCols = 7;
        private const byte RowStartTitle = 4;

        public EditInformHeadlineExcel(
            string templatePath,
            IEnumerable<EditInform> editInforms,
            IEnumerable<InformStatus> informStatuses,
            IEnumerable<Station> informStations,
            IEnumerable<FeedbackStatus> informProductStatuses,
            string informHeadlineTitle) : base(templatePath, 0, ViewResources.InformHeadlineCase)
        {
            this.editInforms = editInforms;
            this.informStatuses = informStatuses;
            this.informStations = informStations;
            this.informProductStatuses = informProductStatuses;
            this.informHeadlineTitle = informHeadlineTitle;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
            worksheet.Cells[1, 1].Value = ViewResources.InformHeadlineCase;
            worksheet.Cells[RowStartTitle, 1].Value = informHeadlineTitle;
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
            foreach (var editInform in editInforms)
            {
                RenderRow(worksheet, editInform, index, rowIndex++);
                index++;
            }
        }

        protected internal virtual void RenderRow(ExcelWorksheet worksheet, EditInform editInform, int index, int rowIndex)
        {
            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = editInform.Username;
            worksheet.Cells[rowIndex, colIndex++].Value = GetInformStatusNameAsync(editInform.InformHeadlineStatusId);
            worksheet.Cells[rowIndex, colIndex++].Value = editInform.ClientUpdatedTime;
            worksheet.Cells[rowIndex, colIndex++].Value = NormalizeLineBreaks(HttpUtility.HtmlDecode(editInform.Remark));
            worksheet.Cells[rowIndex, colIndex++].Value = editInform.Handler;
            worksheet.Cells[rowIndex, colIndex++].Value = GetStationNameAsync(editInform.Extension);
            worksheet.Cells[rowIndex, colIndex].Value = GetProductStatusNameAsync(editInform.ProductStatus);

            Color colHeadline = ColorTranslator.FromHtml("#d0e6f4");
            Color colDirect = ColorTranslator.FromHtml("#f1f1f1");
            if (editInform.GroupId > 0)
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colHeadline);
            }
            if (editInform.GroupId <= 0)
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colDirect);
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
            for (int index = 6; index <= TotalCols; index++)
            {
                worksheet.Column(index).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            }
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthLargest = 60;
            const int WidthLarge = 35;
            const int WidthNormal = 20;
            const int WidthSmall = 15;
            const int ColumnDirectAccount = 1;
            const int ColumnStatus = 2;
            const int ColumnUpdatedTime = 3;
            const int ColumnRemark = 4;
            const int ColumnHandler = 5;
            const int ColumnExtension = 6;
            const int ColumnProductStatus = 7;

            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(ColumnDirectAccount).Width = WidthLarge;
            worksheet.Column(ColumnStatus).Width = WidthSmall;
            worksheet.Column(ColumnUpdatedTime).Width = WidthNormal;
            worksheet.Column(ColumnRemark).Width = WidthLargest;
            worksheet.Column(ColumnHandler).Width = WidthSmall;
            worksheet.Column(ColumnExtension).Width = WidthSmall;
            worksheet.Column(ColumnProductStatus).Width = WidthSmall;

            for (var index = 0; index < editInforms.Count(); index++)
            {
                DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalCols]);
            }
        }

        private static string NormalizeLineBreaks(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return text;
            }

            return Regex.Replace(text, @"\r\n?|\n", "\r\n");
        }

        private string GetInformStatusNameAsync(int id)
        {
            var item = informStatuses.FirstOrDefault(x => x.SettingId == id);
            return item == null ? string.Empty : item.SettingValue;
        }

        private string GetStationNameAsync(int id)
        {
            var item = informStations.FirstOrDefault(x => x.StationId == id);
            return item == null ? ViewResources.Symbol_NotApply : item.Name;
        }

        private string GetProductStatusNameAsync(int id)
        {
            var item = informProductStatuses.FirstOrDefault(x => x.StatusId == id);
            return item == null ? ViewResources.Symbol_NotApply : item.Name;
        }
    }
}
