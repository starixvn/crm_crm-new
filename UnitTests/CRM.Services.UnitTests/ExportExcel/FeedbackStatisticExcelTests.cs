namespace CRM.Services.UnitTests.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using CRM.Models;
using CRM.Models.Report.FeedbackStatistic;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using Xunit;

public class FeedbackStatisticExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private FeedbackStatisticInfo feedbackStatistic;

    private const byte RowStartHeader = 4;
    private const byte StartUserNameColumnIndex = 1;
    protected static readonly Color GroupBackgroundColor = Color.FromArgb(215, 215, 215);
    protected static readonly Color HeaderTitleColor = Color.FromArgb(60, 94, 165);

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
        Assert.Equal(feedbackStatistic.Title, worksheet.Cells[1, 1].Value);
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
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartUserNameColumnIndex],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartUserNameColumnIndex]);
        Assert.Equal(feedbackStatistic.Usernames[0].Name, worksheet.Cells[RowStartHeader, 2].Value);
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
        Assert.Equal("Special Notification - 1 item(s)", worksheet.Cells[5, 1].Value);
        Assert.Equal("Abnormal Account (5)", worksheet.Cells[6, 1].Value);
        Assert.Equal(5, worksheet.Cells[6, 2].Value);
        Assert.Equal("Sub Total (5)", worksheet.Cells[7, 1].Value);
        Assert.Equal(5, worksheet.Cells[7, 2].Value);

        service.Received().Protected("SetBackgroundMainCategory", Arg.Any<ExcelRange>());
        service.Received().Protected("SetSubTotalColor", Arg.Any<ExcelRange>());
        service.Received().Protected("RenderGrandTotal", worksheet, Arg.Any<int>());
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
    public void SetBackgroundMainCategory_WhenCalled_CallExpectedMethod()
    {
        //Arrange
        var service = CreateExcel();
        var worksheet = excelPackage.Worksheets.Add("data");
        var excelRange = worksheet.Cells[1, 1, 1, 1];

        // Act
        service.Public_SetBackgroundMainCategory(excelRange);

        // Assert
        service.Received().Protected("SetBackgroundColor", excelRange, GroupBackgroundColor);
    }

    [Fact]
    public void SetBackgroundTotalRow_WhenCalled_CallExpectedMethod()
    {
        //Arrange
        var service = CreateExcel();
        var worksheet = excelPackage.Worksheets.Add("data");
        var excelRange = worksheet.Cells[1, 1, 1, 1];

        // Act
        service.Public_SetBackgroundTotalRow(excelRange);

        // Assert
        service.Received().Protected("SetBackgroundColor", excelRange, HeaderTitleColor);
    }

    [Fact]
    public void SetWidthColumn_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        const int WidthLarge = 40;
        const int WithSmall = 15;
        var excel = CreateExcel();

        // Act
        excel.Public_SetWidthColumn(worksheet);

        // Assert
        Assert.Equal(WithSmall, worksheet.DefaultColWidth);
        Assert.Equal(WidthLarge, worksheet.Column(1).Width);
    }

    #region Helpers

    private FeedbackStatisticExcelTestable CreateExcel()
    {
        feedbackStatistic = new FeedbackStatisticInfo
        {
            Title = "Feedback Statistics Report from Mar 24, 2022 to Mar 31, 2022",
            TotalItems = 1,
            Usernames = new List<BaseModel> { new() { Id = 10278938, Name = "starixIT" } },
            GrandTotals = [5],
            FeedbackCategories = new List<FeedbackCategory>
            {
                new()
                {
                    Id = 3024,
                    Name = "Special Notification",
                    SubTotal = new FeedbackSubcategory
                    {
                        Resolves = [5]
                    },
                    FeedbackSubcategories = new List<FeedbackSubcategory>
                    {
                        new()
                        {
                            Id = 4352,
                            Name = "Abnormal Account",
                            Resolves = [5]
                        }
                    }
                }
            }
        };

        return Substitute.For<FeedbackStatisticExcelTestable>(string.Empty, feedbackStatistic);
    }

    #endregion Helpers
}