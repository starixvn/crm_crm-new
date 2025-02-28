namespace CRM.Services.UnitTests.ExportExcel;

using CRM.Models;
using CRM.Models.Report.LogStatistics;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Xunit;

public class LogStatisticsExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private LogStatisticsViewModel logStatistics;
    private int totalColumns;
    private const int RowStartBody = 6;
    private const byte RowStartHeader = 4;
    protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);
    protected static readonly Color TotalBackgroundColor = Color.FromArgb(240, 237, 196);
    protected static readonly Color GroupColor = Color.FromArgb(0, 0, 205);

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
        Assert.Equal("MBC Daily Log Statistics | Apr 24, 2022 - Apr 27, 2022", worksheet.Cells[1, 1].Value);
    }

    [Fact]
    public void Public_RenderHeader_WhenCalled_CopysHeaderFromTemplate()
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateExcel();

        // Action
        excel.Public_RenderHeader(templateWorksheet, worksheet);

        // Assert
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, 1],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, 1]);
        excel.Received().Protected("SetStyleHeaderCommunication", worksheet, 2, "Phone");
        excel.Received().Protected("SetStyleHeaderCommunication", worksheet, 3, "Total");
        excel.Received().Protected("SetStyleHeaderProduct", worksheet, 2, 3, "Sportsbook");
    }

    [Fact]
    public void RenderBody_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderBody(template, worksheet);

        // Assert
        service.Received().Protected("RenderRowValue", worksheet, logStatistics.MainCategories.First(), 6);
        service.Received().Protected("SetBackgroundTotalRow", Arg.Any<ExcelRange>());
        service.Received().Protected("SetStyleBodyMain", Arg.Any<ExcelRange>());
        service.Received().Protected("DrawBorderCell", Arg.Any<ExcelRange>());
    }

    [Fact]
    public void ProcessUI_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_ProcessUI(worksheet);

        // Assert
        service.Received().Protected("SetStyle", worksheet);
        service.Received().Protected("SetWidthColumn", worksheet);
    }

    [Fact]
    public void RenderRowValue_WhenCalledWithCountGreaterOne_ExpectedCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRowValue(worksheet, logStatistics.MainCategories.First(), 6);

        // Assert
        Assert.True(worksheet.Cells[RowStartBody, 1, logStatistics.MainCategories.Count(), 1].Merge);
        Assert.True(worksheet.Cells[RowStartBody, 2, logStatistics.MainCategories.Count(), 2].Merge);
        Assert.Equal(logStatistics.MainCategories.First().Name, worksheet.Cells[RowStartBody, 1].Value);
    }

    [Fact]
    public void SetBackgroundTotalRow_WhenCalled_CallProtectedSetBackgroundAndExpectedBackground()
    {
        // Arrange
        var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
        var service = CreateExcel();

        // Act
        service.Public_SetBackgroundTotalRow(cell);

        // Assert
        service.Received().Protected("SetBackgroundColor", cell, Arg.Any<Color>());
        Assert.True(cell.Style.Font.Bold);
    }


    [Fact]
    public void SetStyleHeader_WhenCalled_CallProtectedSetStyleHeader()
    {
        // Arrange
        var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
        var service = CreateExcel();

        // Act
        service.Public_SetStyleHeader(cell);

        // Assert
        service.Received().Protected("SetBackgroundColor", cell, Arg.Any<Color>());
        service.Received().Protected("DrawBorderCell", cell);
        Assert.True(cell.Style.Font.Bold);
    }

    [Fact]
    public void SetDefaultStyle_WhenCalled_ExpectedStyle()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_SetStyle(worksheet);

        // Assert
        service.Received().Protected("StyleDefault", worksheet);
        service.Received().Protected("DrawBorderCell", Arg.Any<ExcelRange>());
    }

    [Fact]
    public void SetWidthColumn_WhenCalled_ExpectedWidthColumn()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_SetWidthColumn(worksheet);

        // Assert
        Assert.Equal(35, worksheet.Column(1).Width);
        Assert.Equal(12, worksheet.DefaultColWidth);
    }

    [Fact]
    public void SetStyleBodyMain_WhenCalled_CallProtectedSetStyleBodyMain()
    {
        // Arrange
        var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
        var service = CreateExcel();

        // Act
        service.Public_SetStyleBodyMain(cell);

        // Assert
        service.Received().Protected("SetBackgroundColor", cell, Arg.Any<Color>());
        service.Received().Protected("SetColor", cell);
    }

    #region Helpers

    private LogStatisticsExcelTestable CreateExcel()
    {
        logStatistics = new LogStatisticsViewModel
        {
            Name = "MBC Daily Log Statistics | Apr 24, 2022 - Apr 27, 2022",
            ExcelFileName = "MBC_Daily_Log_Statistics_Apr_24_2022_Apr_27_2022",
            MainCategories = new List<LogStatisticsMainCategory>()
            {
                new()
                {
                    Id = 3000,
                    Name = "General Network/Database Issues",
                    SubCategories = new List<LogStatisticsBaseModel>()
                    {
                        new()
                        {
                            Id = 4029,
                            Name = "N/A"
                        }
                    }
                }
            },
            ProductColumns = new List<BaseModel>()
            {
                new()
                {
                    Id = 46000,
                    Name = "Sportsbook"
                }
            },
            CommunicationColumns = new List<BaseModel>()
            {
                new()
                {
                    Id = 1000,
                    Name = "Phone"
                }
            },
        };
        totalColumns = 2;
        return Substitute.For<LogStatisticsExcelTestable>(string.Empty, logStatistics, totalColumns);
    }
    #endregion Helpers
}