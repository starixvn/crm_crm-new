namespace CRM.Controllers.UnitTests.Feedback;

using AutoFixture;
using Constants;
using CRM.Controllers.Feedback;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services.Feedback;
using Microsoft.AspNetCore.Mvc;
using Models.Feedback.DeletedFeedback;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

public class DeletedFeedbackControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ISettingService settingService;
    private IExportExcelService excelService;
    private IFeedbackService feedbackService;

    [Fact]
    public async Task GetDeletedFeedback_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var feedbacks = fixture.Create<IEnumerable<FeedbackDeleted>>();
        var param = fixture.Create<GetDeletedFeedbackParam>();
        param.PageIndex = 1;
        param.PageSize = 100;
        var controller = GetController();
        feedbackService.GetDeletedFeedbackAsync(param).Returns(feedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.GetDeletedFeedback(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var deletedFeedbacks = (IEnumerable<FeedbackDeleted>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        Assert.Equal(feedbacks, deletedFeedbacks);
        Assert.Equal(mainCategories, categories);
    }

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnAsExpectedJson()
    {
        // Arrange
        var customerResponse = new List<SettingRelation> { new() { Id = 1, IsActive = false }, };
        var mainCategories = new List<Setting> { new() { Id = 1 } };
        var subCategories = new List<Setting> { new() { Id = 1 } };
        var communications = new List<Setting> { new() { Id = 1 } };
        var controller = GetController();
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response, SettingConstants.Active).Returns(customerResponse);
        settingService.GetMainCategoryAsync(SettingConstants.Active).Returns(mainCategories);
        settingService.GetSubCategoryAsync(active: SettingConstants.Active).Returns(subCategories);
        settingService.GetCommunicationToolAsync(SettingConstants.Active, true).Returns(communications);

        // Act
        var result = await controller.GetAllSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var customerResponsesJson = (IEnumerable<SettingRelation>)jsonResult.Value.GetType().GetProperty("customerResponses").GetValue(jsonResult.Value);
        var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        var subCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("subCategories").GetValue(jsonResult.Value);
        var communicationsJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("communications").GetValue(jsonResult.Value);

        Assert.Equal(customerResponsesJson, customerResponse);
        Assert.Equal(mainCategoriesJson, mainCategories);
        Assert.Equal(subCategoriesJson, subCategories);
        Assert.Equal(communicationsJson, communications);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var feedbacks = fixture.Create<IEnumerable<FeedbackDeleted>>();
        var param = fixture.Create<GetDeletedFeedbackParam>();
        var fileName = $"{ViewResources.DeletedFeedbackReport_Title}.xlsx";
        var controller = GetController();
        feedbackService.GetDeletedFeedbackAsync(param).Returns(feedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.ExportExcel(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    private DeletedFeedbackController GetController()
    {
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        feedbackService = Substitute.For<IFeedbackService>();
        return new DeletedFeedbackController(settingService, excelService, feedbackService);
    }
}