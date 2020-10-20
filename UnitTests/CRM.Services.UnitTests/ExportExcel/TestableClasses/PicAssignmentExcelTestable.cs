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
            base.RenderTitle(templateWorksheet, worksheet);
        }

        public void Public_RenderHeader(ExcelWorksheet template, ExcelWorksheet worksheet)
        {
            base.RenderHeader(template, worksheet);
        }

        public void Public_RenderBody(ExcelWorksheet template, ExcelWorksheet worksheet)
        {
            base.RenderBody(template, worksheet);
        }

        public byte Public_GetTemplateRowIndex(string status)
        {
            return base.GetTemplateRowIndex(status);
        }

        public void Public_StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            base.StyleMergeCell(worksheet, startRow, colIndex, endRow);
        }

        public string Public_GetPicCell(IEnumerable<PicModel> picList)
        {
            return base.GetPicCell(picList);
        }
    }
}