namespace CRM.Services.UnitTests.ExportExcel
{
    using System.Collections.Generic;
    using CRM.Models.PicAndHeadline;
    using NSubstitute;
    using Xunit;

    public class PicAssignmentExcelTests
    {
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();

        [Fact]
        public void Public_RenderTitleAndHeader_WhenCalled_ExpectedCopyRows()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Act
            excel.Public_RenderTitle(templateWorksheet, worksheet);

            // Assert
            Assert.Equal(templateWorksheet.Cells[1, 1, 3, 10], worksheet.Cells[1, 1, 3, 10]);
        }

        #region Helpers

        private PicAssignmentExcelTestable CreateExcel(IEnumerable<PICAssignmentInfo> assignments = null)
        {
            var excel = Substitute.For<PicAssignmentExcelTestable>(string.Empty, assignments);
            return excel;
        }

        #endregion Helpers
    }
}