namespace CRM.Services.UnitTests.ExportExcel;

using System;
using System.Collections.Generic;
using System.Drawing;
using CRM.Extensions;
using CRM.Models.Report.RedemptionStatistics;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using Xunit;
public class RedemptionStatisticsDetailExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private const byte RowStartHeader = 4;
    private const byte TotalColumns = 7;

    [Fact]
    public void RenderTitle_WhenCalled_ExpectedCopyRow()
    {
        //Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderTitle(templateWorksheet, worksheet);

        // Assert
        Assert.Equal(templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns], worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
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
        Assert.Equal(DateTime.Now.ToShortDateFormat(), worksheet.Cells[5, 1].Value);
        Assert.Equal("881HK", worksheet.Cells[5, 2].Value);
        Assert.Equal("Testing", worksheet.Cells[5, 3].Value);
        Assert.Equal("Euro", worksheet.Cells[5, 4].Value);
        Assert.Equal("2", worksheet.Cells[5, 5].Value);
        Assert.Equal("KIV", worksheet.Cells[5, 6].Value);
        Assert.Equal("sa", worksheet.Cells[5, 7].Value);

        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
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
    }


    #region Helpers

    private RedemptionStatisticsDetailExcelTestable CreateExcel()
    {
        var redemptionDetail = new List<RedemptionStatisticsDetailEntity>
        {
            new()
            {
                Amount = 2,
                Currency = "Euro",
                CurrencyId = 6,
                DoneBy="sa",
                Status = "KIV",
                ClaimTime = DateTime.Now,
                Subject ="Testing",
                UserName = "881HK"
            }
        };
        return Substitute.For<RedemptionStatisticsDetailExcelTestable>(string.Empty, redemptionDetail);
    }

    #endregion Helpers
}