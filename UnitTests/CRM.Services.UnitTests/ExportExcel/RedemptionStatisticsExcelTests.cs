using System.Collections.Generic;
using System.Drawing;
using CRM.Models.Report.RedemptionStatistics;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using Xunit;

namespace CRM.Services.UnitTests.ExportExcel;

public class RedemptionStatisticsExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private const byte RowStartHeader = 4;
    private const byte TotalColumns = 3;

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
        Assert.Equal("Redemption Statistics Report from Mar 15, 2021 to Jan Mar 14, 2022", worksheet.Cells[1, 1].Value);
    }

    [Fact]
    public void Public_RenderHeader_WhenCalled_CopyHeaderFromTemplate()
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateExcel();

        // Action
        excel.Public_RenderHeader(templateWorksheet, worksheet);

        // Assert
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalColumns],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalColumns]);
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
        Assert.Equal("October 2021", worksheet.Cells[5, 1].Value);
        Assert.Equal("Euro", worksheet.Cells[5, 2].Value);
        Assert.Equal("2", worksheet.Cells[5, 3].Value);


        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
        service.Received().Protected("RenderTotal", worksheet, Arg.Any<int>());
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
    public void SetBackGroundColorTotal_WhenCalled_CallExpectedMethod()
    {
        //Arrange
        var service = CreateExcel();
        var worksheet = excelPackage.Worksheets.Add("data");
        var excelRange = worksheet.Cells[1, 1, 1, 1];

        // Act
        service.Public_SetBackGroundColorTotal(excelRange);

        // Assert
        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
    }

    [Fact]
    public void StyleMergeCell_WhenCalled_StylesCorrectly()
    {
        // Arrange
        const int startRow = 1;
        const int colIndex = 10;
        const int endRow = 1;
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Action
        service.Public_StyleMergeCell(worksheet, startRow, colIndex, endRow);

        // Assert
        Assert.True(worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge);
        service.Received().Protected("DrawBorderCell", Arg.Any<ExcelRange>());
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
        service.Received().Protected("StyleDefault", worksheet);
        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
    }


    #region Helpers

    private RedemptionStatisticsExcelTestable CreateExcel()
    {
        var redemptions = new List<RedemptionStatisticsEntity>
        {
            new()
            {
                Amount = 2,
                Currency = "Euro",
                CurrencyId = 6,
                Month = 10,
                Subject ="Testing",
                Year = 2021
            }
        };
        var title= "Redemption Statistics Report from Mar 15, 2021 to Jan Mar 14, 2022";
        IDictionary<string, decimal> totalHash = new Dictionary<string, decimal>();
        totalHash.Add("Euro", 2);
        return Substitute.For<RedemptionStatisticsExcelTestable>(string.Empty, redemptions, totalHash, title, 1);
    }

    #endregion Helpers
}