namespace CRM.Services.UnitTests.ExportExcel;

using System;
using System.Collections.Generic;
using System.Drawing;
using AutoFixture;
using CRM.Extensions;
using CRM.Models.Report.DynamicReport;
using CRM.Models.Setting;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using Xunit;

public class DynamicReportExcelTests
{
    private readonly IFixture fixture = new Fixture();
    private readonly FakeExcelPackage excelPackage = new();
    private DynamicReportInfo dynamicReportInfo;
    private IEnumerable<Setting> mainCategories;

    private const byte RowStartHeader = 4;
    private const byte TotalCols = 10;

    private const int WidthSmall = 10;
    private const int WidthNormal = 15;
    private const int WidthLarge = 25;
    private const int WidthLarger = 40;

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
        Assert.Equal("Daily_Communication [0]", worksheet.Cells[1, 1].Value);
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
        service.Received().Protected("RenderRow", worksheet, Arg.Any<DynamicReportInfo>(), Arg.Any<int>(), Arg.Any<int>());
    }

    [Fact]
    public void RenderRow_WithStatusIsClosed_RenderExpectedCell()
    {
        // Arrange
        var dynamicReport= FakeDynamicReportInfo("Closed");

        var worksheet = excelPackage.Worksheets.Add("data");
        var data = dynamicReport.ChildReports[0];
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, dynamicReport, 1, 0);

        // Assert
        Assert.Equal(1, worksheet.Cells[1, 1].Value);
        Assert.Equal(data.FeedbackId, worksheet.Cells[1, 2].Value);
        Assert.Equal(data.FeedbackDate.ToLongDateTimeFormat(), worksheet.Cells[1, 3].Value);
        Assert.Equal(String.Empty, worksheet.Cells[1, 4].Value);
        Assert.Equal(data.Subject, worksheet.Cells[1, 5].Value);
        Assert.Equal(data.Status, worksheet.Cells[1, 6].Value);
        Assert.Equal(data.Duration, worksheet.Cells[1, 7].Value);
        Assert.Equal(data.UserName, worksheet.Cells[1, 8].Value);
        Assert.Equal(data.HandledBy, worksheet.Cells[1, 9].Value);
        Assert.Equal(data.ReviewedBy, worksheet.Cells[1, 10].Value);

        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), ColorTranslator.FromHtml("#dddddd"));
    }

    [Fact]
    public void RenderRow_WithStatusIsPending_RenderExpectedCell()
    {
        // Arrange
        var dynamicReport = FakeDynamicReportInfo("Pending");

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, dynamicReport, 1, 0);

        // Assert
        Assert.Equal(1, worksheet.Cells[1, 1].Value);

        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), ColorTranslator.FromHtml("#f0edc4"));
    }

    [Fact]
    public void RenderRow_WithStatusIsChecked_RenderExpectedCell()
    {
        // Arrange
        var dynamicReport = FakeDynamicReportInfo("Checked");

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, dynamicReport, 1, 0);

        // Assert
        Assert.Equal(1, worksheet.Cells[1, 1].Value);

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
    public void SetWidthColumn_WhenCalled_ExpectedColumnWidth()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateExcel();

        // Act
        excel.Public_SetWidthColumn(worksheet);

        // Assert
        Assert.Equal(WidthNormal, worksheet.DefaultColWidth);
        Assert.Equal(WidthSmall, worksheet.Column(1).Width);
        Assert.Equal(WidthNormal, worksheet.Column(2).Width);
        Assert.Equal(WidthNormal, worksheet.Column(3).Width);
        Assert.Equal(WidthLarger, worksheet.Column(4).Width);
        Assert.Equal(WidthLarge, worksheet.Column(5).Width);
        Assert.Equal(WidthNormal, worksheet.Column(6).Width);
        Assert.Equal(WidthNormal, worksheet.Column(7).Width);
        Assert.Equal(WidthNormal, worksheet.Column(8).Width);
        Assert.Equal(WidthNormal, worksheet.Column(9).Width);
        Assert.Equal(WidthNormal, worksheet.Column(10).Width);
    }

    #region Helpers

    private DynamicReportInfo FakeDynamicReportInfo(string status)
    {
        return new DynamicReportInfo
        {
            ChildReports =
            [
                new DynamicReportInfo()
                {
                    FeedbackId = 1,
                    FeedbackDate = fixture.Create<DateTime>(),
                    Subject = "Special Notification",
                    Status = status,
                    Duration = "0:1:0",
                    UserName = "sa",
                    Handler = "sa",
                    Reviewer = "sa",
                    DynamicSettings = new List<Models.Common.SettingItem>
                    {
                        new() { MainCategoryId = 1, SubCategoryId = 1 }
                    }
                }
            ]
        };
    }

    private DynamicReportExcelTestable CreateExcel()
    {
        dynamicReportInfo = new DynamicReportInfo()
        {
            Id = "1",
            Name = "Daily report",
            ReportTypeId = 1,
            ChildReports =
            [
                new DynamicReportInfo()
                {
                    FeedbackId = 1,
                    FeedbackDate = new DateTime(2022, 02, 03)
                }
            ]
        };
        mainCategories = new List<Setting>
        {
            new()
            {
                SettingId = 1, SettingValue = "Special Notification",
                ChildSettings = [new Setting { SubCategoryId = 1, Name = "Abnormal Bets" }]
            }
        };
        return Substitute.For<DynamicReportExcelTestable>(string.Empty, dynamicReportInfo, mainCategories, "Daily_Communication");
    }

    #endregion Helpers
}