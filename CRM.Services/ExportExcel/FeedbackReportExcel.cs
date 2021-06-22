namespace CRM.Services
{
    using CRM.Core.Models.Feedback;
    using CRM.Resources;
    using OfficeOpenXml;
    using System.Collections.Generic;
    using System.Linq;

    internal class FeedbackReportExcel : ExcelBase
    {
        private readonly IEnumerable<FeedbackDetail> feedbacks;

        private const byte RowStartBody = 6;
        private const byte RowStartHeader = 4;
        private const byte StartComToolsIndex = 7;

        public FeedbackReportExcel(string templatePath, IEnumerable<FeedbackDetail> feedbacks) : base(templatePath, 0, ViewResources.LatestFeedback)
        {
            this.feedbacks = feedbacks;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, StartComToolsIndex - 1]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, StartComToolsIndex - 1]);
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]
              .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            int rowIndex = RowStartBody;
            for (var index = 0; index < feedbacks.Count() - 1; index++)
            {
                RenderRow(worksheet, feedbacks.ToList()[index], index + 1, rowIndex++);
            }
        }

        private void RenderRow(ExcelWorksheet worksheet, FeedbackDetail feedbackDetail, int index, int rowIndex)
        {
            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.FeedbackId;
            worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.Subject;
            worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.FeedbackDateString;
            worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.Status;
            worksheet.Cells[rowIndex, colIndex++].Value = feedbackDetail.RelatedCustomer;
            
            if ((index & 1) == 0)
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
            }
        }
    }
}