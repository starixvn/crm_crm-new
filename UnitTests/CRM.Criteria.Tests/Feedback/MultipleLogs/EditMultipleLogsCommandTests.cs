namespace CRM.Criteria.Tests.Feedback.MultipleLogs
{
    using System.Collections.Generic;
    using CRM.Criteria.Feedback.MultipleLogs;
    using CRM.Models.Feedback;
    using Xunit;

    public class EditMultipleLogsCommandTests
    {
        [Fact]
        public void GetSettingKey_WhenCalled_ReturnExpectedSettingKey()
        {
            // Arrange
            var criteria = new EditMultipleLogsCommand();
            var expected = "Acc_CRM_GuestFeedbackUpd_Multiple";

            // Act
            var actual = criteria.GetSettingKey();

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void IsValid_ParamsAreValid_ReturnTrue()
        {
            // Arrange
            var criteria = new EditMultipleLogsCommand
            {
                ListFeedbackId = "1",
                UserId = 1,
                CountryId = 1,
                IsUpdateCountryId = true,
                SiteId = 1,
                IsUpdateSiteId = true,
                Subject = "Subject",
                IsUpdateSubject = true,
                LanguageId = 1,
                IsUpdateLanguageID = true,
                UpdateReviewedMode = 1,
                IsUpdateFeedbackDate = true,
                IsUpdateResolutionDate = true,
                CommunicationId = "1",
                IsUpdateCommunicationId = true,
                StationId = "1",
                IsUpdateStationId = true,
                RoleId = 1,
                IsUpdateRoleId = true,
                ResponseId = 1,
                IsUpdateResponseId = true,
                StatusId = 1,
                IsUpdateStatusId = true,
                Description = "Description",
                IsUpdateDescription = true,
                Solution = "Solution",
                IsUpdateSolution = true,
                LicenseeType = 1,
                IsUpdateLicenseeType = true,
                IsReviewed = true,
                IsUpdateReview = true,
                AutoField = "AutoField",
                IsUpdateAutoField = true,
                Products = new List<ProductSubProductBettypeSetting>{ new() { ProductId = 1, BettypeId = 1 } },
                IsUpdateProduct = true,
                Categories = new List<CategorySubCategorySetting> { new() { MainCategoryId = 1, SubCategoryId = 1 } },
                IsUpdateCategory = true,
                ReviewerId = 1,
                IsUpdateNoInquiries = true,
                NoInquiries = 1,
                IP = "1"
            };
            // Act
            var actual = criteria.IsValid();

            // Assert
            Assert.True(actual);
        }
    }
}
