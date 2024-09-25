namespace CRM.Controllers.UnitTests.Report.Statistics
{
    using AutoFixture;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Report.FeedbackStatistic;
    using CRM.Models.Feedback;
    using CRM.Models.Report.FeedbackStatistic;
    using CRM.Models.Setting;
    using CRM.Resources;
    using CRM.Services;
    using CRM.Services.Feedback;
    using CRM.Services.Report;
    using Microsoft.AspNetCore.Mvc;
    using NSubstitute;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Xunit;

    public class FeedbackStatisticControllerTests
    {
        private readonly IFixture fixture = new Fixture();
        private IFeedbackRepository feedbackRepository;
        private IFeedbackService feedbackService;
        private ICommonService commonService;
        private ISettingService settingService;
        private IExportExcelService excelService;
        private IPermissionService permissionService;

        [Fact]
        public async Task GetFeedbackStatistic_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var fromDateServer = fixture.Create<DateTime>();
            var toDateServer = fixture.Create<DateTime>();
            var feedbackStatistic = new FeedbackStatisticInfo
            {
                Title = "FeedbackStatistic",
                FeedbackCategories = new List<FeedbackCategory>
                {
                    new FeedbackCategory {SubTotal = new FeedbackSubcategory{ Id = 1} }
                },
                TotalItems = 1
            };
            var param = fixture.Create<GetFeedbackStatisticCriteria>();
            var controller = GetController();
            commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(fromDateServer);
            commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(toDateServer);
            feedbackRepository.GetFeedbackStatisticAsync(param).Returns(feedbackStatistic);

            // Act
            var result = await controller.GetFeedbackStatistic(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var data = jsonResult.Value;
            Assert.Equal(feedbackStatistic, data);
        }

        [Fact]
        public async Task GetFeedbackStatisticDetails_WhenCalled_ReturnAsExpectedResult()
        {
            // Arrange
            var mainCategories = new List<Setting>
            {
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var feedbackDetail = fixture.Create<IEnumerable<DeletedFeedback>>();
            fixture.Customize<GetFeedbackStatisticDetailCriteria>(x => x.With(b => b.PageIndex, 1).With(b => b.PageSize, 100));
            var param = fixture.Create<GetFeedbackStatisticDetailCriteria>();
            var controller = GetController();
            feedbackService.GetFeedbackStatisticAsyncDetail(param).Returns(feedbackDetail);
            settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);
            var feedbacksOrder = feedbackDetail.OrderByDescending(x => x.FeedbackDate).ThenByDescending(y => y.FeedbackId);

            // Act
            var result = await controller.GetFeedbackStatisticDetails(param);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var feedbackDetailJson = (IEnumerable<DeletedFeedback>)jsonResult.Value.GetType().GetProperty("data").GetValue(jsonResult.Value);
            var mainCategoriesJson = (IEnumerable<Setting>)jsonResult.Value.GetType().GetProperty("mainCategories").GetValue(jsonResult.Value);
            Assert.Equal(feedbacksOrder, feedbackDetailJson);
            Assert.Equal(mainCategories, mainCategoriesJson);
        }

        [Fact]
        public async Task ExportExcel_WhenCalled_ReturnAsExpectedResult()
        {
            var fromDateServer = fixture.Create<DateTime>();
            var toDateServer = fixture.Create<DateTime>();
            var feedbackStatistic = new FeedbackStatisticInfo
            {
                Title = "FeedbackStatistic",
                FeedbackCategories = new List<FeedbackCategory>
                {
                    new FeedbackCategory {SubTotal = new FeedbackSubcategory{ Id = 1} }
                },
                TotalItems = 1
            };
            var param = fixture.Create<GetFeedbackStatisticCriteria>();
            var fromDateFormat = param.FromDate.ToString("MMddyyyy");
            var toDateFormat = param.ToDate.ToString("MMddyyyy");
            string fileName = string.Format(ViewResources.FeedbackStatistic_ExcelFile, fromDateFormat, toDateFormat);

            var controller = GetController();
            commonService.ConvertClientFromTimeToServerTime(Arg.Any<DateTime>()).Returns(fromDateServer);
            commonService.ConvertClientToTimeToServerTime(Arg.Any<DateTime>()).Returns(toDateServer);
            feedbackRepository.GetFeedbackStatisticAsync(param).Returns(feedbackStatistic);

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
                new Setting { MainCategoryID = 1, Name = "Special Notification" }
            };
            var feedbackDetail = fixture.Create<IEnumerable<DeletedFeedback>>();
            fixture.Customize<GetFeedbackStatisticDetailCriteria>(x => x.With(b => b.PageIndex, 0).With(b => b.PageSize, 100));
            var param = fixture.Create<GetFeedbackStatisticDetailCriteria>();
            var fromDateFormat = param.FromDate.ToString("MMddyyyy");
            var toDateFormat = param.ToDate.ToString("MMddyyyy");
            string fileName = string.Format(ViewResources.FeedbackStatisticDetail_ExcelFile, fromDateFormat, toDateFormat);
            var controller = GetController();
            feedbackService.GetFeedbackStatisticAsyncDetail(param).Returns(feedbackDetail);
            settingService.GetMainCategoryWithSubCategoryAsync().Returns(mainCategories);

            // Act
            var result = await controller.ExportExcelDetails(param);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal($"{fileName}.xlsx", excelResult.FileDownloadName);
        }

        #region Helpers

        private FeedbackStatisticController GetController()
        {
            feedbackRepository = Substitute.For<IFeedbackRepository>();
            feedbackService = Substitute.For<IFeedbackService>();
            commonService = Substitute.For<ICommonService>();
            settingService = Substitute.For<ISettingService>();
            excelService = Substitute.For<IExportExcelService>();
            permissionService = Substitute.For<IPermissionService>();

            return new FeedbackStatisticController(feedbackRepository, feedbackService, commonService, settingService, excelService, permissionService);
        }

        #endregion Helpers
    }
}