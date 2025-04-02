namespace CRM.Services.UnitTests.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using CRM.Models.InformHeadline;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Xunit;

public class NewInformHeadlineExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private IEnumerable<NewInform> newInforms;
    private IEnumerable<InformStatus> informStatuses;
    private const byte RowStartHeader = 6;
    private const byte TotalCols = 7;
    private const int WidthLargest = 40;
    private const int WidthLarge = 35;
    private const int WidthNormal = 15;

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
        Assert.Equal("Inform Headlines Cases", worksheet.Cells[1, 1].Value);
    }

    [Fact]
    public void RenderHeader_WhenCalled_ExpectedCopyRow()
    {
        // Arrange
        var templateWorksheet = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateExcel();

        // Action
        excel.Public_RenderHeader(templateWorksheet, worksheet);

        // Assert
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
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
        service.Received().Protected("RenderRow", worksheet, Arg.Any<NewInform>(), Arg.Any<int>(), Arg.Any<int>());
    }

    [Fact]
    public void RenderRow_WithValidGroupId_RenderExpectedCell()
    {
        // Arrange
        var newInform = FakeNewInformls(10);

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, newInform, 1, 1);

        // Assert
        Assert.Equal(newInform.Username, worksheet.Cells[1, 1].Value);
        Assert.Equal(string.Empty, worksheet.Cells[1, 2].Value);

        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), ColorTranslator.FromHtml("#d0e6f4"));
    }

    [Fact]
    public void RenderRow_WithInValidGroupId_RenderExpectedCell()
    {
        // Arrange
        var newInform = FakeNewInformls(0);

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, newInform, 1, 1);

        // Assert
        Assert.Equal(newInform.Username, worksheet.Cells[1, 1].Value);
        Assert.Equal(string.Empty, worksheet.Cells[1, 2].Value);

        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), ColorTranslator.FromHtml("#f1f1f1"));
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
        var excel = CreateExcel();

        // Act
        excel.Public_SetStyle(worksheet);

        // Assert
        Assert.Equal(ExcelHorizontalAlignment.Center,
            worksheet.Column(3).Style.HorizontalAlignment);
    }

    [Fact]
    public void SetWidthColumn_WhenCalled_ExpectedColumnWidth()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateExcel();

        // Act
        excel.Public_SetWidthColumn(worksheet);

        // Assert
        Assert.Equal(WidthNormal, worksheet.DefaultColWidth);
        Assert.Equal(WidthLarge, worksheet.Column(1).Width);
        Assert.Equal(WidthLargest, worksheet.Column(4).Width);
    }

    private NewInform FakeNewInformls(int groupId)
    {
        return new NewInform
        {
            Username = "test",
            GroupId = groupId
        };
    }

    private NewInformHeadlineExcelTestable CreateExcel()
    {
        newInforms = new List<NewInform>
        {
            new()
        };

        informStatuses = new List<InformStatus>
        {
            new()
            {
                SettingId = 1, SettingValue = "Done"
            }
        };

        return Substitute.For<NewInformHeadlineExcelTestable>(string.Empty, newInforms, informStatuses, "test");
    }
}