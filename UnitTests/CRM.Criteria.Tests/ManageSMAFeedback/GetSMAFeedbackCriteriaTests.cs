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
            Assert.Equal("", result);
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
            var reviewStatus = "Approved";
            var username = "testuser";
            var pageSize = 10;
            var pageIndex = 1;
            var totalRows = 100;

            // Act
            criteria.FromDate = fromDate;
            criteria.ToDate = toDate;
            criteria.ReviewStatus = reviewStatus;
            criteria.Username = username;
            criteria.ItemsPerPage = pageSize;
            criteria.PageIndex = pageIndex;
            criteria.TotalRows = totalRows;

            // Assert
            Assert.Equal(fromDate, criteria.FromDate);
            Assert.Equal(toDate, criteria.ToDate);
            Assert.Equal(reviewStatus, criteria.ReviewStatus);
            Assert.Equal(username, criteria.Username);
            Assert.Equal(pageSize, criteria.ItemsPerPage);
            Assert.Equal(pageIndex, criteria.PageIndex);
            Assert.Equal(totalRows, criteria.TotalRows);
        }
    }
}
