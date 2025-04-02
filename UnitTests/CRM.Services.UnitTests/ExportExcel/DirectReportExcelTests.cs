namespace CRM.Services.UnitTests.ExportExcel;

using CRM.Models.Report.DirectCustomerReport;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Xunit;

public class DirectReportExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private DirectCustomerReportInfo reportInfo;

    [Fact]
    public void RenderTitle_WhenCalled_ExpectedCopyRows()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderTitle(template, worksheet);

        // Assert
        Assert.Equal(template.Cells[1, 2, 3, 4], worksheet.Cells[1, 2, 3, 4]);
    }

    [Fact]
    public void RenderHeader_WhenCalled_ExpectedCopyRows()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderHeader(template, worksheet);

        // Assert
        Assert.Equal(template.Cells[4, 1, 4, 4], worksheet.Cells[4, 1, 4, 4]);
    }

    [Fact]
    public void RenderBody_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var template = excelPackage.Worksheets.Add("template");
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_RenderBody(template, worksheet);

        // Assert
        service.Received().Protected("RenderRow", worksheet, reportInfo.CustomerList.First(), 5);
    }

    [Fact]
    public void ProcessUI_WhenCalled_CallExpectedMethod()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_ProcessUI(worksheet);

        // Assert
        service.Received().Protected("SetDefaultStyle", worksheet);
        service.Received().Protected("SetBackground", Arg.Any<ExcelRange>());
        service.Received().Protected("DrawBorderCell", Arg.Any<ExcelRange>());
    }

    [Fact]
    public void SetValueRow_WhenCalledWithChildReportsCountGreaterOne_ExpectedCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();
        var report = CreateReportInfo();
        var lastCol = 30;
        var rowIndex = 5;

        // Act
        service.Public_RenderRow(worksheet, reportInfo.CustomerList.First(), 5);

        // Assert
        Assert.True(worksheet.Cells[rowIndex, 1, report.CustomerList.Count(), 1].Merge);
        Assert.True(worksheet.Cells[rowIndex, lastCol, report.CustomerList.Count(), lastCol].Merge);
        Assert.Equal(report.CustomerList.First().Headline ?? "not assign group", worksheet.Cells[rowIndex, 1].Value);
        Assert.Equal(report.CustomerList.First().Username, worksheet.Cells[rowIndex, 2].Value);
        Assert.Equal(report.CustomerList.First().Status, worksheet.Cells[rowIndex, 3].Value);
        Assert.Equal(report.CustomerList.First().Site, worksheet.Cells[rowIndex, 4].Value);
        Assert.Equal(report.CustomerList.First().Currency, worksheet.Cells[rowIndex, 5].Value);
        Assert.Equal(report.CustomerList.First().Position, worksheet.Cells[rowIndex, 6].Value);
        Assert.Equal(report.CustomerList.First().IntroducedBy, worksheet.Cells[rowIndex, 7].Value);
        Assert.Equal(report.CustomerList.First().Language_name, worksheet.Cells[rowIndex, 8].Value);
        Assert.Equal(report.CustomerList.First().CountryName, worksheet.Cells[rowIndex, 9].Value);
        Assert.Equal(report.CustomerList.First().Checker, worksheet.Cells[rowIndex, 10].Value);
        Assert.Equal("√", worksheet.Cells[rowIndex, 11].Value);
        Assert.Equal(report.CustomerList.First().FirstName, worksheet.Cells[rowIndex, 12].Value);
        Assert.Equal(report.CustomerList.First().LastName, worksheet.Cells[rowIndex, 13].Value);
        Assert.Equal(report.CustomerList.First().Phone, worksheet.Cells[rowIndex, 14].Value);
        Assert.Equal(report.CustomerList.First().Phone2, worksheet.Cells[rowIndex, 15].Value);
        Assert.Equal(report.CustomerList.First().Phone3, worksheet.Cells[rowIndex, 16].Value);
        Assert.Equal(report.CustomerList.First().PIC1, worksheet.Cells[rowIndex, 17].Value);
        Assert.Equal(report.CustomerList.First().PIC2, worksheet.Cells[rowIndex, 18].Value);
        Assert.Equal(report.CustomerList.First().PIC3, worksheet.Cells[rowIndex, 19].Value);
        Assert.Equal(report.CustomerList.First().PIC4, worksheet.Cells[rowIndex, 20].Value);
        Assert.Equal(report.CustomerList.First().MobilePhone, worksheet.Cells[rowIndex, 21].Value);
        Assert.Equal(report.CustomerList.First().Email, worksheet.Cells[rowIndex, 22].Value);
        Assert.Equal(report.CustomerList.First().Skype, worksheet.Cells[rowIndex, 23].Value);
        Assert.Equal(report.CustomerList.First().MSN, worksheet.Cells[rowIndex, 24].Value);
        Assert.Equal(report.CustomerList.First().WhatsApp, worksheet.Cells[rowIndex, 25].Value);
        Assert.Equal(report.CustomerList.First().Line, worksheet.Cells[rowIndex, 26].Value);
        Assert.Equal(report.CustomerList.First().WeChat, worksheet.Cells[rowIndex, 27].Value);
        Assert.Equal(report.CustomerList.First().Yahoo, worksheet.Cells[rowIndex, 28].Value);
        Assert.Equal(report.CustomerList.First().BBM, worksheet.Cells[rowIndex, 29].Value);
        Assert.Equal(report.CustomerList.First().QQ, worksheet.Cells[rowIndex, lastCol].Value);
    }        

    [Fact]
    public void SetBackgroundTotalRow_WhenCalled_CallProtectedSetBackgroundAndExpectedBackground()
    {
        // Arrange
        var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
        var service = CreateService();

        // Act
        service.Public_SetBackground(cell);

        // Assert
        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
        Assert.True(cell.Style.Font.Bold);
    }

    [Fact]
    public void SetDefaultStyle_WhenCalled_ExpectedStyle()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateService();

        // Act
        service.Public_SetDefaultStyle(worksheet);

        // Assert
        service.Received().Protected("StyleDefault", worksheet);
        Assert.Equal(20, worksheet.Column(1).Width);
    }

    #region Helpers
    private DirectReportExcelTestable CreateService()
    {
        reportInfo = CreateReportInfo();
        var excel = Substitute.For<DirectReportExcelTestable>(string.Empty, reportInfo);
        return excel;
    }


    private DirectCustomerReportInfo CreateReportInfo()
    {            
        var CustomerList = new List<DirectCustomerInfo>
        {
            new()
            {
                BBM = "---",
                Checker= null,
                CountryName= null,
                Currency= "HK$",
                Email= "---",
                FirstName= "---",
                Headline= null,
                IntroducedBy= null,
                Language_name= "English",
                LastName= "---",
                Line= "---",
                MSN= "---",
                MobilePhone= "-----",
                PIC1= "-------",
                PIC2= "-------",
                PIC3= "-------",
                PIC4= "-------",
                Phone= "-----",
                Phone2= "-----",
                Phone3= "-----",
                Position= "Member",
                QQ= "---",
                Site= "BEST-ODDS",
                Skype= "---",
                Status= "Closed",
                Username= "0000HK",
                IsVIP= true,
                WeChat= "---",
                WhatsApp= "---",
                Yahoo= null
            }
        };

        return new DirectCustomerReportInfo
        {
            CustomerList = CustomerList,
            TotalCustomer = 1
        };
    }
    #endregion Helpers
}