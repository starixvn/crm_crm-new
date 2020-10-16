namespace CRM.Services.UnitTests.ExportExcel
{
    using System.Collections.Generic;
    using System.Drawing;
    using System.IO;
    using CRM.Models.Report.SettlementReport;
    using Microsoft.AspNetCore.Hosting;
    using NSubstitute;
    using OfficeOpenXml;
    using Xunit;

    public class SettlementReportExcelTests
    {
        private IHostingEnvironment hostingEnvironment;
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();

        [Fact]
        public void Export_WhenCalled_CallExpectedMethodAndReturnExpected()
        {
            // Arrange
            var excel = CreateExcel();
            var report = CreateReportInfo();
            var lastCol = 4;

            // Act
            var result = excel.Export(report);

            // Assert
            excel.Received().Protected("SetDefaultStyle", Arg.Any<ExcelWorksheet>());
            excel.Received().Protected("RenderTitleAndHeader",
                Arg.Any<ExcelWorksheet>(), Arg.Any<ExcelWorksheet>(), 4, lastCol);
            excel.Received().Protected("SetValueRow", Arg.Any<int>(), report.ChildReports[0], Arg.Any<ExcelWorksheet>());
            excel.Received().Protected("SetValueRow", Arg.Any<int>(), report.ChildReports[1], Arg.Any<ExcelWorksheet>());
            excel.Received().Protected("SetValueRow", Arg.Any<int>(), report.Total, Arg.Any<ExcelWorksheet>());
            excel.Received().Protected("SetBackgroundTotalRow", Arg.Any<ExcelRange>());
            excel.Received().Protected("DrawBorderCell", Arg.Any<ExcelRange>());
            using (var stream = new MemoryStream(result))
            using (var package = new ExcelPackage(stream))
            {
                Assert.Equal(report.Name, package.Workbook.Worksheets[0].Cells[1, 1].Value);
            }
        }

        [Fact]
        public void SetValueRow_WhenCalledWithChildReportsCountGreaterOne_ExpectedCellValue()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            var report = CreateReportInfo();
            var lastCol = 4;

            // Act
            excel.Public_SetValueRow(1, report, worksheet);

            // Assert
            Assert.True(worksheet.Cells[1, 1, report.ChildReports.Count, 1].Merge);
            Assert.True(worksheet.Cells[1, lastCol, report.ChildReports.Count, lastCol].Merge);
            Assert.Equal(report.Name, worksheet.Cells[1, 1].Value);
            Assert.Equal(report.ChildReports[0].Name, worksheet.Cells[1,2].Value);
            Assert.Equal(report.ChildReports[0].NumberOfIssues, worksheet.Cells[1, 3].Value);
            Assert.Equal(report.ChildReports[1].Name, worksheet.Cells[2, 2].Value);
            Assert.Equal(report.ChildReports[1].NumberOfIssues, worksheet.Cells[2, 3].Value);
            Assert.Equal(report.NumberOfIssues, worksheet.Cells[1, lastCol].Value);
        }

        [Fact]
        public void SetValueRow_WhenCalledWithChildReportsCountEqualOne_ExpectedCellValue()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            var report = CreateReportInfo();
            report.NumberOfIssues = 1;
            var childReport = report.ChildReports[0];
            report.ChildReports = new List<SettlementReportInfo>
            {
                childReport
            };
            var lastCol = 4;

            // Act
            excel.Public_SetValueRow(1, report, worksheet);

            // Assert
            Assert.Equal(report.Name, worksheet.Cells[1, 1].Value);
            Assert.Equal(report.ChildReports[0].Name, worksheet.Cells[1, 2].Value);
            Assert.Equal(report.ChildReports[0].NumberOfIssues, worksheet.Cells[1, 3].Value);
            Assert.Equal(report.NumberOfIssues, worksheet.Cells[1, lastCol].Value);
        }

        [Fact]
        public void SetBackgroundTotalRow_WhenCalled_CallProtectedSetBackgroundAndExpectedBackground()
        {
            // Arrange
            var cell = excelPackage.Worksheets.Add("data").Cells[1,1];
            var excel = CreateExcel();
            var white = Color.White;
            var expectedColor = $"FF{white.R:X2}{white.G:X2}{white.B:X2}";

            // Act
            excel.Public_SetBackgroundTotalRow(cell);

            // Assert
            excel.Received().Protected("SetBackgroudColor", cell, Arg.Any<Color>());
            Assert.Equal(expectedColor, cell.Style.Font.Color.Rgb);
            Assert.True(cell.Style.Font.Bold);
        }

        [Fact]
        public void SetDefaultStyle_WhenCalled_ExpectedStyle()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Act
            excel.Public_SetDefaultStyle(worksheet);

            // Assert
            excel.Received().Protected("StyleDefault", worksheet);
            Assert.Equal(15, worksheet.Column(1).Width);
            Assert.Equal(25, worksheet.Column(2).Width);
            Assert.Equal(25, worksheet.Column(3).Width);
            Assert.Equal(20, worksheet.Column(4).Width);
        }

        #region Helpers

        private SettlementReportExcelTestable CreateExcel()
        {
            hostingEnvironment = Substitute.For<IHostingEnvironment>();
            hostingEnvironment.ContentRootPath.Returns(Directory.GetCurrentDirectory() + "/ExcelTemplates");
            var excel = Substitute.For<SettlementReportExcelTestable>(hostingEnvironment);
            return excel;
        }

        private SettlementReportInfo CreateReportInfo()
        {
            var childReportItaly = new SettlementReportInfo
            {
                Id = 100,
                Name = "Italy",
                NumberOfIssues = 1
            };
            var childReportAruba = new SettlementReportInfo
            {
                Id = 14,
                Name = "Aruba",
                NumberOfIssues = 1
            };
            var templates = new SettlementReportInfo
            {
                TotalChildReports = 2,
                Name = "Settlement Issues Report For Year 2020",
                Total = new SettlementReportInfo(),
                NumberOfIssues = 2
            };
            templates.ChildReports = new List<SettlementReportInfo>
            {
                childReportItaly,
                childReportAruba
            };

            return templates;
        }

        #endregion Helpers
    }
}
