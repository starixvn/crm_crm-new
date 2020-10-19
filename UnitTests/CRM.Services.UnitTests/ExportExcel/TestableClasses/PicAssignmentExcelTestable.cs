namespace CRM.Services.UnitTests.ExportExcel
{
    using System.Collections.Generic;
    using CRM.Models.PicAndHeadline;
    using OfficeOpenXml;

    public class PicAssignmentExcelTestable : PicAssignmentExcel
    {
        public PicAssignmentExcelTestable(string templatePath, IEnumerable<PICAssignmentInfo> assignments)
            : base(templatePath, assignments)
        {
        }

        public void Public_RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            this.RenderTitle(templateWorksheet, worksheet);
        }
    }
}