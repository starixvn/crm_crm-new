namespace CRM.Controllers.UnitTests.Report;

using AutoFixture;
using CRM.Controllers.Report;
using CRM.Criteria.Report.DirectCustomerReport;
using CRM.Models.Report.DirectCustomerReport;
using CRM.Services;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using System.Collections.Generic;
using System.Threading.Tasks;
using Constants;
using Services.ExportExcel;
using Xunit;
public class DirectReportControllerTests
{
    private IExportExcelService exportExcelService;
    private IBaseService baseService;
        

    [Fact]
    public async Task ExportDirectReport_WhenCalled_ReturnExpectedResult()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<DirectCustomerReportCriteria>();
        var fileName = "Direct_Customer_Report.xlsx";
        var expected = fixture.Create<byte[]>();
        var controller = GetController();
        var templates = CreateReportInfo();
        exportExcelService.ExportDirectCustomerReport(templates).Returns(expected);

        // Act
        var result = await controller.ExportDirectReport(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    [Fact]
    public async Task GetDirectReport_WhenCalled_ReturnExpectedData()
    {
        // Arrange
        var fixture = new Fixture();
        var criteria = fixture.Create<DirectCustomerReportCriteria>();
        var rawData = fixture.Create<IEnumerable<DirectCustomerInfo>>();
        var controller = GetController();
        baseService.GetDataAsync<DirectCustomerInfo>(Arg.Do<DirectCustomerReportCriteria>(x => criteria = x)).Returns(rawData);

        // Act
        var result = await controller.GetDirectReport(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var directReportInfoTemplates = (DirectCustomerReportInfo)jsonResult.Value;
        Assert.Equal(rawData, directReportInfoTemplates.CustomerList);
        Assert.Equal(criteria.TotalRows, directReportInfoTemplates.TotalCustomer);

    }

    #region Helpers
    private DirectReportController GetController()
    {
        exportExcelService = Substitute.For<IExportExcelService>();
        baseService = Substitute.For<IBaseService>();
        return new DirectReportController(exportExcelService, baseService);
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