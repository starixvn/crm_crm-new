namespace CRM.Services.UnitTests.ExportExcel;

using CRM.Models.Report.CategoriesSummaryReport;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using System.Collections.Generic;
using System.Drawing;
using Xunit;
public class SummaryReportExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private SummaryReportModel reportInfo;

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
        service.Received().Protected("SetValueMonths", reportInfo, worksheet);
        service.Received().Protected("SetValueRow", reportInfo, worksheet);
        service.Received().Protected("SetValueGrandTotal", reportInfo, worksheet);
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
        service.Received().Protected("SetBackground", Arg.Any<ExcelRange>());
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
        service.Public_SetValueRow(report, worksheet);

        // Assert
        Assert.True(worksheet.Cells[rowIndex, 1, report.CategorySummaries.Count, 1].Merge);
        Assert.True(worksheet.Cells[rowIndex, lastCol, report.CategorySummaries.Count, lastCol].Merge);
        Assert.Equal(report.CategorySummaries[0].Name, worksheet.Cells[rowIndex, 1].Value);
    }

    [Fact]
    public void SetValueRow_WhenCalledWithReportsCountEqualOne_ExpectedCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();
        var report = CreateReportInfo();
        var categorySummaries = report.CategorySummaries[0];
        var rowIndex = 5;
        report.CategorySummaries = new List<CategorySummary>
        {
            categorySummaries
        };

        // Act
        service.Public_SetValueRow(report, worksheet);

        // Assert
        Assert.Equal(report.CategorySummaries[0].Name, worksheet.Cells[rowIndex, 1].Value);
    }

    [Fact]
    public void SetBackgroundColor_WhenCalled_CallProtectedSetBackgroundAndExpectedBackground()
    {
        // Arrange
        var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
        var service = CreateService();

        // Act
        service.Public_SetBackground(cell);

        // Assert
        service.Received().Protected("SetBackgroundColor", cell, Arg.Any<Color>());
        Assert.True(cell.Style.Font.Bold);
    }

    [Fact]
    public void SetBackgroundCategories_WhenCalled_CallProtectedSetBackgroundAndExpectedBackground()
    {
        // Arrange
        var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
        var service = CreateService();

        // Act
        service.Public_SetBackgroundCategories(cell);

        // Assert
        service.Received().Protected("SetBackgroundColor", cell, Arg.Any<Color>());
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
        Assert.Equal(45, worksheet.Column(1).Width);
    }

    #region Helpers
    private SummaryReportExcelTestable CreateService()
    {
        reportInfo = CreateReportInfo();
        var excel = Substitute.For<SummaryReportExcelTestable>(string.Empty, reportInfo, 2021);
        return excel;
    }


    private SummaryReportModel CreateReportInfo()
    {
        var title = "Categories Summary Report For Year 2021";
        var months = new List<string>{ "FEB", "APR", "SEP" };
        var grandTotals = new List<Summary>
        {
            new(){
                Amount =1,
                Month = "FEB"
            },
            new(){
                Amount =1,
                Month = "APR"
            },
            new(){
                Amount =1,
                Month = "SEP"
            }
        };
        var subCategories = new List<CategorySummary>
        {
            new(){
                Id = 4014,
                Name = "Super/Master/Agent",
                SubCategories = null,
                Summaries = grandTotals
            }
        };
        var categorySummaries = new List<CategorySummary>
        {          
            new()
            {
                Id = 3003,
                Name = "Open Account",
                SubCategories = subCategories,
                Summaries = grandTotals
            }
        };

        return new SummaryReportModel
        {
            ReportTitle = title,
            CategorySummaries = categorySummaries,
            GrandTotals = grandTotals,
            Months = months
        };
    }
    #endregion Helpers
}