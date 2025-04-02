namespace CRM.Controllers.UnitTests.Report;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Report;
using CRM.Models.Report.CustomerReport;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services.Report;
using CRM.ViewModels.Customer;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class CustomerReportControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ISettingService settingService;
    private IExportExcelService excelService;
    private ICustomerReportService customerReportService;

    [Fact]
    public async Task GetCustomerReport_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var customerReport = fixture.Create<CustomerReportInfo>();
        var param = fixture.Create<GetCustomerReportParam>();
        var controller = GetController();
        customerReportService.GetCustomerReportAsync(param).Returns(customerReport);

        // Act
        var result = await controller.GetCustomerReport(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.Equal(customerReport, jsonResult.Value);
    }

    [Fact]
    public async Task GetAllSetting_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var roles = fixture.Create<IEnumerable<SettingRelation>>();
        var sites = new List<SiteInfo> { new() { IsLicensee = true } };
        var languages = fixture.Create<IEnumerable<Language>>();

        var controller = GetController();
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role).Returns(roles);
        settingService.GetAllSitesWithGroupAsync().Returns(sites);
        settingService.GetLanguageAsync(SettingConstants.Active, true).Returns(languages);

        // Act
        var result = await controller.GetAllSettings();

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var allSettings = (CreateCustomerInfoViewModel)jsonResult.Value;
        Assert.Equal(roles.Where(x => x.IsActive), allSettings.Roles);
        Assert.Equal(sites, allSettings.Sites);
        Assert.Equal(languages, allSettings.Languages);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var customerReport = fixture.Create<CustomerReportInfo>();
        var param = fixture.Create<GetCustomerReportParam>();
        var fileName = ViewResources.CustomerReportExcel;
        var bytes = fixture.Create<byte[]>();

        var controller = GetController();
        customerReportService.GetCustomerReportAsync(param).Returns(customerReport);
        excelService.ExportCustomerReport(customerReport).Returns(bytes);

        // Act
        var result = await controller.ExportExcel(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
    }

    #region Helpers
    private CustomerReportController GetController()
    {
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        customerReportService = Substitute.For<ICustomerReportService>();
        return new CustomerReportController(settingService, customerReportService, excelService);
    }
    #endregion
}