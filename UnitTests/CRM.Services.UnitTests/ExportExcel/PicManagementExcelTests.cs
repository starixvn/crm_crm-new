namespace CRM.Services.UnitTests.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using CRM.Models;
using CRM.Models.PicAndHeadline;
using CRM.Resources;
using NSubstitute;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using TestableClasses;
using Xunit;

public class PicManagementExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private PicInfo picInfo;
    private List<BaseModel> tools;
    private PicReport picReport;
    private const byte RowStartHeader = 4;
    private const byte BaseColumnIndex = 10;
    private const byte StartComToolsIndex = 8;

    [Fact]
    public void RenderTitle_WhenCalled_ExpectedCopyRow()
    {
        //Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderTitle(template, worksheet);

        // Assert
        Assert.Equal(template.Cells[1, 1, RowStartHeader - 1, StartComToolsIndex - 1],
            worksheet.Cells[1, 1, RowStartHeader - 1, StartComToolsIndex - 1]);
    }

    [Fact]
    public void RenderHeader_WhenCalled_ExpectedValueCell()
    {
        //Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();
        var totalColumn = BaseColumnIndex + tools.Count - 1;

        // Act
        service.Public_RenderHeader(template, worksheet);

        // Assert
        Assert.Equal(template.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]);
        Assert.Equal(ViewResources.CommunicationTool, worksheet.Cells[RowStartHeader, StartComToolsIndex].Value);
        Assert.True(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader, StartComToolsIndex + tools.Count - 1].Merge);
        Assert.Equal(tools[0].Name, worksheet.Cells[RowStartHeader + 1, StartComToolsIndex].Value);
        Assert.Equal(tools[1].Name, worksheet.Cells[RowStartHeader + 1, StartComToolsIndex + 1].Value);
        Assert.Equal(ViewResources.Remark, worksheet.Cells[RowStartHeader, totalColumn - 1].Value);
        Assert.True(worksheet.Cells[RowStartHeader, totalColumn - 1, RowStartHeader + 1, totalColumn - 1].Merge);
        Assert.Equal(ViewResources.Active, worksheet.Cells[RowStartHeader, totalColumn].Value);
        Assert.True(worksheet.Cells[RowStartHeader, totalColumn, RowStartHeader + 1, totalColumn].Merge);
    }

    [Fact]
    public void RenderBody_WhenCalled_CallExpectedMethod()
    {
        //Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderBody(template, worksheet);

        // Assert
        service.Received(1).Protected("RenderRow", worksheet, Arg.Any<PicInfo>(), 1, Arg.Any<int>());
    }

    [Fact]
    public void ProcessUI_WhenCalled_CallExpectedMethod()
    {
        //Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_ProcessUI(worksheet);

        // Assert
        service.Received().Protected("SetStyle", worksheet);
        service.Received().Protected("SetWidthColumn", worksheet);
        service.Received().Protected("DrawBorderCell", Arg.Any<ExcelRange>());
    }

    [Fact]
    public void RenderRow_WhenCalledWithIndexIsOddNumber_ExpectedCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderRow(worksheet, picInfo, 1, 1);

        // Assert
        Assert.Equal(1, worksheet.Cells[1, 1].Value);
        Assert.Equal(picInfo.PicTypeName, worksheet.Cells[1, 2].Value);
        Assert.Equal(picInfo.Username, worksheet.Cells[1, 3].Value);
        Assert.Equal(picInfo.RoleName, worksheet.Cells[1, 4].Value);
        Assert.Equal(string.Join(", ", picInfo.Languages.Select(lang => lang.SettingValue)), worksheet.Cells[1, 5].Value);
        Assert.Equal(picInfo.CountryName, worksheet.Cells[1, 6].Value);
        Assert.Equal(picInfo.GroupHeadline, worksheet.Cells[1, 7].Value);
        Assert.Equal(picInfo.CommunicationTools[0].Value, worksheet.Cells[1, 8].Value);
        Assert.Equal(string.Empty, worksheet.Cells[1, 9].Value);
        Assert.Equal(picInfo.Remark, worksheet.Cells[1, 10].Value);
        Assert.Equal(ViewResources.Yes, worksheet.Cells[1, 11].Value);
        Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 1].Style.HorizontalAlignment);
        Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 11].Style.HorizontalAlignment);
        service.DidNotReceive().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
    }

    [Fact]
    public void RenderRow_WhenCalledWithIndexIsEvenNumber_ExpectedCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderRow(worksheet, picInfo, 2, 1);

        // Assert
        Assert.Equal(2, worksheet.Cells[1, 1].Value);
        Assert.Equal(picInfo.PicTypeName, worksheet.Cells[1, 2].Value);
        Assert.Equal(picInfo.Username, worksheet.Cells[1, 3].Value);
        Assert.Equal(picInfo.RoleName, worksheet.Cells[1, 4].Value);
        Assert.Equal(string.Join(", ", picInfo.Languages.Select(lang => lang.SettingValue)), worksheet.Cells[1, 5].Value);
        Assert.Equal(picInfo.CountryName, worksheet.Cells[1, 6].Value);
        Assert.Equal(picInfo.GroupHeadline, worksheet.Cells[1, 7].Value);
        Assert.Equal(picInfo.CommunicationTools[0].Value, worksheet.Cells[1, 8].Value);
        Assert.Equal(string.Empty, worksheet.Cells[1, 9].Value);
        Assert.Equal(picInfo.Remark, worksheet.Cells[1, 10].Value);
        Assert.Equal(ViewResources.Yes, worksheet.Cells[1, 11].Value);
        Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 1].Style.HorizontalAlignment);
        Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 11].Style.HorizontalAlignment);
        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
    }

    [Fact]
    public void SetStyle_WhenCalled_ExpectedStyle()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateService();
        int totalColumn = BaseColumnIndex;
        var white = Color.White;
        var expectedColor = $"FF{white.R:X2}{white.G:X2}{white.B:X2}";

        // Act
        excel.Public_SetStyle(worksheet);

        // Assert
        excel.Received().Protected("StyleDefault", worksheet);
        Assert.True(worksheet.Cells[1, 1, 2, totalColumn].Merge);
        Assert.True(worksheet.Cells[3, 1, 3, totalColumn].Merge);
        excel.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
        Assert.True(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.Font.Bold);
        Assert.Equal(expectedColor,
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.Font.Color.Rgb);
        Assert.Equal(ExcelHorizontalAlignment.Center,
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.HorizontalAlignment);
    }

    [Fact]
    public void SetWidthColumn_WhenCalled_ExpectedColumnWidth()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateService();
        int totalColumn = BaseColumnIndex;
        byte WidthExtraSmall = 7;
        byte WidthSmall = 10;
        byte WidthNormal = 15;
        byte WidthLarge = 22;

        // Act
        excel.Public_SetWidthColumn(worksheet);

        // Assert
        Assert.Equal(WidthNormal, worksheet.DefaultColWidth);
        Assert.Equal(WidthExtraSmall, worksheet.Column(1).Width);
        Assert.Equal(WidthSmall, worksheet.Column(3).Width);
        Assert.Equal(WidthLarge, worksheet.Column(6).Width);
        Assert.Equal(WidthLarge, worksheet.Column(totalColumn - 1).Width);
        Assert.Equal(WidthExtraSmall, worksheet.Column(totalColumn).Width);
    }

    #region Helpers

    private PicManagementExcelTestable CreateService()
    {
        tools = CreateCommunicationTools();
        picInfo = CreatePicInfo();
        picReport = new PicReport
        {
            DataList = new List<PicInfo> { picInfo },
            Total = 1
        };
        var excel = Substitute.For<PicManagementExcelTestable>(string.Empty, tools, picReport);
        return excel;
    }

    private List<BaseModel> CreateCommunicationTools()
    {
        return
        [
            new BaseModel { Id = 1, Name = "A" },
            new BaseModel { Id = 2, Name = "B" }
        ];
    }

    private PicInfo CreatePicInfo()
    {
        var pic = new PicInfo
        {
            Username = "PIC",
            RoleName = "Role",
            CountryName = "Vn",
            GroupHeadline = "Group",
            Remark = "",
            IsActive = true
        };
        pic.Language = "<ROOT><Setting Id=\"1\" Value=\"VN\" /><Setting Id=\"2\" Value=\"EN\" /></ROOT>";
        pic.CommunicationTools = [new CommunicationTool { SettingId = 1, Value = "tool" }];
        return pic;
    }

    #endregion Helpers
}