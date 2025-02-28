namespace CRM.Services.UnitTests.ExportExcel;

using CRM.Models.Report.WagerReport;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Xunit;

public class WagerReportExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private WagerReportModel reportInfo;

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
        Assert.Equal(reportInfo.ReportTitle, worksheet.Cells[1, 1].Value);
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
        service.Received().Protected("SetValueRow", reportInfo.GrandTotal, worksheet);
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
    public void SetValueRow_WhenCalledWithReportsCountGreaterOne_ExpectedCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();
        var report = CreateReportInfo();
        var lastCol = 4;
        var rowIndex = 5;

        // Act
        service.Public_SetValueRow(report.GrandTotal, worksheet);

        // Assert
        Assert.True(worksheet.Cells[rowIndex, 1, report.GrandTotal.Wagers.Count, 1].Merge);
        Assert.True(worksheet.Cells[rowIndex, lastCol, report.GrandTotal.Wagers.Count, lastCol].Merge);
        Assert.Equal(report.GrandTotal.Wagers.First().Name, worksheet.Cells[rowIndex, 1].Value);
    }

    [Fact]
    public void SetBackgroundTotalRow_WhenCalled_CallProtectedSetBackgroundAndExpectedBackground()
    {
        // Arrange
        var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
        var service = CreateService();

        // Act
        service.Public_SetBackgroundTotalRow(cell);

        // Assert
        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
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
    private WagerReportExcelTestable CreateService()
    {
        reportInfo = CreateReportInfo();
        var excel = Substitute.For<WagerReportExcelTestable>(string.Empty, reportInfo, 2021);
        return excel;
    }
    private WagerReportModel CreateReportInfo()
    {
        var grandTotal = new WagerByMonth
        {
            Month = "test",
            Total = 65,
            Wagers = new List<Wager>{
                new()
                {
                    Id = 0,
                    Name = "test",
                    Amount = 10
                },
                new()
                {
                    Id = 0,
                    Name = "test",
                    Amount = 10
                },
                new()
                {
                    Id = 0,
                    Name = "test",
                    Amount = 10
                }
            }
        };

        var wagerByMonths = new List<WagerByMonth>
        {
            new()
            {
                Month = "test",
                Total= 65,
                Wagers = new List<Wager>{
                    new()
                    {
                        Id = 0,
                        Name = "test",
                        Amount = 10
                    },
                    new()
                    {
                        Id = 0,
                        Name = "test",
                        Amount = 10
                    },
                    new()
                    {
                        Id = 0,
                        Name = "test",
                        Amount = 10
                    }
                }
            }
        };

        return new WagerReportModel
        {
            GrandTotal = grandTotal,
            WagerByMonths = wagerByMonths,
            ReportTitle = "test"
        };
    }
    #endregion Helpers
}