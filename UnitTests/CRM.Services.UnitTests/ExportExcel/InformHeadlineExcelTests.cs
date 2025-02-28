namespace CRM.Services.UnitTests.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using CRM.Models.InformHeadline;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Xunit;

public class InformHeadlineExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private IEnumerable<InformHeadlineModel> informs;

    private const byte RowStartHeader = 4;
    private const byte TotalCols = 12;
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
        Assert.Equal(template.Cells[2, 1, RowStartHeader - 1, TotalCols],
            worksheet.Cells[2, 1, RowStartHeader - 1, TotalCols]);
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
        service.Received().Protected("RenderRow", worksheet, Arg.Any<InformHeadlineModel>(), Arg.Any<int>(), Arg.Any<int>());
    }

    [Fact]
    public void RenderRow_WithStatusOpen_RenderExpectedCell()
    {
        // Arrange
        var inform = FakeInformDetail("Open");

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, inform, 1, 1);

        // Assert
        Assert.Equal(inform.Title, worksheet.Cells[1, 1].Value);
        Assert.Equal(inform.ClientCreatedDate, worksheet.Cells[1, 2].Value);
        Assert.Equal(inform.Total, worksheet.Cells[1, 3].Value);
        Assert.Equal(inform.Status, worksheet.Cells[1, 4].Value);
        Assert.Equal(inform.Done, worksheet.Cells[1, 5].Value);
        Assert.Equal(inform.RequestToCallBack, worksheet.Cells[1, 6].Value);
        Assert.Equal(inform.NoNeedToCall, worksheet.Cells[1, 7].Value);
        Assert.Equal(inform.NoReply, worksheet.Cells[1, 8].Value);
        Assert.Equal(inform.Uncontactable, worksheet.Cells[1, 9].Value);
        Assert.Equal(inform.InternalAccount, worksheet.Cells[1, 10].Value);
        Assert.Equal(inform.NeverTouch, worksheet.Cells[1, 11].Value);
        Assert.Equal(inform.KeptForReference, worksheet.Cells[1, 12].Value);

        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), ColorTranslator.FromHtml("#f0edc4"));
    }

    [Fact]
    public void RenderRow_WithStatusClosed_RenderExpectedCell()
    {
        // Arrange
        var inform = FakeInformDetail("Closed");

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, inform, 1, 1);

        // Assert
        Assert.Equal(inform.Title, worksheet.Cells[1, 1].Value);
        Assert.Equal(inform.ClientCreatedDate, worksheet.Cells[1, 2].Value);
        Assert.Equal(inform.Total, worksheet.Cells[1, 3].Value);
        Assert.Equal(inform.Status, worksheet.Cells[1, 4].Value);
        Assert.Equal(inform.Done, worksheet.Cells[1, 5].Value);
        Assert.Equal(inform.RequestToCallBack, worksheet.Cells[1, 6].Value);
        Assert.Equal(inform.NoNeedToCall, worksheet.Cells[1, 7].Value);
        Assert.Equal(inform.NoReply, worksheet.Cells[1, 8].Value);
        Assert.Equal(inform.Uncontactable, worksheet.Cells[1, 9].Value);
        Assert.Equal(inform.InternalAccount, worksheet.Cells[1, 10].Value);
        Assert.Equal(inform.NeverTouch, worksheet.Cells[1, 11].Value);
        Assert.Equal(inform.KeptForReference, worksheet.Cells[1, 12].Value);

        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), ColorTranslator.FromHtml("#f2f2f2"));
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
        Assert.Equal(WidthNormal, worksheet.Column(2).Width);
    }

    private InformHeadlineModel FakeInformDetail(string status)
    {
        return new InformHeadlineModel
        {
            Title = "test",
            ClientCreatedDate = "Jul 08,2021",
            Total = 100,
            Status = status,
            Done = 2,
            RequestToCallBack = 2,
            NoNeedToCall = 0,
            NoReply = 0,
            Uncontactable = 2,
            InternalAccount = 1,
            NeverTouch = 2,
            KeptForReference = 0
        };
    }

    private InformHeadlineExcelTestable CreateExcel()
    {
        informs = new List<InformHeadlineModel>
        {
            new()
        };

        return Substitute.For<InformHeadlineExcelTestable>(string.Empty, informs);
    }
}