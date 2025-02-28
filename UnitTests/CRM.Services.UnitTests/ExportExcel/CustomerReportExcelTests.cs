namespace CRM.Services.UnitTests.ExportExcel;

using System;
using System.Collections.Generic;
using System.Drawing;
using CRM.Extensions;
using CRM.Models.Report.CustomerReport;
using CRM.Resources;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using Xunit;

public class CustomerReportExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private CustomerReportInfo customerReportInfo;

    private const byte RowStartHeader = 4;
    private const byte TotalCols = 31;

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
        Assert.Equal("Customer Report", worksheet.Cells[1, 1].Value);
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
        service.Received().Protected("RenderRow", worksheet, Arg.Any<CustomerInfo>(), Arg.Any<int>(), Arg.Any<int>());
    }

    [Fact]
    public void RenderRow_OddRow_RenderExpectedCell()
    {
        // Arrange
        var customerReport= FakeCustomerReportInfo();

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, customerReport, 1, 1);

        // Assert
        Assert.Equal(customerReport.Headline, worksheet.Cells[1, 1].Value);
        Assert.Equal(customerReport.Checker, worksheet.Cells[1, 2].Value);
        Assert.Equal(customerReport.Position, worksheet.Cells[1, 3].Value);
        Assert.Equal(customerReport.Status, worksheet.Cells[1, 4].Value);
        Assert.Equal(customerReport.Username, worksheet.Cells[1, 5].Value);
        Assert.Equal(customerReport.FirstName, worksheet.Cells[1, 6].Value);
        Assert.Equal(customerReport.Language, worksheet.Cells[1, 7].Value);
        Assert.Equal(customerReport.Phone1, worksheet.Cells[1, 8].Value);
        Assert.Equal(customerReport.Phone2, worksheet.Cells[1, 9].Value);
        Assert.Equal(customerReport.Phone3, worksheet.Cells[1, 10].Value);
        Assert.Equal(customerReport.Mobile, worksheet.Cells[1, 11].Value);
        Assert.Equal(customerReport.Fax, worksheet.Cells[1, 12].Value);

        service.DidNotReceive().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
    }

    [Fact]
    public void RenderRow_EvenRow_RenderExpectedCell()
    {
        // Arrange
        var customerReport = FakeCustomerReportInfo();

        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();

        // Act
        service.Public_RenderRow(worksheet, customerReport, 2, 1);

        // Assert
        Assert.Equal(customerReport.Headline, worksheet.Cells[1, 1].Value);
        Assert.Equal(customerReport.Checker, worksheet.Cells[1, 2].Value);
        Assert.Equal(customerReport.Position, worksheet.Cells[1, 3].Value);
        Assert.Equal(customerReport.Status, worksheet.Cells[1, 4].Value);
        Assert.Equal(customerReport.Username, worksheet.Cells[1, 5].Value);
        Assert.Equal(customerReport.FirstName, worksheet.Cells[1, 6].Value);
        Assert.Equal(customerReport.LastName, worksheet.Cells[1, 7].Value);
        Assert.Equal(customerReport.Language, worksheet.Cells[1, 8].Value);
        Assert.Equal(customerReport.Phone1, worksheet.Cells[1, 9].Value);
        Assert.Equal(customerReport.Phone2, worksheet.Cells[1, 10].Value);
        Assert.Equal(customerReport.Phone3, worksheet.Cells[1, 11].Value);
        Assert.Equal(customerReport.Mobile, worksheet.Cells[1, 12].Value);
        Assert.Equal(customerReport.Email, worksheet.Cells[1, 13].Value);
        Assert.Equal(customerReport.Skype, worksheet.Cells[1, 14].Value);
        Assert.Equal(customerReport.MSN, worksheet.Cells[1, 15].Value);
        Assert.Equal(customerReport.WhatsApp, worksheet.Cells[1, 16].Value);
        Assert.Equal(customerReport.Line, worksheet.Cells[1, 17].Value);
        Assert.Equal(customerReport.WeChat, worksheet.Cells[1, 18].Value);
        Assert.Equal(customerReport.Yahoo, worksheet.Cells[1, 19].Value);
        Assert.Equal(customerReport.BBM, worksheet.Cells[1, 20].Value);
        Assert.Equal(customerReport.QQ, worksheet.Cells[1, 21].Value);
        Assert.Equal(customerReport.Language, worksheet.Cells[1, 22].Value);
        Assert.Equal(ViewResources.Symbol_IsVIP, worksheet.Cells[1, 23].Value);
        Assert.Equal(customerReport.Pic1, worksheet.Cells[1, 24].Value);
        Assert.Equal(customerReport.Pic2, worksheet.Cells[1, 25].Value);
        Assert.Equal(customerReport.Pic3, worksheet.Cells[1, 26].Value);
        Assert.Equal(customerReport.Pic4, worksheet.Cells[1, 27].Value);
        Assert.Equal(customerReport.BirthDay.Value.ToShortDateFormat(), worksheet.Cells[1, 28].Value);
        Assert.Equal(customerReport.Passport, worksheet.Cells[1, 29].Value);
        Assert.Equal(customerReport.SiteName, worksheet.Cells[1, 30].Value);
        Assert.Equal(customerReport.CountryName, worksheet.Cells[1, 31].Value);

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
        const int ColumnIndexIsVip = 23;
        const int ColumnIndexBirthday = 28;
        var worksheet = excelPackage.Worksheets.Add("data");
        var excel = CreateExcel();

        // Act
        excel.Public_SetStyle(worksheet);

        // Assert
        Assert.Equal(ExcelHorizontalAlignment.Center,
            worksheet.Column(ColumnIndexIsVip).Style.HorizontalAlignment);
        Assert.Equal(ExcelHorizontalAlignment.Center,
            worksheet.Column(ColumnIndexBirthday).Style.HorizontalAlignment);
    }

    #region Helpers

    private CustomerInfo FakeCustomerReportInfo()
    {
        return new CustomerInfo
        {
            Headline = "test",
            Checker = "",
            Position = "Super",
            IsVIP = true,
            BirthDay = new DateTime(2022, 04, 25)
        };
    }

    private CustomerReportExcelTestable CreateExcel()
    {
        customerReportInfo = new CustomerReportInfo
        {
            CustomerList = new List<CustomerInfo>()
            {
                new()
                {
                    Headline = "test",
                    Checker = "",
                    Position = "Super",
                    IsVIP = true,
                    BirthDay = new DateTime(2022, 04, 25)
                }
            }
        };
        return Substitute.For<CustomerReportExcelTestable>(string.Empty, customerReportInfo);
    }

    #endregion Helpers
}