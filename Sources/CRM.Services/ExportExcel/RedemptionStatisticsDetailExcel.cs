namespace CRM.Services.ExportExcel
{
    using System.Collections.Generic;
    using System.Globalization;
    using CRM.Core;
    using CRM.Models.Report.RedemptionStatistics;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class RedemptionStatisticsDetailExcel : ExcelBase
    {
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte TotalColumns = 7;
        private const byte WidthSmall = 15;
        private const byte WidthNormal = 18;
        private const byte WidthBig = 23;
        private const byte WidthLarge = 45;


        private readonly IList<RedemptionStatisticsDetailEntity> redemptionStatisticsDetails;

        public RedemptionStatisticsDetailExcel(string templatePath,
            IList<RedemptionStatisticsDetailEntity> redemptionStatisticsDetails
            )
            : base(templatePath, 0, ViewResources.RedemptionStatisticsDetail)
        {
            this.redemptionStatisticsDetails = redemptionStatisticsDetails;
            
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var colIndex = 1;
            int rowIndex = RowStartBody;
            for (var index = 0; index < redemptionStatisticsDetails.Count; index++)
            {
                colIndex = 1;
                var detail = redemptionStatisticsDetails[index];
                worksheet.Cells[rowIndex, colIndex++].Value = detail.ClaimTime.ToShortDateFormat();
                worksheet.Cells[rowIndex, colIndex++].Value = detail.UserName;
                worksheet.Cells[rowIndex, colIndex++].Value = detail.Subject;
                worksheet.Cells[rowIndex, colIndex++].Value = detail.Currency;
                worksheet.Cells[rowIndex, colIndex++].Value = detail.Amount.ToString(CultureInfo.InvariantCulture);
                worksheet.Cells[rowIndex, colIndex++].Value = detail.Status;
                worksheet.Cells[rowIndex, colIndex].Value = detail.DoneBy;

                if ((index & 1) == 0)
                {
                    SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
                }
                rowIndex++;
            }
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetStyle(worksheet);
            SetWidthColumn(worksheet);
            DrawBorderCell(worksheet.Cells[RowStartBody, 1, RowStartBody + redemptionStatisticsDetails.Count - 1, TotalColumns]);
        }
        

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            const byte currencyColumn = 4;
            StyleDefault(worksheet);
            worksheet.Column(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Column(currencyColumn).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const byte CustomerColumn = 2;
            const byte SubjectColumn = 3;
            const byte CurrencyColumn = 4;
            const byte AmountColumn = 5;
            const byte StatusColumn = 6;
            const byte DoneByColumn = 7;

            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Column(1).Width = WidthNormal;
            worksheet.Column(CustomerColumn).Width = WidthBig;
            worksheet.Column(CurrencyColumn).Width = WidthSmall;
            worksheet.Column(StatusColumn).Width = WidthSmall;
            worksheet.Column(AmountColumn).Width = WidthSmall;
            worksheet.Column(SubjectColumn).Width = WidthLarge;
            worksheet.Column(DoneByColumn).Width = WidthSmall;
        }
    }
}