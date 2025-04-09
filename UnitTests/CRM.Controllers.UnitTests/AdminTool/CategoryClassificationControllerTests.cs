namespace CRM.Controllers.UnitTests.AdminTool;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.AdminTool;
using CRM.Models;
using CRM.Models.AdminTool.CategoryClassification;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services.AdminTool;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class CategoryClassificationControllerTests : Controller
{
    private ISettingService settingService;
    private ICategoryClassificationService categoryClassificationService;
    private IExportExcelService excelService;

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnExpectedDataAsync()
    {
        //Arrange
        var mainCategories = new List<Setting>
        {
            new() {Id = 1, Name = "test"}
        };
        var subCategories = new List<Setting>
        {
            new() {Id = 1, Name = "test"}
        };
        var controller = GetController();
        settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
        settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategories);

        // Act
        var result = await controller.GetAllSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("MainCategories").GetValue(jsonResult.Value);
        var subCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("SubCategories").GetValue(jsonResult.Value);

        Assert.Equal(mainCategories, mainCategoriesJson);
        Assert.Equal(subCategories, subCategoriesJson);
    }

    [Fact]
    public async Task GetCategoryClassification_WhenCalled_ReturnExpectedDataAsync()
    {
        // Arrange
        var fixture = new Fixture();
        var categoryClassification = fixture.Create<IEnumerable<CategoryClassification>>();
        var param = fixture.Create<GetCategoryClassification>();
        var controller = GetController();
        categoryClassificationService.GetCategoryClassificationAsync(param).Returns(categoryClassification);

        // Act
        var result = await controller.GetCategoryClassification(param);

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var groupCategory = jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var totalItems = jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
        Assert.Equal(categoryClassification.GroupBy(x => x.MainCategoryID), groupCategory);
        Assert.Equal(param.TotalRows, totalItems);
    }

    [Fact]
    public async Task GetCategoryClassById_WhenCalled_ReturnsExpectedDataAsync()
    {
        // Arrange
        var fixture = new Fixture();
        var mainCategoryId = fixture.Create<int>();
        var subCategoryId = fixture.Create<int>();
        var categoryClassification = fixture.Create<CategoryClassification>();
        var controller = GetController();
        categoryClassificationService.GetCategoryClassByIdAsync(mainCategoryId, subCategoryId).Returns(categoryClassification);

        // Act
        var result = await controller.GetCategoryClassById(mainCategoryId, subCategoryId);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.Equal(categoryClassification, jsonResult.Value);
    }

    [Fact]
    public async Task GetCategoryClassById_WhenCalled_ReturnsNotFound()
    {
        // Arrange
        var fixture = new Fixture();
        var mainCategoryId = fixture.Create<int>();
        var subCategoryId = fixture.Create<int>();
        var controller = GetController();
        categoryClassificationService.GetCategoryClassByIdAsync(mainCategoryId, subCategoryId).Returns((CategoryClassification)null);

        // Act
        var result = await controller.GetCategoryClassById(mainCategoryId, subCategoryId);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task EditCategoryClassification_WhenCalled_ReturnsExpectedResult()
    {
        // Arrange
        var fixture = new Fixture();
        var model = fixture.Create<EditCategoryClassification>();
        var commandResult = fixture.Create<CommandResult>();
        var controller = GetController();
        categoryClassificationService.EditCategoryClassificationAsync(model).Returns(commandResult);

        // Act
        var result = await controller.EditCategoryClassification(model);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        Assert.Equal(commandResult, jsonResult.Value);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_ReturnsFileResult()
    {
        // Arrange
        var fixture = new Fixture();
        var param = fixture.Create<GetCategoryClassification>();
        var categoryClassifications = fixture.Create<IEnumerable<CategoryClassification>>();
        var excelBytes = fixture.Create<byte[]>();
        var controller = GetController();
        categoryClassificationService.GetCategoryClassificationAsync(param).Returns(categoryClassifications);
        excelService.ExportCategoryClassification(categoryClassifications).Returns(excelBytes);

        // Act
        var result = await controller.ExportExcel(param);

        // Assert
        var fileResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(excelBytes, fileResult.FileContents);
        Assert.Equal("application/xlsx", fileResult.ContentType);
        Assert.Equal($"{ViewResources.CategoryClassification}.xlsx", fileResult.FileDownloadName);
    }

    #region Helpers

    private CategoryClassificationController GetController()
    {
        categoryClassificationService = Substitute.For<ICategoryClassificationService>();
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        return new CategoryClassificationController(settingService, categoryClassificationService, excelService);
    }

    #endregion Helpers
}