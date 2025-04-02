namespace CRM.Controllers.UnitTests.Report;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Report;
using CRM.Criteria.Report.DynamicReport;
using CRM.Models.Report.DynamicReport;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Report;
using CRM.ViewModels.Feedback;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class DynamicReportControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ISettingService settingService;
    private IExportExcelService excelService;
    private IDynamicReportService dynamicReportService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetDynamicReport_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var logs = new DynamicReportInfo()
        {
            Id = "1",
            Name = "Daily report"
        };
        var param = fixture.Create<GetDynamicReportCriteria>();
        param.PageIndex = 1;
        param.PageSize = 100;
        var controller = GetController();
        dynamicReportService.GetDynamicReportAsync(param).Returns(logs);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.GetDynamicReports(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var dynamicReportInfo = jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var categories = jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        Assert.Equal(logs, dynamicReportInfo);
        Assert.Equal(mainCategories, categories);
    }

    [Fact]
    public async Task GetAllSetting_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var extentions = fixture.Create<IEnumerable<SettingRelation>>();
        var statuses = fixture.Create<IEnumerable<FeedbackStatus>>();
        var communicationTools = new List<Setting> { new() { Id = 1 } };
        var responses = fixture.Create<IEnumerable<SettingRelation>>();
        var roles = fixture.Create<IEnumerable<SettingRelation>>();
        var sites = new List<SiteInfo> { new() { IsLicensee = true } };
        var mainCategories = new List<Setting> { new() { Id = 1 } };
        var subCategories = new List<Setting> { new() { Id = 1 } };
        var products = new List<Product> { new() { Id = 1 } };
        var subProducts = new List<Product> { new() { Id = 1 } };
        var periodTypes = new List<Setting> { new() { Id = 1 } };

        var controller = GetController();
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extentions);
        settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(statuses);
        settingService.GetCommunicationToolAsync(SettingConstants.Active, true).Returns(communicationTools);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(responses);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Role).Returns(roles);
        settingService.GetAllSitesWithGroupAsync().Returns(sites);
        settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
        settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategories);
        settingService.GetProductAsync(SettingConstants.Active).Returns(products);
        settingService.GetSubProductAsync(active: SettingConstants.Active).Returns(subProducts);
        settingService.GetAllPeriodTypes().Returns(periodTypes);

        // Act
        var result = await controller.GetAllSettings();

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var allSettings = (CreateFeedbackViewModel)jsonResult.Value;
        Assert.Equal(extentions.Where(x => x.Id != NAConstants.ExtentionNA), allSettings.Extensions);
        Assert.Equal(statuses, allSettings.Statuses);
        Assert.Equal(communicationTools, allSettings.CommunicationTools);
        Assert.Equal(responses, allSettings.Responses);
        Assert.Equal(roles.Where(x => x.IsActive), allSettings.Roles);
        Assert.Equal(sites, allSettings.Sites);
        Assert.Equal(mainCategories, allSettings.MainCategories);
        Assert.Equal(subCategories, allSettings.SubCategories);
        Assert.Equal(products, allSettings.Products);
        Assert.Equal(subProducts, allSettings.SubProducts);
        Assert.Equal(periodTypes, allSettings.PeriodTypes);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var param = fixture.Create<GetDynamicReportCriteria>();
        param.ReportType = 1;
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var logs = new DynamicReportInfo()
        {
            Id = "1",
            Name = "Daily report"
        };
        var fromDateFormat = param.FromDate.ToString("MM_dd_yyyy");
        var toDateFormat = param.ToDate.ToString("MM_dd_yyyy");
        var periodTypeName = SettingService.GetPeriodTypeName(param.ReportType);
        var fileName = string.Format(ViewResources.DynamicReport_ExcelTitle, periodTypeName, fromDateFormat, toDateFormat);

        var controller = GetController();
        dynamicReportService.GetDynamicReportAsync(param).Returns(logs);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.ExportExcel(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
    }

    #region Helpers

    private DynamicReportController GetController()
    {
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        dynamicReportService = Substitute.For<IDynamicReportService>();
        permissionService = Substitute.For<IPermissionService>();
        return new DynamicReportController(settingService, dynamicReportService, excelService, permissionService);
    }

    #endregion Helpers
}