namespace CRM.Services.UnitTests.ExportExcel
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using AutoFixture;
    using CRM.Core;
    using CRM.Models.Feedback;
    using CRM.Models.Setting;
    using CRM.Services.UnitTests.ExportExcel.TestableClasses;
    using NSubstitute;
    using OfficeOpenXml;
    using Xunit;

    public class LatestFeedbackExcelTests
    {
        private readonly IFixture fixture = new Fixture();
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();
        private IEnumerable<FeedbackDetail> feedbacks;
        private IEnumerable<Setting> mainCategories;

        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 6;
        private const byte TotalCols = 5;

        [Fact]
        public void RenderTitle_WhenCalled_ExpectedCopyRow()
        {
            //Arrange
            var template = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_RenderTitle(template, worksheet);

            // Assert
            Assert.Equal(template.Cells[2, 1, RowStartHeader - 1, TotalCols],
                worksheet.Cells[2, 1, RowStartHeader - 1, TotalCols]);
            Assert.Equal("Top_10_Feedback", worksheet.Cells[1, 1].Value);
        }

        [Fact]
        public void RenderHeader_WhenCalled_ExpectedCopyRow()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Action
            excel.Public_RenderHeader(templateWorksheet, worksheet);

            // Assert
            Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols],
                worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
        }

        [Fact]
        public void RenderBody_WhenCalled_CallExpectedMethod()
        {
            //Arrange
            var template = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_RenderBody(template, worksheet);

            // Assert
            service.Received().Protected("RenderRow", worksheet, Arg.Any<FeedbackDetail>(), Arg.Any<int>(), Arg.Any<int>());
        }

        [Fact]
        public void RenderRow_OddRow_RenderExpectedCell()
        {
            // Arrange
            var feedback = FakeFeedbackDetail();
            var feedbackCellValue = string.Format(
                "{0}\n{1}\n{2}\n{3}\n{4}",
                feedback.Subject,
                "Feedback date " + feedback.FeedbackDate.ToShortDateTimeFormat(),
                "By " + feedback.CreatorName + " on " + feedback.CreateDate.ToShortDateTimeFormat(),
                "Solving Duration: " + feedback.DurationTime,
                string.Format("Reviewed by {0} on {1}", feedback.ReviewerName, feedback.SolveDate.ToShortDateTimeFormat()));
            var categoryCellValue = "Special Notification\n  Abnormal Bets";

            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_RenderRow(worksheet, feedback, 1, 1);

            // Assert
            Assert.Equal(feedback.FeedbackId, worksheet.Cells[1, 1].Value);
            Assert.Equal(feedbackCellValue, worksheet.Cells[1, 2].Value);
            Assert.Equal(categoryCellValue, worksheet.Cells[1, 3].Value);
            Assert.Equal(feedback.Status, worksheet.Cells[1, 4].Value);
            Assert.Equal(feedback.RelatedCustomer.Replace(",", ", "), worksheet.Cells[1, 5].Value);
            service.DidNotReceive().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
        }

        [Fact]
        public void RenderRow_EvenRow_RenderExpectedCell()
        {
            // Arrange
            var feedback = FakeFeedbackDetail();
            var feedbackCellValue = string.Format(
                "{0}\n{1}\n{2}\n{3}\n{4}",
                feedback.Subject,
                "Feedback date " + feedback.FeedbackDate.ToShortDateTimeFormat(),
                "By " + feedback.CreatorName + " on " + feedback.CreateDate.ToShortDateTimeFormat(),
                "Solving Duration: " + feedback.DurationTime,
                string.Format("Reviewed by {0} on {1}", feedback.ReviewerName, feedback.SolveDate.ToShortDateTimeFormat()));
            var categoryCellValue = "Special Notification\n  Abnormal Bets";

            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_RenderRow(worksheet, feedback, 2, 1);

            // Assert
            Assert.Equal(feedback.FeedbackId, worksheet.Cells[1, 1].Value);
            Assert.Equal(feedbackCellValue, worksheet.Cells[1, 2].Value);
            Assert.Equal(categoryCellValue, worksheet.Cells[1, 3].Value);
            Assert.Equal(feedback.Status, worksheet.Cells[1, 4].Value);
            Assert.Equal(feedback.RelatedCustomer.Replace(",", ", "), worksheet.Cells[1, 5].Value);
            service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Color.FromArgb(228, 242, 253));
        }

        #region Helpers

        private LatestFeedbackExcelTestable CreateExcel()
        {
            feedbacks = new List<FeedbackDetail>
            {
                new FeedbackDetail()
            };
            mainCategories = new List<Setting>
            {
                new Setting
                {
                    SettingId = 1, SettingValue = "Special Notification",
                    ChildSettings = new List<Setting> { new Setting { SubCategoryId = 1, Name = "Abnormal Bets" } }
                }
            };
            return Substitute.For<LatestFeedbackExcelTestable>(string.Empty, feedbacks, mainCategories, 10);
        }

        private FeedbackDetail FakeFeedbackDetail()
        {
            return new FeedbackDetail
            {
                FeedbackId = 1,
                FeedbackDate = fixture.Create<DateTime>(),
                ResolutionDate = fixture.Create<DateTime>(),
                CreateDate = fixture.Create<DateTime>(),
                SolveDate = fixture.Create<DateTime>(),
                Subject = "Special Notification",
                Status = "Closed",
                RelatedCustomer = "test1,test2",
                CreatorName = "sa",
                ReviewerName = "sa",
                Settings = new List<FeedbackSettingRelation>
                {
                    new FeedbackSettingRelation { SettingId = 1, SubSettingId = 1, SettingType = "Category" }
                }
            };
        }

        #endregion Helpers
    }
}