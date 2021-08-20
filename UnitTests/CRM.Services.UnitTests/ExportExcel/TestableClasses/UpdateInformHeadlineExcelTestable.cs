namespace CRM.Services.UnitTests.ExportExcel.TestableClasses
{
    using System.Collections.Generic;
    using CRM.Models.InformHeadline;
    using CRM.Services.ExportExcel;
    using CRM.Services.InformHeadline;
    using OfficeOpenXml;

    public class UpdateInformHeadlineExcelTestable : UpdateInformHeadlineExcel
    {
        public UpdateInformHeadlineExcelTestable(
            string templatePath,
            IEnumerable<UpdateInform> updateInforms,
            IInformHeadlineService informHeadlineService,
            ISettingService settingService,
            string informHeadlineTitle) : base(templatePath, updateInforms, informHeadlineService, settingService, informHeadlineTitle)
        {
        }

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

        public void Public_RenderRow(ExcelWorksheet worksheet, UpdateInform updateInform, int index, int rowIndex)
        {
            base.RenderRow(worksheet, updateInform, index, rowIndex);
        }

        public void Public_ProcessUI(ExcelWorksheet worksheet)
        {
            base.ProcessUI(worksheet);
        }

        public void Public_SetStyle(ExcelWorksheet worksheet)
        {
            base.SetStyle(worksheet);
        }

        public void Public_SetWidthColumn(ExcelWorksheet worksheet)
        {
            base.SetWidthColumn(worksheet);
        }
    }
}
