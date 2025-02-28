namespace CRM.Services.UnitTests.ExportExcel;

using AutoFixture;
using CRM.Models.Feedback;
using CRM.Models.Report.DeletedFeedbackStatistic;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Xunit;

public class DeletedFeedbackStatisticExcelTests
{
    private readonly IFixture fixture = new Fixture();
    private readonly FakeExcelPackage excelPackage = new();
    private IEnumerable<DeletedFeedbackByHandler> deletedFeedbacks;
    private IEnumerable<Setting> mainCategories;

    private const int RowStartBody = 5;
    private const byte RowStartHeader = 4;
    private const byte TotalColumns = 7;

    protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);

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
        Assert.Equal(template.Cells[2, 1, RowStartHeader - 1, TotalColumns - 1],
            worksheet.Cells[2, 1, RowStartHeader - 1, TotalColumns - 1]);
        Assert.Equal(string.Format(ViewResources.DeletedFeedbackStatistic), worksheet.Cells[1, 1].Value);
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
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalColumns],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalColumns]);
    }

    [Fact]
    public void RenderBody_WhenCalled_RenderExpectedCell()
    {
        // Arrange
        var service = CreateExcel();
        var categoryCellValue = "Special Notification\n  Abnormal Bets";
        var deletedFeedback = deletedFeedbacks.FirstOrDefault();
        var handleFormat = $"{deletedFeedback.Handler} ({1})";
        var feedbackDetail = deletedFeedback.DeletedFeedbacks.FirstOrDefault();
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");

        // Act
        service.Public_RenderBody(template, worksheet);

        // Assert
        Assert.Equal(handleFormat, worksheet.Cells[5, 1].Value);
        Assert.Equal(feedbackDetail.CreateDate.ToString("MMM dd, yyyy"), worksheet.Cells[6, 1].Value);
        Assert.Equal(feedbackDetail.Handler, worksheet.Cells[6, 2].Value);
        Assert.Equal(feedbackDetail.Deletor, worksheet.Cells[6, 3].Value);
        Assert.Equal(feedbackDetail.Subject, worksheet.Cells[6, 4].Value);
        Assert.Equal(categoryCellValue, worksheet.Cells[6, 5].Value);
        Assert.Equal(feedbackDetail.Customer, worksheet.Cells[6, 6].Value);
        Assert.Equal(feedbackDetail.RelatedCustomer.Replace(",", ", "), worksheet.Cells[6, 7].Value);
        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), GroupBackgroundColor);
        service.Received().Protected("SetBackgroundTotalRow", Arg.Any<ExcelRange>());
        service.Received().Protected("SetColor", Arg.Any<ExcelRange>());
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
        var service = CreateExcel();

        // Act
        service.Public_SetStyle(worksheet);

        // Assert
        Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells.Style.HorizontalAlignment);
        Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 1].Style.HorizontalAlignment);
    }

    [Fact]
    public void SetWidthColumn_WhenCalled_ExpectedColumnWidth()
    {
        // Arrange
        const int WidthNormal = 25;
        const int WidthLarge = 35;
        const int ColumnDate = 1;
        const int ColumnHandler = 2;
        const int ColumnDeletedBy = 3;
        const int ColumnFeedback = 4;
        const int ColumnCategory = 5;
        const int Customer = 6;
        const int ColumnRelCustomer = 7;
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateExcel();

        // Act
        excel.Public_SetWidthColumn(worksheet);

        // Assert
        Assert.Equal(WidthLarge, worksheet.DefaultColWidth);
        Assert.Equal(WidthNormal, worksheet.Column(ColumnDate).Width);
        Assert.Equal(WidthNormal, worksheet.Column(ColumnHandler).Width);
        Assert.Equal(WidthNormal, worksheet.Column(ColumnDeletedBy).Width);
        Assert.Equal(WidthLarge, worksheet.Column(ColumnFeedback).Width);
        Assert.Equal(WidthLarge, worksheet.Column(ColumnCategory).Width);
        Assert.Equal(WidthNormal, worksheet.Column(Customer).Width);
        Assert.Equal(WidthNormal, worksheet.Column(ColumnRelCustomer).Width);
    }

    #region Helpers

    private DeletedFeedbackStatisticExcelTestable CreateExcel()
    {
        deletedFeedbacks = new List<DeletedFeedbackByHandler>
        {
            new()
            {
                Handler = "test",
                DeletedFeedbacks = new List<DeletedFeedbackStatistic>
                {
                    new()
                    {
                        CreateDate = fixture.Create<DateTime>(),
                        Handler = "test",
                        Deletor = "Deletor",
                        FeedbackId = 1,
                        Subject = "Special Notification",
                        MainCategory = "MainCategory",
                        SubCategory = "SubCategory",
                        Customer = "sa",
                        RelatedCustomer = "sa",
                        Settings =
                        [
                            new FeedbackSettingRelation { SettingId = 1, SubSettingId = 1, SettingType = "Category" }
                        ]
                    }
                }
            }
        };
        mainCategories = new List<Setting>
        {
            new()
            {
                SettingId = 1, SettingValue = "Special Notification",
                ChildSettings = [new Setting { SubCategoryId = 1, Name = "Abnormal Bets" }]
            }
        };
        return Substitute.For<DeletedFeedbackStatisticExcelTestable>(string.Empty, deletedFeedbacks, mainCategories);
    }

    #endregion Helpers
}