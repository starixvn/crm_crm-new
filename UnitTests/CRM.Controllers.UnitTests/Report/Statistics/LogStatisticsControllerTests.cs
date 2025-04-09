namespace CRM.Controllers.UnitTests.Report.Statistics;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Report.Statistics;
using CRM.Criteria.Report.LogStatistics;
using CRM.Models.Report.LogStatistics;
using CRM.Models.Setting;
using CRM.Services;
using CRM.Services.Report;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class LogStatisticsControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ILogStatisticsService logStatisticsService;
    private ISettingService settingService;
    private IExportExcelService excelService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
        fixture.Behaviors.Add(new OmitOnRecursionBehavior(1));

        var products = fixture.Create<IEnumerable<Product>>();
        var mainCategories = fixture.Create<IEnumerable<Setting>>();
        var communicationTools = fixture.Create<IEnumerable<Setting>>();

        var controller = GetController();
        settingService.GetProductAsync().Returns(products);
        settingService.GetMainCategoryAsync().Returns(mainCategories);
        settingService.GetCommunicationToolAsync(2, true).Returns(communicationTools);

        // Act
        var result = await controller.GetAllSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var productsJson = (IEnumerable<Product>)jsonResult.Value.GetType().GetProperty("products").GetValue(jsonResult.Value);
        var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        var communicationToolsJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("communicationTools").GetValue(jsonResult.Value);

        Assert.Equal(productsJson, products);
        Assert.Equal(mainCategoriesJson, mainCategories);
        Assert.Equal(communicationToolsJson, communicationTools);
    }

    [Fact]
    public async Task GetMainReport_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var ibcReport = fixture.Create<LogStatisticsViewModel>();
        var criteria = fixture.Create<LogStatisticsCriteria>();

        var controller = GetController();
        logStatisticsService.GetReportDataAsync(Arg.Do<LogStatisticsCriteria>(x => _ = x)).Returns(ibcReport);

        // Act
        var result = await controller.GetMainReport(criteria);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var ibcReportJson = (LogStatisticsViewModel)jsonResult.Value.GetType().GetProperty("ibcReport").GetValue(jsonResult.Value);

        Assert.Equal(ibcReportJson.ExcelFileName, ibcReport.ExcelFileName);
        Assert.Equal(ibcReportJson.CommunicationColumns, ibcReport.CommunicationColumns);
        Assert.Equal(ibcReportJson.GrandTotalOfCommunicationCount, ibcReport.GrandTotalOfCommunicationCount);
        Assert.Equal(ibcReportJson.GrandTotalOfCommunicationSumByProduct, ibcReport.GrandTotalOfCommunicationSumByProduct);
    }

    [Fact]
    public async Task GetReportDetails_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var criteria = fixture.Create<LogStatisticsDetailCriteria>();
        var reportDetails = new StatisticsDetailReportByDateModel
        {
            ChildReports = new List<StatisticsDetailByDateModel>
            {
                new() {FeedbackID = 1}
            }
        };
        var report = reportDetails.ChildReports;
        var products = new List<Product> { new() { Id = 1, Name = "product" } };
        var subProducts = new List<Product> { new() { Id = 1, Name = "subProducts" } };
        var mainCategories = new List<Setting> { new() { Id = 1, Name = "mainCategory" } };
        var communicationTools = new List<Setting> { new() { Id = 1, Name = "communicationTool" } };
        var extensions = new List<SettingRelation> { new() { Id = 1, Value = "extension" } };

        var controller = GetController();
        logStatisticsService.GetReportDetailsAsync(criteria).Returns(reportDetails);
        settingService.GetProductAsync().Returns(products);
        settingService.GetSubProductAsync().Returns(subProducts);
        settingService.GetAllMainSubCategoriesAsync().Returns(mainCategories);
        settingService.GetCommunicationToolAsync().Returns(communicationTools);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extensions);

        // Act
        var result = await controller.GetReportDetails(criteria);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var reportJson = (IEnumerable<StatisticsDetailByDateModel>)jsonResult.Value.GetType().GetProperty("report").GetValue(jsonResult.Value);
        var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        var productsJson = (IEnumerable<Product>)jsonResult.Value.GetType().GetProperty("products").GetValue(jsonResult.Value);
        var subProductsJson = (IEnumerable<Product>)jsonResult.Value.GetType().GetProperty("subProducts").GetValue(jsonResult.Value);
        var communicationToolsJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("communicationTools").GetValue(jsonResult.Value);
        var extensionsJson = (IEnumerable<SettingRelation>)jsonResult.Value.GetType().GetProperty("extensions").GetValue(jsonResult.Value);

        Assert.Equal(reportJson, report);
        Assert.Equal(mainCategoriesJson, mainCategories);
        Assert.Equal(productsJson, products);
        Assert.Equal(subProductsJson, subProducts);
        Assert.Equal(communicationToolsJson, communicationTools);
        Assert.Equal(extensionsJson, extensions);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var controller = GetController();
        var criteria = fixture.Create<LogStatisticsCriteria>();
        var param = new LogStatisticsCriteria
        {
            ProductId = criteria.ProductId,
            MainCategoryId = criteria.MainCategoryId,
            CommunicationId = criteria.CommunicationId,
            FromDate = criteria.FromDate,
            ToDate = criteria.ToDate,
            ProductType = LogStatisticConstants.ProductTypeDetails,
            CategoryType = LogStatisticConstants.SubCategory,
            SiteType = criteria.SiteType
        };
        var logStatistics = fixture.Create<LogStatisticsViewModel>();

        logStatisticsService.GetReportDataAsync(param).Returns(logStatistics);

        // Act
        var result = await controller.ExportExcel(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
    }

    [Fact]
    public async Task ExportExcelDetails_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var controller = GetController();
        var criteria = fixture.Create<LogStatisticsDetailCriteria>();

        var logStatisticsDetail = new StatisticsDetailReportByDateModel
        {
            ChildReports = new List<StatisticsDetailByDateModel>
            {
                new() {FeedbackID = 1}
            },
            ExcelFileName = "ExcelFileName"
        };
        var products = new List<Product> { new() { Id = 1, Name = "product" } };
        var subProducts = new List<Product> { new() { Id = 1, Name = "subProducts" } };
        var mainCategories = new List<Setting> { new() { Id = 1, Name = "mainCategory" } };
        var communicationTools = new List<Setting> { new() { Id = 1, Name = "communicationTool" } };
        var extensions = new List<SettingRelation> { new() { Id = 1, Value = "extension" } };

        logStatisticsService.GetReportDetailsAsync(criteria).Returns(logStatisticsDetail);
        settingService.GetProductAsync().Returns(products);
        settingService.GetSubProductAsync().Returns(subProducts);
        settingService.GetAllMainSubCategoriesAsync().Returns(mainCategories);
        settingService.GetCommunicationToolAsync().Returns(communicationTools);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Extension, SettingConstants.Active).Returns(extensions);

        // Act
        var result = await controller.ExportExcelDetails(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{logStatisticsDetail.ExcelFileName}.xlsx", excelResult.FileDownloadName);
    }

    #region Helpers

    private LogStatisticsController GetController()
    {
        logStatisticsService = Substitute.For<ILogStatisticsService>();
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        permissionService = Substitute.For<IPermissionService>();

        return new LogStatisticsController(logStatisticsService, settingService, excelService, permissionService);
    }

    #endregion Helpers
}