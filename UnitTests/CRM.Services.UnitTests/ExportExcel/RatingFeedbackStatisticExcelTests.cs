namespace CRM.Services.UnitTests.ExportExcel;

using System.Drawing;
using Models;
using Models.Report.FeedbackStatistic.FeedbackRating;
using NSubstitute;
using OfficeOpenXml.Style;
using TestableClasses;
using Xunit;

public class RatingFeedbackStatisticExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private FeedbackRatingReport ratingFeedbackStatistic;

    private const byte RowStartHeader = 4;
    private const byte StartColumnIndex = 0;
    private const byte RowStartBody = 5;
    protected static readonly Color HeaderTitleColor = Color.FromArgb(60, 94, 165);
    protected static readonly Color EvenRowColor = Color.FromArgb(228, 242, 253);

    [Fact]
    public void RenderTitle_WhenCalled_ExpectedCopyRow()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderTitle(template, worksheet);

        // Assert
        Assert.Equal(ratingFeedbackStatistic.Title, worksheet.Cells[1, 1].Value);
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
        Assert.Equal(ratingFeedbackStatistic.ColumnNames[0], worksheet.Cells[RowStartHeader, 1].Value);
    }

    [Fact]
    public void RenderBody_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderBody(template, worksheet);

        // Assert
        Assert.Equal("Test Column", worksheet.Cells[5, 1].Value);
        Assert.Equal(1, worksheet.Cells[5, 2].Value);
        Assert.Equal(2, worksheet.Cells[5, 3].Value);
        Assert.Equal(3, worksheet.Cells[5, 4].Value);
        Assert.Equal(4, worksheet.Cells[5, 5].Value);
        Assert.Equal(5, worksheet.Cells[5, 6].Value);

        service.Received().Protected("RenderTotalRow", worksheet, Arg.Any<int>());
    }

    [Fact]
    public void ProcessUI_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_ProcessUI(worksheet);

        // Assert
        service.Received().Protected("SetStyle", worksheet);
        service.Received().Protected("SetWidthColumn", worksheet);
    }

    [Fact]
    public void SetBackgroundTotalRow_WhenCalled_CallExpectedMethod()
    {
        // Arrange
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

    private RatingFeedbackStatisticExcelTestable CreateExcel()
    {
        ratingFeedbackStatistic = new FeedbackRatingReport
        {
            Title = "Rating Feedback Statistics Report",
            ColumnNames = ["Test Column", "Excellent", "Good", "Neutral", "Poor", "Very Poor", "N/A"],
            Records =
            [
                new FeedbackRatingRecord
                {
                    ColumnData = new BaseModel { Name = "Test Column" },
                    Excellent = 1,
                    Good = 2,
                    Neutral = 3,
                    Poor = 4,
                    VeryPoor = 5
                }
            ]
        };

        return Substitute.For<RatingFeedbackStatisticExcelTestable>(string.Empty, ratingFeedbackStatistic);
    }

    [Fact]
    public void RenderTotalRow_WhenCalled_SumsValuesCorrectly()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();
        var rowIndex = RowStartBody + ratingFeedbackStatistic.Records.Count;

        // Act
        service.Public_RenderTotalRow(worksheet, rowIndex);

        // Assert
        Assert.Equal("Total", worksheet.Cells[rowIndex, 1].Value);
        Assert.Equal(0, worksheet.Cells[rowIndex, 2].Value);
        Assert.Equal(0, worksheet.Cells[rowIndex, 3].Value);
        Assert.Equal(0, worksheet.Cells[rowIndex, 4].Value);
        Assert.Equal(0, worksheet.Cells[rowIndex, 5].Value);
        Assert.Equal(0, worksheet.Cells[rowIndex, 6].Value);
        Assert.Equal(0, worksheet.Cells[rowIndex, 7].Value);
    }

    [Fact]
    public void RenderTotalRow_WhenCalled_SetsStylesCorrectly()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();
        var rowIndex = RowStartBody + ratingFeedbackStatistic.Records.Count;

        // Act
        service.Public_RenderTotalRow(worksheet, rowIndex);

        // Assert
        for (var colIndex = 1; colIndex <= ratingFeedbackStatistic.ColumnNames.Count; colIndex++)
        {
            var cell = worksheet.Cells[rowIndex, colIndex];
            Assert.True(cell.Style.Font.Bold);
        }
    }

    [Fact]
    public void SetStyle_WhenCalled_SetsStylesCorrectly()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_SetStyle(worksheet);

        // Assert
        Assert.True(worksheet.Cells[RowStartHeader, StartColumnIndex + 1, RowStartHeader, ratingFeedbackStatistic.ColumnNames.Count].Style.Font.Bold);

        Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[RowStartHeader, StartColumnIndex + 1, RowStartHeader, ratingFeedbackStatistic.ColumnNames.Count].Style.HorizontalAlignment);
    }

    #endregion Helpers
}