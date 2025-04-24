namespace CRM.Controllers.UnitTests.Report.Statistics;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using Constants;
using Controllers.Report.Statistics;
using CRM.Criteria.Report.FeedbackStatistic;
using CRM.Models;
using CRM.Models.Feedback;
using CRM.Models.Report.FeedbackStatistic;
using CRM.Models.Report.FeedbackStatistic.FeedbackRating;
using CRM.Models.Setting;
using CRM.Resources;
using CRM.Services;
using CRM.Services.Feedback;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Services.ExportExcel;
using Services.Interfaces;
using Xunit;

public class FeedbackStatisticControllerTests
{
    private readonly Fixture fixture = new();
    private IFeedbackService feedbackService;
    private ICommonService commonService;
    private ISettingService settingService;
    private IExportExcelService excelService;
    private IPermissionService permissionService;

    [Fact]
    public async Task GetFeedbackStatisticDetails_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var feedbackDetail = fixture.Create<IEnumerable<FeedbackDeleted>>();
        fixture.Customize<GetFeedbackStatisticDetailCriteria>(x => x.With(b => b.PageIndex, 1).With(b => b.PageSize, 100));
        var param = fixture.Create<GetFeedbackStatisticDetailCriteria>();
        param.FeedbackDateString = "Apr 02, 2025";
        var controller = GetController();
        feedbackService.GetFeedbackStatisticDetailAsync(param).Returns(feedbackDetail);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);
        var feedbacksOrder = feedbackDetail.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);

        // Act
        var result = await controller.GetFeedbackStatisticDetails(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var feedbackDetailJson = (IEnumerable<FeedbackDeleted>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
        var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
        Assert.Equal(feedbacksOrder, feedbackDetailJson);
        Assert.Equal(mainCategories, mainCategoriesJson);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_TypeNotIsRatingFeedback_ReturnAsExpectedResult()
    {
        var fromDateServer = fixture.Create<DateTime>();
        var toDateServer = fixture.Create<DateTime>();
        var feedbackStatistic = new FeedbackStatisticInfo
        {
            Title = "FeedbackStatistic",
            FeedbackCategories = [
                new FeedbackCategory { SubTotal = new FeedbackSubcategory { Id = 1 } },
                new FeedbackCategory { SubTotal = new FeedbackSubcategory { Id = 2 } }
            ]
        };
        var param = fixture.Create<GetFeedbackStaticBaseModel>();
        param.Type = 1;
        var fromDateFormat = param.FromDate.ToString("MMddyyyy");
        var toDateFormat = param.ToDate.ToString("MMddyyyy");
        var fileName = string.Format(ViewResources.FeedbackStatistic_ExcelFile, fromDateFormat, toDateFormat);

        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(fromDateServer);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(toDateServer);
        feedbackService.GetFeedbackStatisticAsync(Arg.Any<GetFeedbackStatisticCriteria>()).Returns(feedbackStatistic);

        // Act
        var result = await controller.ExportExcel(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
    }

    [Fact]
    public async Task ExportExcel_WhenCalled_TypeIsRatingFeedback_ReturnAsExpectedResult()
    {
        var fromDateServer = fixture.Create<DateTime>();
        var toDateServer = fixture.Create<DateTime>();
        var ratingFbs = new FeedbackRatingReport
        {
            Title = "FeedbackStatistic",
            Records = [
                new FeedbackRatingRecord
                    {ColumnData = new BaseModel { Id = 1, Name = "Test"}, Excellent = 1, Good = 1, VeryPoor = 1, Neutral = 0,  Poor = 100},
                new FeedbackRatingRecord
                    { ColumnData = new BaseModel { Id = 2, Name = "Test" }, Excellent = 2, Good = 2, VeryPoor = 2, Neutral = 0,  Poor = 100 }
            ]
        };
        var param = fixture.Create<GetFeedbackStaticBaseModel>();
        param.Type = 12;
        var fromDateFormat = param.FromDate.ToString("MMddyyyy");
        var toDateFormat = param.ToDate.ToString("MMddyyyy");
        var fileName = string.Format(ViewResources.FeedbackStatistic_ExcelFile, fromDateFormat, toDateFormat);

        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(fromDateServer);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(toDateServer);
        feedbackService.GetFeedbackRatingStatisticAsync(Arg.Any<GetFeedbackRatingStatisticCriteria>()).Returns(ratingFbs);

        // Act
        var result = await controller.ExportExcel(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
    }

    [Fact]
    public async Task ExportExcelDetails_WhenCalled_ReturnAsExpectedResult()
    {
        // Arrange
        var mainCategories = new List<Setting>
        {
            new() { MainCategoryID = 1, Name = "Special Notification" }
        };
        var feedbackDetail = fixture.Create<IEnumerable<FeedbackDeleted>>();
        fixture.Customize<GetFeedbackStatisticDetailCriteria>(x => x.With(b => b.PageIndex, 0).With(b => b.PageSize, 100));
        var param = fixture.Create<GetFeedbackStatisticDetailCriteria>();
        param.FeedbackDateString = "Apr 02, 2025";
        var fromDateFormat = param.FromDate.ToString("MMddyyyy");
        var toDateFormat = param.ToDate.ToString("MMddyyyy");
        var fileName = string.Format(ViewResources.FeedbackStatisticDetail_ExcelFile, fromDateFormat, toDateFormat);
        var controller = GetController();
        feedbackService.GetFeedbackStatisticDetailAsync(param).Returns(feedbackDetail);
        settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

        // Act
        var result = await controller.ExportExcelDetails(param);

        // Assert
        var excelResult = Assert.IsType<FileContentResult>(result);
        Assert.Equal(MimeType.XLSX, excelResult.ContentType);
        Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
    }

    [Fact]
    public async Task GetFeedbackStatistic_WhenCalledWithType12_ReturnsExpectedResult()
    {
        // Arrange
        var fromDateServer = fixture.Create<DateTime>();
        var toDateServer = fixture.Create<DateTime>();
        var feedbackRatingReport = new FeedbackRatingReport
        {
            Title = "FeedbackRatingReport",
            Records = [new FeedbackRatingRecord { ColumnData = new BaseModel { Name = "Test" }, Excellent = 1 }],
        };
        var param = fixture.Build<GetFeedbackStaticBaseModel>()
            .With(x => x.Type, 12)
            .Create();
        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(fromDateServer);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(toDateServer);
        feedbackService.GetFeedbackRatingStatisticAsync(Arg.Any<GetFeedbackRatingStatisticCriteria>()).Returns(feedbackRatingReport);

        // Act
        var result = await controller.GetFeedbackStatistic(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var data = jsonResult.Value as FeedbackRatingReport;
        Assert.NotNull(data);
        Assert.Equal(feedbackRatingReport.Title, data.Title);
        Assert.Equal(feedbackRatingReport.Records, data.Records);
    }

    [Fact]
    public async Task GetFeedbackStatistic_WhenCalledWithType13_ReturnsExpectedResult()
    {
        // Arrange
        var fromDateServer = fixture.Create<DateTime>();
        var toDateServer = fixture.Create<DateTime>();
        var feedbackRatingReport = new FeedbackRatingReport
        {
            Title = "FeedbackRatingReport",
            Records = [new FeedbackRatingRecord { ColumnData = new BaseModel { Name = "Test" }, Excellent = 1 }],
        };
        var param = fixture.Build<GetFeedbackStaticBaseModel>()
            .With(x => x.Type, 13)
            .Create();
        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(fromDateServer);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(toDateServer);
        feedbackService.GetFeedbackRatingStatisticAsync(Arg.Any<GetFeedbackRatingStatisticCriteria>()).Returns(feedbackRatingReport);

        // Act
        var result = await controller.GetFeedbackStatistic(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var data = jsonResult.Value as FeedbackRatingReport;
        Assert.NotNull(data);
        Assert.Equal(feedbackRatingReport.Title, data.Title);
        Assert.Equal(feedbackRatingReport.Records, data.Records);
    }

    [Fact]
    public async Task GetFeedbackStatistic_WhenCalledWithOtherType_ReturnsExpectedResult()
    {
        // Arrange
        var fromDateServer = fixture.Create<DateTime>();
        var toDateServer = fixture.Create<DateTime>();
        var feedbackStatistic = new FeedbackStatisticInfo
        {
            Title = "FeedbackStatistic",
            FeedbackCategories = [new() { SubTotal = new FeedbackSubcategory { Id = 1 } }]
        };
        var param = fixture.Build<GetFeedbackStaticBaseModel>()
            .With(x => x.Type, 1)
            .Create();
        var controller = GetController();
        commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(fromDateServer);
        commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(toDateServer);
        feedbackService.GetFeedbackStatisticAsync(Arg.Any<GetFeedbackStatisticCriteria>()).Returns(feedbackStatistic);

        // Act
        var result = await controller.GetFeedbackStatistic(param);

        // Assert
        var jsonResult = Assert.IsType<JsonResult>(result);
        var data = jsonResult.Value as FeedbackStatisticInfo;
        Assert.NotNull(data);
        Assert.Equal(feedbackStatistic.Title, data.Title);
        Assert.Equal(feedbackStatistic.FeedbackCategories, data.FeedbackCategories);
    }

    #region Helpers

    private FeedbackStatisticController GetController()
    {
        feedbackService = Substitute.For<IFeedbackService>();
        commonService = Substitute.For<ICommonService>();
        settingService = Substitute.For<ISettingService>();
        excelService = Substitute.For<IExportExcelService>();
        permissionService = Substitute.For<IPermissionService>();

        return new FeedbackStatisticController(feedbackService, commonService, settingService, excelService, permissionService);
    }

    #endregion Helpers
}