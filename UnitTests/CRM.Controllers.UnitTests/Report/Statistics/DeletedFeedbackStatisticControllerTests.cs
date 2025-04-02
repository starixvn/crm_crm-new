namespace CRM.Controllers.UnitTests.Report.Statistics;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using Criteria.Report.DeletedFeedbackStatistic;
using CRM.Controllers.Report.Statistics;
using CRM.Models.Report.DeletedFeedbackStatistic;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services.Feedback;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class DeletedFeedbackStatisticControllerTests
{
    private readonly IFixture fixture = new Fixture();
    private IFeedbackService feedbackService;
    private ICommonService commonService;
    private ISettingService settingService;
    private IExportExcelService excelService;
        

    [Fact]
    public async Task GetDeletedFeedbackStatistics_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var deletedFeedbacks = fixture.Create<IEnumerable<DeletedFeedbackStatistic>>();
        var param = fixture.Create<DeletedFeedbackStatisticsCriteria>();
        var controller = GetController();
        feedbackService.GetDeletedFeedbackStatisticAsync(param).Returns(deletedFeedbacks);
        var deletedFeedbackGroup = deletedFeedbacks.GroupBy(p => p.Handler);
        var deletedFeedbackByHandler = deletedFeedbackGroup.Select(p =>
            new DeletedFeedbackByHandler
            {
                Handler = p.Key,
                DeletedFeedbacks = p
            });
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.GetDeletedFeedbackStatistics(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var data = (IEnumerable<DeletedFeedbackByHandler>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var categories = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        Assert.Equal(deletedFeedbackByHandler.First().DeletedFeedbacks, data.First().DeletedFeedbacks);
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
        var deletedFeedbacks = fixture.Create<IEnumerable<DeletedFeedbackStatistic>>();
        var param = fixture.Create<DeletedFeedbackStatisticsCriteria>();
        var fileName = $"{ViewResources.DeletedFeedbacStatistickReport_Title}.xlsx";
        var controller = GetController();
        feedbackService.GetDeletedFeedbackStatisticAsync(param).Returns(deletedFeedbacks);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.ExportExcel(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal(fileName, excelResult.FileDownloadName);
    }

    #region Helpers

    private DeletedFeedbackStatisticsController GetController()
    {
        feedbackService = Substitute.For<IFeedbackService>();
        commonService = Substitute.For<ICommonService>();
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
            
        return new DeletedFeedbackStatisticsController(feedbackService, commonService, settingService, excelService);
    }

    #endregion Helpers
}