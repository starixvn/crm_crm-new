namespace CRM.Services.UnitTests.ExportExcel;

using System.Collections.Generic;
using AutoFixture;
using CRM.Models.AdminTool.CategoryClassification;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using Xunit;

public class CategoryClassificationExcelTests
{
    private IEnumerable<CategoryClassification> categoryClassifications;
    private readonly IFixture fixture = new Fixture();
    private readonly FakeExcelPackage excelPackage = new();

    private const byte RowStartHeader = 4;
    private const byte RowStartBody = 5;
    private const byte TotalColumnsChatType = 3;

    private const int WidthNormal = 30;
    private const int RowHeight = 60;
    private const int WidthLarge = 80;
    private const int ColumnCategory = 1;
    private const int ColumnSubCategory = 2;
    private const int ColumnRemark = 3;

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
        Assert.Equal(template.Cells[2, 1, RowStartHeader - 1, TotalColumnsChatType],
            worksheet.Cells[2, 1, RowStartHeader - 1, TotalColumnsChatType]);
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
        Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalColumnsChatType],
            worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalColumnsChatType]);
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
        service.Received().Protected("RenderRow", Arg.Any<CategoryClassification>(), worksheet);
    }

    [Fact]
    public void RenderRow_EvenRow_RenderExpectedCell()
    {
        // Arrange
        var category = fixture.Create<CategoryClassification>();
        category.Remark = "Remark";

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(category, worksheet);

        // Assert
        Assert.Equal(category.SubCategory, worksheet.Cells[RowStartBody, 2].Value);
        Assert.Equal(category.Remark, worksheet.Cells[RowStartBody, 3].Value);
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
        service.Received().Protected("StyleDefault", worksheet);
    }

    [Fact]
    public void SetWidthColumn_WhenCalled_ExpectedColumnWidth()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_SetWidthColumn(worksheet);

        // Assert
        Assert.Equal(WidthLarge, worksheet.DefaultColWidth);
        Assert.Equal(WidthNormal, worksheet.Column(ColumnCategory).Width);
        Assert.Equal(WidthNormal, worksheet.Column(ColumnSubCategory).Width);
        Assert.Equal(WidthLarge, worksheet.Column(ColumnRemark).Width);
    }

    #region Helpers

    private CategoryClassificationExcelTestable CreateExcel()
    {
        categoryClassifications = new List<CategoryClassification>
        {
            new()
            {
                MainCategoryID = 1, SubCategoryID= 1, MainCategory = "MainCategory",
                SubCategory= "SubCategory", Remark= "Remark",
            }
        };
        return Substitute.For<CategoryClassificationExcelTestable>(string.Empty, categoryClassifications);
    }
    #endregion Helpers
}