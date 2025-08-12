using System.Collections.Generic;
using CRM.Models.ManageSmaFeedback;
using CRM.Services.ExportExcel;
using OfficeOpenXml;

namespace CRM.Services.UnitTests.ExportExcel.TestableClasses
{
    public class ManageSmaFeedbackExcelTestable(
        string templatePath,
        IEnumerable<SmaFeedbackInfo> smaFeedbackInfos,
        string titleExcel) : ManageSmaFeedbackExcel(templatePath, smaFeedbackInfos, titleExcel)
    {
        public void Public_RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            base.RenderTitle(templateWorksheet, worksheet);
        }

        public void Public_RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            base.RenderHeader(templateWorksheet, worksheet);
        }

        public void Public_RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            base.RenderBody(templateWorksheet, worksheet);
        }

        public void Public_RenderRow(ExcelWorksheet worksheet, SmaFeedbackInfo smaFeedbackInfo, int index, int rowIndex)
        {
            base.RenderRow(worksheet, smaFeedbackInfo, index, rowIndex);
        }

        public void Public_ProcessUI(ExcelWorksheet worksheet)
        {
            base.ProcessUI(worksheet);
        }
    }
}
