namespace CRM.Controllers.UnitTests.Feedback;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using CRM.Controllers.Feedback;
using CRM.Criteria.Feedback.ManageFeedback;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Feedback;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class ManageFeedbackControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private ISettingService settingService;
    private IFeedbackService feedbackService;
    private IExportExcelService exportExcelService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetAllSettings_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList().ForEach(b => fixture.Behaviors.Remove(b));
        fixture.Behaviors.Add(new OmitOnRecursionBehavior(1));
        var responses = fixture.Create<IEnumerable<SettingRelation>>();
        var mainCategories = fixture.Create<IEnumerable<Setting>>();
        var subCategories = fixture.Create<IEnumerable<Setting>>();
        var communications = fixture.Create<IEnumerable<Setting>>();
        var customerTypes = fixture.Create<IEnumerable<Setting>>();
        var status = fixture.Create<IEnumerable<FeedbackStatus>>();
        var controller = GetController();
        settingService.GetAllCustomerTypes().Returns(customerTypes);
        settingService.GetSettingRelationByNameAsync(SettingTypeConstants.Response).Returns(responses);
        settingService.GetMainCategoryAsync().Returns(mainCategories);
        settingService.GetSubCategoryAsync().Returns(subCategories);
        settingService.GetCommunicationToolAsync(isIncludeNA: true).Returns(communications);
        settingService.GetStatusAsync(ViewTypeConstants.CommunicationTool).Returns(status);

        // Act
        var result = await controller.GetAllSettings();

        //Assert
        var jsonResult = Assert.IsType<JsonResult>(result);

        var customerTypesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("CustomerTypes").GetValue(jsonResult.Value);
        var responsesJson = (IEnumerable<SettingRelation>)jsonResult.Value.GetType().GetProperty("Responses").GetValue(jsonResult.Value);
        var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("MainCategories").GetValue(jsonResult.Value);
        var subCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("SubCategories").GetValue(jsonResult.Value);
        var communicationsJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("Communications").GetValue(jsonResult.Value);
        var statusJson = (IEnumerable<FeedbackStatus>)jsonResult.Value.GetType().GetProperty("Statuses").GetValue(jsonResult.Value);

        Assert.Equal(customerTypesJson, customerTypes);
        Assert.Equal(responsesJson, responses);
        Assert.Equal(mainCategoriesJson, mainCategories);
        Assert.Equal(subCategoriesJson, subCategories);
        Assert.Equal(communicationsJson, communications);
        Assert.Equal(statusJson, status);
    }

    [Fact]
    public async Task SearchManageFeedback_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var feedbacks = fixture.Create<IEnumerable<FeedbackDeleted>>();
        var feedbacksOrder = feedbacks.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);
        var criteria = fixture.Create<ManageFeedbackCriteria>();
        criteria.PageIndex = 1;
        criteria.PageSize = 100;
        var controller = GetController();
        feedbackService.GetManageFeedbackAsync(criteria).Returns(feedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.SearchManageFeedback(criteria);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var manageFeedbacks = (IEnumerable<FeedbackDeleted>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        var totalItems = (int)jsonResult.Value.GetType().GetProperty("totalItems").GetValue(jsonResult.Value);
        Assert.Equal(feedbacksOrder, manageFeedbacks);
        Assert.Equal(mainCategories, categories);
        Assert.Equal(criteria.TotalRows, totalItems);
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
        var criteria = fixture.Create<ManageFeedbackCriteria>();
        criteria.PageIndex = 1;
        criteria.PageSize = 100;
        var reportName = string.Format(ViewResources.FeedbackFromUsernameExcelFile, criteria.Username);
        var fileName = $"{reportName}.xlsx";
        var controller = GetController();
        feedbackService.GetManageFeedbackAsync(criteria).Returns(feedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.ExportExcel(criteria);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    private ManageFeedbackController GetController()
    {
        settingService = Substitute.For<ISettingService>();
        feedbackService = Substitute.For<IFeedbackService>();
        exportExcelService = Substitute.For<IExportExcelService>();
        permissionService = Substitute.For<IPermissionService>();
        return new ManageFeedbackController(settingService, feedbackService, exportExcelService, permissionService);
    }
}