namespace CRM.Services.UnitTests.ExportExcel
{
    using System.Collections.Generic;
    using System.Drawing;
    using AutoFixture;
    using CRM.Models.Report;
    using CRM.Resources;
    using CRM.Services.UnitTests.ExportExcel.TestableClasses;
    using NSubstitute;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    using Xunit;

    public class IssueStatisticsExcelTests
    {
        private readonly IFixture fixture = new Fixture();
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();
        private IssuesStatisticsReportInfo issuesStatistics;
        private string titleExcel;
        private const int TotalColumns = 4;
        private const int RowStartBody = 5;
        private const byte RowStartHeader = 4;
        private const byte StartCountryColumnIndex = 2;

        protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);
        protected static readonly Color HeaderTitleColor = Color.FromArgb(60, 94, 165);

        [Fact]
        public void RenderTitle_WhenCalled_ExpectedCopyRow()
        {
            //Arrange
            var template = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_RenderTitle(template, worksheet);

            // Assert
            Assert.Equal(titleExcel, worksheet.Cells[1, 1].Value);
        }

        [Fact]
        public void Public_RenderHeader_WhenCalled_CopysHeaderFromTemplate()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var country = "Afghanistan";
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Action
            excel.Public_RenderHeader(templateWorksheet, worksheet);

            // Assert
            Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartCountryColumnIndex],
                worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartCountryColumnIndex]);
            Assert.Equal(country, worksheet.Cells[RowStartHeader, StartCountryColumnIndex + 1].Value);
            Assert.Equal(ViewResources.Total, worksheet.Cells[RowStartHeader, StartCountryColumnIndex + 2].Value);
        }

        [Fact]
        public void RenderBody_WhenCalled_CallExpectedMethod()
        {
            //Arrange
            var template = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_RenderBody(template, worksheet);

            // Assert
            Assert.Equal("2021-01-01", worksheet.Cells[5, 1].Value);
            Assert.Equal("11:16", worksheet.Cells[5, 2].Value);
            Assert.Equal(1, worksheet.Cells[5, 3].Value);
            Assert.Equal(1, worksheet.Cells[5, 4].Value);
            Assert.Equal("Total for Mar 01, 2022", worksheet.Cells[6, 1].Value);
            Assert.Equal(string.Empty, worksheet.Cells[6, 2].Value);
            Assert.Equal(1, worksheet.Cells[6, 3].Value);
            Assert.Equal(0, worksheet.Cells[6, 4].Value);

            service.DidNotReceive().Protected("RenderMergeCountryInfo",
                worksheet, Arg.Any<int>(), Arg.Any<IList<IssuesStatisticsReportInfo>>(), Arg.Any<int>());
            service.Received().Protected("RendeGrandTotal", 
                worksheet, Arg.Any<IList<IssuesStatisticsReportInfo>>(), Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
            service.Received().Protected("SetBackgroundChildTotalRow", Arg.Any<ExcelRange>());
            service.Received(2).Protected("DrawBorderCell", Arg.Any<ExcelRange>());
        }

        [Fact]
        public void ProcessUI_WhenCalled_CallExpectedMethod()
        {
            //Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_ProcessUI(worksheet);

            // Assert
            service.Received().Protected("SetStyle", worksheet);
            service.Received().Protected("SetWidthColumn", worksheet);
        }

        [Fact]
        public void SetStyle_WhenCalled_ExpectedStyle()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_SetStyle(worksheet);

            // Assert
            Assert.True(worksheet.Cells[1, 1, 1 + 1, TotalColumns].Merge);
            Assert.True(worksheet.Cells[3, 1, 3, TotalColumns].Merge);
            service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), HeaderTitleColor);
            Assert.Equal(ExcelHorizontalAlignment.Center, 
            worksheet.Cells[RowStartHeader, StartCountryColumnIndex + 1, RowStartHeader, TotalColumns].Style.HorizontalAlignment);

        }

        #region Helpers

        private IssueStatisticsExcelTestable CreateExcel()
        {
            issuesStatistics = new IssuesStatisticsReportInfo
            {
                Name = "Daily Issue Statistic Report From Mar 01, 2022 To Mar 22, 2022",
                ShortName = "2021-01-01",
                ReportTypeId = 1,
                NumberOfIssues = 1,
                TotalChildReports = 1,
                CountryInfo = new Models.Country { Id = 1, Name = "Afghanistan" },
                ChildReports = new List<IssuesStatisticsReportInfo>
                {
                    new IssuesStatisticsReportInfo
                    {
                        ShortName = "2021-01-01",
                        NumberOfIssues = 1,
                        ChildReports = new List<IssuesStatisticsReportInfo>
                        {
                            new IssuesStatisticsReportInfo
                            {
                                ShortName = "11:16",
                                NumberOfIssues = 1,
                                ChildReports = new List<IssuesStatisticsReportInfo>
                                {
                                    new IssuesStatisticsReportInfo
                                    {
                                        ShortName = "10:16",
                                        NumberOfIssues = 1
                                    }
                                }
                            }

                        },
                        Total = new IssuesStatisticsReportInfo
                        {
                            ShortName = "Total for Mar 01, 2022",
                            ChildReports = new List<IssuesStatisticsReportInfo>
                            {
                                new IssuesStatisticsReportInfo {NumberOfIssues = 1}
                            }
                        }
                    }
                },
                Total = new IssuesStatisticsReportInfo
                {
                    Name = "GrandTotal",
                    NumberOfIssues = 1,
                    ChildReports = new List<IssuesStatisticsReportInfo> {
                            new IssuesStatisticsReportInfo {
                                ShortName = "11:16",
                                CountryInfo = new Models.Country{Id = 1, Name = "Afghanistan"}
                            }
                        }
                }
            };

            titleExcel = "titleExcel";
            return Substitute.For<IssueStatisticsExcelTestable>(string.Empty, issuesStatistics, titleExcel);
        }

        #endregion Helpers
    }
}
