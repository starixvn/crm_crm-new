using System;
using CRM.Criteria.ManageSMAFeedback;
using Xunit;

namespace CRM.Criteria.Tests.ManageSMAFeedback
{
    public class GetSmaFeedbackCriteriaTests
    {
        [Fact]
        public void GetSettingKey_ShouldReturnEmptyString()
        {
            // Arrange
            var criteria = new GetSmaFeedbackCriteria();

            // Act
            var result = criteria.GetSettingKey();

            // Assert
            Assert.Equal("Acc_CRM_ManageSMAFeedback", result);
        }

        [Fact]
        public void IsValid_ShouldReturnTrue()
        {
            // Arrange
            var criteria = new GetSmaFeedbackCriteria();

            // Act
            var result = criteria.IsValid();

            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Properties_ShouldSetAndGetValues()
        {
            // Arrange
            var criteria = new GetSmaFeedbackCriteria();
            var fromDate = DateTime.Now.AddDays(-1);
            var toDate = DateTime.Now;
            var listReviewStatusIDs = "1,2";
            var username = "testuser";
            var pageSize = 10;
            var pageIndex = 1;
            var totalRows = 100;
            var rating = "5,4,3,2,1";
            var allFeedback = true;

            // Act
            criteria.FromDate = fromDate;
            criteria.ToDate = toDate;
            criteria.ListReviewStatusIDs = listReviewStatusIDs;
            criteria.Username = username;
            criteria.ItemsPerPage = pageSize;
            criteria.PageIndex = pageIndex;
            criteria.TotalRows = totalRows;
            criteria.ListRate = rating;
            criteria.IsGetAllFBs = allFeedback;

            // Assert
            Assert.Equal(fromDate, criteria.FromDate);
            Assert.Equal(toDate, criteria.ToDate);
            Assert.Equal(listReviewStatusIDs, criteria.ListReviewStatusIDs);
            Assert.Equal(username, criteria.Username);
            Assert.Equal(pageSize, criteria.ItemsPerPage);
            Assert.Equal(pageIndex, criteria.PageIndex);
            Assert.Equal(totalRows, criteria.TotalRows);
            Assert.Equal(rating, criteria.ListRate);
            Assert.Equal(allFeedback, criteria.IsGetAllFBs);
        }
    }
}
