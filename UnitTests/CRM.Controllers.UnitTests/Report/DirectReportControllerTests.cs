using AutoFixture;
using CRM.Controllers.Report;
using CRM.Core.Constants;
using CRM.Criteria.Report.DirectCustomerReport;
using CRM.Models.Report.DirectCustomerReport;
using CRM.Services;
using CRM.Services.Report;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using System.Threading.Tasks;
using Xunit;

namespace CRM.Controllers.UnitTests.Report
{
    public class DirectReportControllerTests
    {
        private IDirectReportService _directCustomerReportService;
        private IExportExcelService _exportExcelService;

        [Fact]
        public void Index_WhenCalled_ReturnExpectedViewResult()
        {
            // Arrange
            var controller = GetController();

            // Act
            var result = controller.Index();

            // Assert
            var viewResult = Assert.IsType<ViewResult>(result);
            Assert.Null(viewResult.Model);
            Assert.Equal("../Report/Direct/Index", viewResult.ViewName);
        }

        [Fact]
        public async Task ExportDirectReport_WhenCalled_ReturnExpectedResult()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<DirectCustomerReportCriteria>();
            criteria.ExcludeIgnoredAcc = true;
            criteria.Username = null;
            criteria.Headline = null;
            criteria.PageIndex = 0;
            criteria.PageSize = 0;
            var fileName = "Direct_Customer_Report.xlsx";
            var expected = fixture.Create<byte[]>();
            var controller = GetController();
            var templates = await _directCustomerReportService.GetReport(criteria);
            _exportExcelService.ExportDirectCustomerReport(templates).Returns(expected);

            // Act
            var result = await controller.ExportDirectReport(criteria);

            // Assert
            var excelResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(MimeType.XLSX, excelResult.ContentType);
            Assert.Equal(fileName, excelResult.FileDownloadName);
        }

        [Fact]
        public async Task GetDirectReport_WhenCalled_ReturnExpectedData()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Create<DirectCustomerReportCriteria>();
            criteria.ExcludeIgnoredAcc = true;
            criteria.Username = null;
            criteria.Headline = null;
            criteria.PageIndex = 0;
            criteria.PageSize = 0;
            var controller = GetController();
            var templates = await _directCustomerReportService.GetReport(criteria);

            // Act
            var result = await controller.GetDirectReport(criteria);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            var summaryReportInfoTemplates = (DirectCustomerReportInfo)jsonResult.Value;
            Assert.Equal(templates, summaryReportInfoTemplates);
        }

        #region Helpers
        private DirectReportController GetController()
        {
            _directCustomerReportService = Substitute.For<IDirectReportService>();
            _exportExcelService = Substitute.For<IExportExcelService>();

            return new DirectReportController(_directCustomerReportService, _exportExcelService);
        }
        #endregion Helpers
    }
}
