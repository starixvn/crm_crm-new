namespace CRM.Services.UnitTests.ExportExcel.TestableClasses
{
    using System.Collections.Generic;
    using CRM.Models.AdminTool.CategoryClassification;
    using CRM.Services.ExportExcel;
    using OfficeOpenXml;

    public class CategoryClassificationExcelTestable : CategoryClassificationExcel
    {
        public CategoryClassificationExcelTestable(
           string templatePath,
           IEnumerable<CategoryClassification> categoryClassifications) : base(templatePath, categoryClassifications)
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

        public void Public_RenderRow(CategoryClassification category, ExcelWorksheet worksheet)
        {
            base.RenderRow(category, worksheet);
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
