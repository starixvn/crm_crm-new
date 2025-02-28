namespace CRM.Services.UnitTests.ExportExcel;

using System.Drawing;
using CRM.Models.Report.SettlementReport;
using NSubstitute;
using OfficeOpenXml;
using TestableClasses;
using Xunit;

public class SettlementReportExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private SettlementReportInfo reportInfo;

    [Fact]
    public void RenderTitle_WhenCalled_ExpectedCopyRows()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderTitle(template, worksheet);

        // Assert
        Assert.Equal(template.Cells[1, 2, 3, 4], worksheet.Cells[1, 2, 3, 4]);
        Assert.Equal(reportInfo.Name, worksheet.Cells[1, 1].Value);
    }

    [Fact]
    public void RenderHeader_WhenCalled_ExpectedCopyRows()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderHeader(template, worksheet);

        // Assert
        Assert.Equal(template.Cells[4, 1, 4, 4], worksheet.Cells[4, 1, 4, 4]);
    }

    [Fact]
    public void RenderBody_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderBody(template, worksheet);

        // Assert
        service.Received().Protected("SetValueRow", reportInfo.ChildReports[0], worksheet);
        service.Received().Protected("SetValueRow", reportInfo.ChildReports[1], worksheet);
        service.Received().Protected("SetValueRow", reportInfo.Total, worksheet);
    }

    [Fact]
    public void ProcessUI_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_ProcessUI(worksheet);

        // Assert
        service.Received().Protected("SetDefaultStyle", worksheet);
        service.Received().Protected("SetBackgroundTotalRow", Arg.Any<ExcelRange>());
        service.Received().Protected("DrawBorderCell", Arg.Any<ExcelRange>());
    }

    [Fact]
    public void SetValueRow_WhenCalledWithChildReportsCountGreaterOne_ExpectedCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();
        var report = CreateReportInfo();
        var lastCol = 4;
        var rowIndex = 5;

        // Act
        service.Public_SetValueRow(report, worksheet);

        // Assert
        Assert.True(worksheet.Cells[rowIndex, 1, report.ChildReports.Count, 1].Merge);
        Assert.True(worksheet.Cells[rowIndex, lastCol, report.ChildReports.Count, lastCol].Merge);
        Assert.Equal(report.Name, worksheet.Cells[rowIndex, 1].Value);
        Assert.Equal(report.ChildReports[0].Name, worksheet.Cells[rowIndex, 2].Value);
        Assert.Equal(report.ChildReports[0].NumberOfIssues, worksheet.Cells[rowIndex, 3].Value);
        Assert.Equal(report.ChildReports[1].Name, worksheet.Cells[rowIndex + 1, 2].Value);
        Assert.Equal(report.ChildReports[1].NumberOfIssues, worksheet.Cells[rowIndex + 1, 3].Value);
        Assert.Equal(report.NumberOfIssues, worksheet.Cells[rowIndex, lastCol].Value);
    }

    [Fact]
    public void SetValueRow_WhenCalledWithChildReportsCountEqualOne_ExpectedCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();
        var report = CreateReportInfo();
        report.NumberOfIssues = 1;
        var childReport = report.ChildReports[0];
        var rowIndex = 5;
        report.ChildReports = [childReport];
        var lastCol = 4;

        // Act
        service.Public_SetValueRow(report, worksheet);

        // Assert
        Assert.Equal(report.Name, worksheet.Cells[rowIndex, 1].Value);
        Assert.Equal(report.ChildReports[0].Name, worksheet.Cells[rowIndex, 2].Value);
        Assert.Equal(report.ChildReports[0].NumberOfIssues, worksheet.Cells[rowIndex, 3].Value);
        Assert.Equal(report.NumberOfIssues, worksheet.Cells[rowIndex, lastCol].Value);
    }

    [Fact]
    public void SetBackgroundTotalRow_WhenCalled_CallProtectedSetBackgroundAndExpectedBackground()
    {
        // Arrange
        var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
        var service = CreateService();
        var white = Color.White;
        var expectedColor = $"FF{white.R:X2}{white.G:X2}{white.B:X2}";

        // Act
        service.Public_SetBackgroundTotalRow(cell);

        // Assert
        service.Received().Protected("SetBackgroundColor", cell, Arg.Any<Color>());
        Assert.Equal(expectedColor, cell.Style.Font.Color.Rgb);
        Assert.True(cell.Style.Font.Bold);
    }

    [Fact]
    public void SetDefaultStyle_WhenCalled_ExpectedStyle()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_SetDefaultStyle(worksheet);

        // Assert
        service.Received().Protected("StyleDefault", worksheet);
        Assert.Equal(15, worksheet.Column(1).Width);
        Assert.Equal(25, worksheet.Column(2).Width);
        Assert.Equal(25, worksheet.Column(3).Width);
        Assert.Equal(20, worksheet.Column(4).Width);
    }

    #region Helpers

    private SettlementReportExcelTestable CreateService()
    {
        reportInfo = CreateReportInfo();
        var excel = Substitute.For<SettlementReportExcelTestable>(string.Empty, reportInfo);
        return excel;
    }

    private SettlementReportInfo CreateReportInfo()
    {
        var childReportItaly = new SettlementReportInfo
        {
            Id = 0,
            Name = "Nov",
            NumberOfIssues = 1,
            ChildReports =
            [
                new SettlementReportInfo
                {
                    Id = 100,
                    Name = "Italy",
                    NumberOfIssues = 1,
                }
            ]
        };
        childReportItaly.ChildReports = [new SettlementReportInfo()];
        var childReportAruba = new SettlementReportInfo
        {
            Id = 0,
            Name = "Otc",
            NumberOfIssues = 1,
            ChildReports =
            [
                new SettlementReportInfo
                {
                    Id = 14,
                    Name = "Aruba",
                    NumberOfIssues = 1
                }
            ]
        };
        var total = new SettlementReportInfo
        {
            ChildReports = [new SettlementReportInfo()]
        };
        var templates = new SettlementReportInfo
        {
            TotalChildReports = 2,
            Name = "Settlement Issues Report For Year 2020",
            Total = total,
            NumberOfIssues = 2
        };
        templates.ChildReports =
        [
            childReportItaly,
            childReportAruba
        ];

        return templates;
    }

    #endregion Helpers
}