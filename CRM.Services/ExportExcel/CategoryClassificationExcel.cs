namespace CRM.Services.ExportExcel
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Models.AdminTool.CategoryClassification;
    using CRM.Models.ChatTypeMapping;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class CategoryClassificationExcel : ExcelBase
    {
        private const byte RowStartHeaderChatType = 4;
        private const byte RowStartBody = 5;
        private const byte TotalColumnsChatType = 3;

        private readonly IEnumerable<CategoryClassification> categoryClassifications;

        public CategoryClassificationExcel(string templatePath, IEnumerable<CategoryClassification> categoryClassifications)
            : base(templatePath, 0, ViewResources.CategoryClassification)
        {
            this.categoryClassifications = categoryClassifications;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeaderChatType - 1, TotalColumnsChatType]
                .Copy(worksheet.Cells[1, 1, RowStartHeaderChatType - 1, TotalColumnsChatType]);
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType]
                .Copy(worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var rowNum = 0;
            foreach (var category in categoryClassifications)
            {
                rowNum++;
                RenderRow(category, rowNum, worksheet);
            }
        }

        protected internal virtual void RenderRow(CategoryClassification category, int rowNum, ExcelWorksheet worksheet)
        {
        }
    }
}
