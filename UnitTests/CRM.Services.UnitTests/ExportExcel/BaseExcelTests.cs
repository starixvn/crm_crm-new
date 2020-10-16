namespace CRM.Services.UnitTests.ExportExcel
{
    using System.Drawing;
    using OfficeOpenXml.Style;
    using Xunit;

    public class BaseExcelTests
    {
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();

        [Fact]
        public void RenderTitleAndHeader_WhenCalled_ExpectedCopyRows()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = new BaseExcelTestable();

            // Act
            service.Public_RenderTitleAndHeader(templateWorksheet, worksheet, 4, 4);

            // Assert
            Assert.Equal(templateWorksheet.Cells[1, 1, 4, 4], worksheet.Cells[1, 1, 4, 4]);
        }

        [Fact]
        public void DrawBorderCell_WhenCalled_CellHaveBorderStyleIsThin()
        {
            // Arrange
            var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
            var service = new BaseExcelTestable();

            // Act
            service.Public_DrawBorderCell(cell);

            // Assert
            Assert.Equal(ExcelBorderStyle.Thin, cell.Style.Border.Top.Style);
            Assert.Equal(ExcelBorderStyle.Thin, cell.Style.Border.Left.Style);
            Assert.Equal(ExcelBorderStyle.Thin, cell.Style.Border.Bottom.Style);
            Assert.Equal(ExcelBorderStyle.Thin, cell.Style.Border.Right.Style);
        }

        [Fact]
        public void StyleDefault_WhenCalled_ExpectedStyle()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = new BaseExcelTestable();

            // Act
            service.Public_StyleDefault(worksheet);

            // Assert
            Assert.Equal(8, worksheet.Cells.Style.Font.Size);
            Assert.Equal("Tahoma", worksheet.Cells.Style.Font.Name);
            Assert.Equal(ExcelVerticalAlignment.Center, worksheet.Cells.Style.VerticalAlignment);
            Assert.True(worksheet.Cells.Style.WrapText);
        }

        [Fact]
        public void SetBackgroudColor_WhenCalled_ExpectedBackground()
        {
            // Arrange
            var cell = excelPackage.Worksheets.Add("data").Cells[1,1];
            var expectedColor = "FFCC66";
            var color = ColorTranslator.FromHtml($"#{expectedColor}");
            var service = new BaseExcelTestable();

            // Act
            service.Public_SetBackgroundColor(cell, color);

            // Assert
            Assert.Equal(ExcelFillStyle.Solid, cell.Style.Fill.PatternType);
            Assert.Equal($"FF{expectedColor}", cell.Style.Fill.BackgroundColor.Rgb);
        }
    }
}
