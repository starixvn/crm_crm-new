namespace CRM.Services.UnitTests.ExportExcel
{
    using Microsoft.AspNetCore.Hosting;
    using NSubstitute;
    using Xunit;

    public class PicAssignmentExcelTests
    {
        private IHostingEnvironment hostingEnvironment;
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();

        [Fact]
        public void Public_RenderTitleAndHeader_WhenCalled_ExpectedCopyRows()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Act
            excel.Public_RenderTitleAndHeader(templateWorksheet, worksheet);

            // Assert
            Assert.Equal(templateWorksheet.Cells[1, 1, 4, 10], worksheet.Cells[1, 1, 4, 10]);
        }

        #region Helpers

        private PicAssignmentExcelTestable CreateExcel()
        {
            hostingEnvironment = Substitute.For<IHostingEnvironment>();
            var excel = Substitute.For<PicAssignmentExcelTestable>(hostingEnvironment);
            return excel;
        }

        #endregion Helpers
    }
}