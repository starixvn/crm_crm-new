namespace CRM.Controllers.UnitTests.Feedback;

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Feedback;
using CRM.Criteria.Feedback;
using CRM.Models.Feedback;
using CRM.Models.Feedback.LatestFeedback;
using CRM.Models.Setting;
using CRM.Services;
using CRM.Services.Feedback;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class LatestFeedbackControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ISettingService settingService;
    private IExportExcelService excelService;
    private IFeedbackService feedbackService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetLatestFeedback_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var feedbacks = fixture.Create<IEnumerable<FeedbackDeleted>>();
        var criteria = fixture.Create<GetLatestFeedbackCriteria>();
        var controller = GetController();
        feedbackService.GetLatestFeedbackAsync(criteria).Returns(feedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.GetLatestFeedback(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var latestFeedbacks = (IEnumerable<FeedbackDeleted>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        Assert.Equal(feedbacks, latestFeedbacks);
        Assert.Equal(mainCategories, categories);
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
        var param = fixture.Create<GetLatestFeedbackCriteria>();
        var fileName = $"Top_{param.Top}_Feedback.xlsx";
        var controller = GetController();
        feedbackService.GetLatestFeedbackAsync(param).Returns(feedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.ExportExcel(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    [Fact]
    public async Task GetLatestFeedbackByCustId_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var feedbacks = fixture.Create<IEnumerable<FeedbackDeleted>>();
        var criteria = fixture.Create<GetLatestFeedbackByCustIdCriteria>();
        var controller = GetController();
        feedbackService.GetLatestFeedbackAsync(criteria).Returns(feedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.GetLatestFeedbackByCustId(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var latestFeedbacks = (IEnumerable<FeedbackDeleted>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        Assert.Equal(feedbacks, latestFeedbacks);
        Assert.Equal(mainCategories, categories);
    }

    [Fact]
    public async Task SearchByCustExportExcel_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var feedbacks = fixture.Create<IEnumerable<FeedbackDeleted>>();
        var param = fixture.Create<GetLatestFeedbackParam>();
        var criteria = new GetLatestFeedbackByCustIdCriteria
        {
            Top = param.Top,
            CustID = param.CustID
        };
        var fileName = $"Top_{param.Top}_Feedback_From_{param.UserName}.xlsx";
        var controller = GetController();
        feedbackService.GetLatestFeedbackAsync(criteria).Returns(feedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.SearchByCustExportExcel(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    #region Helpers

    private LatestFeedbackController GetController()
    {
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        feedbackService = Substitute.For<IFeedbackService>();
        permissionService = Substitute.For<IPermissionService>();
        return new LatestFeedbackController(excelService, settingService, feedbackService, permissionService);
    }

    #endregion Helpers
}