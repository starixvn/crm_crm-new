namespace CRM.Services.UnitTests.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using CRM.Models.InformHeadline;
using CRM.Models.Setting;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Xunit;

public class UpdateInformHeadlineExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private IEnumerable<EditInform> updateInforms;
    private IEnumerable<InformStatus> informStatuses;
    private IEnumerable<Station> informStations;
    private IEnumerable<FeedbackStatus> informProductStatuses;

    private const byte RowStartHeader = 6;
    private const byte RowStartBody = 7;
    private const byte TotalCols = 7;
    private const int WidthLargest = 60;
    private const int WidthLarge = 35;
    private const int WidthNormal = 20;
    private const int WidthSmall = 15;


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
        service.Received().Protected("RenderRow", worksheet, Arg.Any<EditInform>(), Arg.Any<int>(), Arg.Any<int>());
    }

    [Fact]
    public void RenderRow_WithValidGroupId_RenderExpectedCell()
    {
        // Arrange
        var newInform = FakeUpdateInform(10,"remark");

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
        var newInform = FakeUpdateInform(0, "remark");

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
    public void RenderRow_WithRemarkNull_RenderExpectedCell()
    {
        // Arrange
        var newInform = FakeUpdateInform(0, null);

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, newInform, 1, 1);

        // Assert
        Assert.Equal(newInform.Username, worksheet.Cells[1, 1].Value);
        Assert.Equal(string.Empty, worksheet.Cells[1, 2].Value);

        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), ColorTranslator.FromHtml("#f1f1f1"));
    }

    private EditInform FakeUpdateInform(int groupId, string remark)
    {
        return new EditInform
        {
            Username = "test",
            InformHeadlineStatusId = 45000,
            ClientUpdatedTime = "Jul 08,2021",
            Remark = remark,
            Handler = "sa",
            Extension = 2,
            ProductStatus = 5,
            GroupId = groupId
        };
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
            worksheet.Column(6).Style.HorizontalAlignment);
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
        Assert.Equal(WidthSmall, worksheet.Column(2).Width);
        Assert.Equal(WidthNormal, worksheet.Column(3).Width);
        Assert.Equal(WidthLargest, worksheet.Column(4).Width);
    }

    private UpdateInformHeadlineExcelTestable CreateExcel()
    {
        updateInforms = new List<EditInform>
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

        informStations = new List<Station>
        {
            new()
            {
                StationId = 1, Name = "5231"
            }
        };

        informProductStatuses = new List<FeedbackStatus>
        {
            new()
            {
                StatusId = 1, Name = "Enable"
            }
        };

        return Substitute.For<UpdateInformHeadlineExcelTestable>(string.Empty, updateInforms, informStatuses, informStations, informProductStatuses , "test");
    }
}