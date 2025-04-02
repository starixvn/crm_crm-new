namespace CRM.Services.UnitTests.ExportExcel;

using AutoFixture;
using CRM.Extensions;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using Xunit;

public class DeletedFeedbackExcelTests
{
    private readonly IFixture fixture = new Fixture();
    private readonly FakeExcelPackage excelPackage = new();
    private IEnumerable<FeedbackDetail> feedbacks;
    private IEnumerable<Setting> mainCategories;

    private const byte RowStartHeader = 4;
    private const byte StartComToolsIndex = 7;

    private const int WidthNormal = 15;
    private const int WidthLarge = 35;
    private const int ColumnRunningNo = 1;
    private const int ColumnFeedback = 2;
    private const int ColumnCustomer = 3;
    private const int ColumnCategory = 4;
    private const int ColumnStatus = 5;
    private const int ColumnRelCustomer = 6;

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
        Assert.Equal(template.Cells[2, 1, RowStartHeader - 1, StartComToolsIndex - 1],
            worksheet.Cells[2, 1, RowStartHeader - 1, StartComToolsIndex - 1]);
        Assert.Equal(string.Format(ViewResources.DeletedFeedback), worksheet.Cells[1, 1].Value);
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
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex]);
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
        service.Received().Protected("RenderRow", worksheet, Arg.Any<FeedbackDetail>(), Arg.Any<int>(), Arg.Any<int>());
    }

    [Fact]
    public void RenderRow_OddRow_RenderExpectedCell()
    {
        // Arrange
        var feedback = FakeFeedbackDetail();
        var feedbackCellValue =
            $"{feedback.Subject}\n{"Feedback date " + feedback.FeedbackDate.ToShortDateTimeFormat()}\n{"By " + feedback.CreatorName + " on " + feedback.CreateDate.ToShortDateTimeFormat()}\n{"Solving Duration: " + feedback.DurationTime}\n{$"Reviewed by {feedback.ReviewerName} on {feedback.SolveDate.ToShortDateTimeFormat()}"}";
        var categoryCellValue = "Special Notification\n  Abnormal Bets";

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, feedback, 1, 1);

        // Assert
        Assert.Equal(feedback.FeedbackId, worksheet.Cells[1, 1].Value);
        Assert.Equal(feedbackCellValue, worksheet.Cells[1, 2].Value);
        Assert.Equal(feedback.Username, worksheet.Cells[1, 3].Value);
        Assert.Equal(categoryCellValue, worksheet.Cells[1, 4].Value);
        Assert.Equal(feedback.Status, worksheet.Cells[1, 5].Value);
        Assert.Equal(feedback.RelatedCustomer.Replace(",", ", "), worksheet.Cells[1, 6].Value);
        service.DidNotReceive().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
    }

    [Fact]
    public void RenderRow_EvenRow_RenderExpectedCell()
    {
        // Arrange
        var feedback = FakeFeedbackDetail();
        var feedbackCellValue =
            $"{feedback.Subject}\n{"Feedback date " + feedback.FeedbackDate.ToShortDateTimeFormat()}\n{"By " + feedback.CreatorName + " on " + feedback.CreateDate.ToShortDateTimeFormat()}\n{"Solving Duration: " + feedback.DurationTime}\n{$"Reviewed by {feedback.ReviewerName} on {feedback.SolveDate.ToShortDateTimeFormat()}"}";
        var categoryCellValue = "Special Notification\n  Abnormal Bets";

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, feedback, 2, 1);

        // Assert
        Assert.Equal(feedback.FeedbackId, worksheet.Cells[1, 1].Value);
        Assert.Equal(feedbackCellValue, worksheet.Cells[1, 2].Value);
        Assert.Equal(feedback.Username, worksheet.Cells[1, 3].Value);
        Assert.Equal(categoryCellValue, worksheet.Cells[1, 4].Value);
        Assert.Equal(feedback.Status, worksheet.Cells[1, 5].Value);
        Assert.Equal(feedback.RelatedCustomer.Replace(",", ", "), worksheet.Cells[1, 6].Value);
        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Color.FromArgb(228, 242, 253));
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
            worksheet.Column(1).Style.HorizontalAlignment);
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
        Assert.Equal(WidthLarge, worksheet.DefaultColWidth);
        Assert.Equal(WidthNormal, worksheet.Column(ColumnRunningNo).Width);
        Assert.Equal(WidthLarge, worksheet.Column(ColumnFeedback).Width);
        Assert.Equal(WidthLarge, worksheet.Column(ColumnCustomer).Width);
        Assert.Equal(WidthLarge, worksheet.Column(ColumnCategory).Width);
        Assert.Equal(WidthNormal, worksheet.Column(ColumnStatus).Width);
        Assert.Equal(WidthLarge, worksheet.Column(ColumnRelCustomer).Width);
    }

    #region Helpers

    private DeletedFeedbackExcelTestable CreateExcel()
    {
        feedbacks = new List<FeedbackDetail>
        {
            new()
        };
        mainCategories = new List<Setting>
        {
            new()
            {
                SettingId = 1, SettingValue = "Special Notification",
                ChildSettings = [new Setting { SubCategoryId = 1, Name = "Abnormal Bets" }]
            }
        };
        return Substitute.For<DeletedFeedbackExcelTestable>(string.Empty, feedbacks, mainCategories);
    }

    private FeedbackDetail FakeFeedbackDetail()
    {
        return new FeedbackDetail
        {
            FeedbackId = 1,
            FeedbackDate = fixture.Create<DateTime>(),
            ResolutionDate = fixture.Create<DateTime>(),
            CreateDate = fixture.Create<DateTime>(),
            SolveDate = fixture.Create<DateTime>(),
            Subject = "Special Notification",
            Status = "Closed",
            RelatedCustomer = "test1,test2",
            CreatorName = "sa",
            ReviewerName = "sa",
            Settings = new List<FeedbackSettingRelation>
            {
                new() { SettingId = 1, SubSettingId = 1, SettingType = "Category" }
            }
        };
    }

    #endregion Helpers
}