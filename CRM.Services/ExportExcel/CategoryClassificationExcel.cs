namespace CRM.Services.ExportExcel
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Models.AdminTool.CategoryClassification;
    using CRM.Resources;
    using HtmlAgilityPack;
    using OfficeOpenXml;

    public class CategoryClassificationExcel : ExcelBase
    {
        private const byte RowStartHeaderChatType = 4;
        private const byte RowStartBody = 5;
        private const byte TotalColumnsChatType = 3;
        private int rowIndex = RowStartBody;
        private int rowIndexChild = RowStartBody;

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
            const int colIndex = 1;
            var groupCategory = categoryClassifications.GroupBy(x => x.MainCategoryID);

            foreach (var category in groupCategory)
            {
                int numberChildCate = category.Count();
                StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + numberChildCate - 1);
                worksheet.Cells[rowIndex, colIndex].Value = category.First().MainCategory;
                foreach (var item in category)
                {
                    RenderRow(item, worksheet);
                }
                rowIndex = rowIndex + numberChildCate;
            }
        }

        protected internal virtual void RenderRow(CategoryClassification category, ExcelWorksheet worksheet)
        {
            int colIndex = 2;
            worksheet.Cells[rowIndexChild, colIndex++].Value = category.SubCategory;
            worksheet.Cells[rowIndexChild, colIndex].Value = category.Remark != null ? ConvertHtmlToPlainText(category.Remark) : category.Remark;
            rowIndexChild++;
        }

        private static string ConvertHtmlToPlainText(string html)
        {
            HtmlDocument doc = new();
            doc.LoadHtml(html);

            return doc.DocumentNode.InnerText;
        }

        protected internal virtual void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetStyle(worksheet);
            SetWidthColumn(worksheet);
        }

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthNormal = 30;
            const int RowHeight = 60;
            const int WidthLarge = 80;
            const int ColumnCategory = 1;
            const int ColumnSubCategory = 2;
            const int ColumnRemark = 3;
            const int TotalColumn = 3;
            worksheet.DefaultColWidth = WidthLarge;
            worksheet.Cells.AutoFitColumns();

            worksheet.Column(ColumnCategory).Width = WidthNormal;
            worksheet.Column(ColumnSubCategory).Width = WidthNormal;
            worksheet.Column(ColumnRemark).Width = WidthLarge;
            worksheet.Column(ColumnRemark).AutoFit();

            for (var index = 0; index < categoryClassifications.Count(); index++)
            {
                worksheet.Row(RowStartBody + index).Height = RowHeight;
                DrawBorderCell(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumn]);
            }
        }
    }
}
