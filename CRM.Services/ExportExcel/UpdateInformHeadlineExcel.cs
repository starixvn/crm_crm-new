namespace CRM.Services.ExportExcel
{
    using CRM.Core.Constants;
    using CRM.Models.InformHeadline;
    using CRM.Resources;
    using CRM.Services.InformHeadline;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Text.RegularExpressions;
    using System.Web;

    public class UpdateInformHeadlineExcel : ExcelBase
    {
        private readonly IEnumerable<UpdateInform> updateInforms;
        private readonly IInformHeadlineService informHeadlineService;
        private readonly ISettingService settingService;
        private readonly string informHeadlineTitle;

        private const byte RowStartHeader = 6;
        private const byte RowStartBody = 7;
        private const byte TotalCols = 7;

        public UpdateInformHeadlineExcel(
            string templatePath,
            IEnumerable<UpdateInform> updateInforms,
            IInformHeadlineService informHeadlineService,
            ISettingService settingService,
            string informHeadlineTitle) : base(templatePath, 0, ViewResources.InformHeadlineCase)
        {
            this.updateInforms = updateInforms;
            this.informHeadlineService = informHeadlineService;
            this.settingService = settingService;
            this.informHeadlineTitle = informHeadlineTitle;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols]);
            worksheet.Cells[1, 1].Value = ViewResources.InformHeadlineCase;
            worksheet.Cells[4, 1].Value = informHeadlineTitle;
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
            foreach (var updateInform in updateInforms)
            {
                RenderRowAsync(worksheet, updateInform, index, rowIndex++);
                index++;
            }
        }

        protected internal virtual void RenderRowAsync(ExcelWorksheet worksheet, UpdateInform updateInform, int index, int rowIndex)
        {
            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = updateInform.Username;
            worksheet.Cells[rowIndex, colIndex++].Value = GetInformStatusNameAsync(updateInform.InformHeadlineStatusId);
            worksheet.Cells[rowIndex, colIndex++].Value = updateInform.ClientUpdatedTime;
            worksheet.Cells[rowIndex, colIndex++].Value = NormalizeLineBreaks(HttpUtility.HtmlDecode(updateInform.Remark));
            worksheet.Cells[rowIndex, colIndex++].Value = updateInform.Handler;
            worksheet.Cells[rowIndex, colIndex++].Value = GetStationNameAsync(updateInform.Extension);
            worksheet.Cells[rowIndex, colIndex++].Value = GetProductStatusNameAsync(updateInform.ProductStatus);

            Color colHeadline = ColorTranslator.FromHtml("#d0e6f4");
            Color colDirect = ColorTranslator.FromHtml("#f1f1f1");
            if (updateInform.GroupId > 0)
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, TotalCols], colHeadline);
            }
            else
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
            const int RowHeight = 15;
            const int ColumnDirectAccount = 1;
            const int ColumnStatus = 2;
            const int ColumnUpdateTime = 3;
            const int ColumnRemark = 4;
            const int ColumnHandler = 5;
            const int ColumnExtension = 6;
            const int ColumnProductStatus = 7;

            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(ColumnDirectAccount).Width = WidthLarge;
            worksheet.Column(ColumnStatus).Width = WidthSmall;
            worksheet.Column(ColumnUpdateTime).Width = WidthNormal;
            worksheet.Column(ColumnRemark).Width = WidthLargest;
            worksheet.Column(ColumnHandler).Width = WidthSmall;
            worksheet.Column(ColumnExtension).Width = WidthSmall;
            worksheet.Column(ColumnProductStatus).Width = WidthSmall;

            for (var index = 0; index < updateInforms.Count(); index++)
            {
                worksheet.Row(RowStartBody + index).Height = RowHeight;
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
            var informStatuses = informHeadlineService.GetInformStatuses().Result;
            var item = informStatuses.FirstOrDefault(x => x.SettingId == id);
            return item == null ? string.Empty : item.SettingValue;
        }

        private string GetStationNameAsync(int id)
        {
            var informStations = settingService.GetStations().Result;
            var item = informStations.FirstOrDefault(x => x.StationId == id);
            return item == null ? ViewResources.Symbol_NotApply : item.Name;
        }

        private string GetProductStatusNameAsync(int id)
        {
            var informProductStatuses = settingService.GetStatusAsync(ViewTypeConstants.InformHeadline).Result;
            var item = informProductStatuses.FirstOrDefault(x => x.StatusId == id);
            return item == null ? ViewResources.Symbol_NotApply : item.Name;
        }
    }
}
