using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoFixture;
using CRM.Core.Enumerables;
using CRM.Models.AdminTool.CategoryClassification;
using CRM.Models.NotificationCenter;
using CRM.Resources;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using NSubstitute.Core;
using OfficeOpenXml.Style;
using Xunit;

namespace CRM.Services.UnitTests.ExportExcel
{
    public class MncAffectedTicketExcelTests
    {
        private IEnumerable<AdmSiteTicket> siteTickets;
        private readonly List<string> sheetNames = new List<string> { ViewResources.Credit, ViewResources.Licensee };
        private readonly IFixture fixture = new Fixture();
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();
        private readonly string eventTime = "05-Aug-2024";
        private readonly string eventName = "MncAffectedTicket";

        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte TotalCols = 5;
        private int rowIndex = RowStartBody;

        private const int WidthSmall = 15;
        private const int WidthNormal = 30;
        private const int RowHeight = 60;
        private const int WidthLarge = 80;

        [Fact]
        public void GetData_WhenCalled_ReturnExpectedCredit()
        {
            //Arrange
            var service = CreateExcel();
            var expectedSiteTicket = siteTickets.Where(item => item.SiteType == ViewResources.Credit);

            // Act
            var actual = service.Public_GetData(siteTickets, true);

            // Assert
            Assert.Equal(expectedSiteTicket, actual);
        }

        [Fact]
        public void GetData_WhenCalled_ReturnExpectedLicensee()
        {
            //Arrange
            var service = CreateExcel();
            var expectedSiteTicket = siteTickets.Where(item => item.SiteType == ViewResources.Licensee);

            // Act
            var actual = service.Public_GetData(siteTickets, false);

            // Assert
            Assert.Equal(expectedSiteTicket, actual);
        }

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
            Assert.Equal(" Event Time: 05-Aug-2024\n\n Event Name: MncAffectedTicket", worksheet.Cells[1, 1].Value);
            Assert.Equal(30, worksheet.Row(1).Height);
        }

        [Fact]
        public void RenderHeader_WhenCalled_ExpectedCopyRow()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Action
            service.Public_RenderHeader(templateWorksheet, worksheet);

            // Assert
            Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols],
                worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, TotalCols]);
        }

        [Fact]
        public void RenderBody_WhenCalled_ExpectedCopyRow()
        {
            // Arrange
            var service = CreateExcel();
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var expectedSiteTicket = siteTickets.First(item => item.SiteType == ViewResources.Credit);

            // Action
            service.Public_RenderBody(templateWorksheet, true);

            // Assert
            service.Received(1).Public_RenderRow(templateWorksheet, expectedSiteTicket, 5, true);
        }

        [Fact]
        public void RenderRow_RenderExpectedCell_WhenIsCredit()
        {
            // Arrange
            var service = CreateExcel();
            var expectedSiteTicket = siteTickets.First(item => item.SiteType == ViewResources.Credit);
            var worksheet = excelPackage.Worksheets.Add("data");

            // Act
            service.Public_RenderRow(worksheet, expectedSiteTicket, 5, true);

            // Assert
            Assert.Equal(rowIndex - RowStartHeader, worksheet.Cells[RowStartBody, 1].Value);
            Assert.Equal(expectedSiteTicket.SiteName, worksheet.Cells[RowStartBody, 2].Value);
            Assert.Equal(expectedSiteTicket.TransID, worksheet.Cells[RowStartBody, 3].Value);
            Assert.Equal(expectedSiteTicket.Username, worksheet.Cells[RowStartBody, 4].Value);
            Assert.Equal(expectedSiteTicket.ExtInfo, worksheet.Cells[RowStartBody, 5].Value);
        }

        [Fact]
        public void RenderRow_RenderExpectedCell_WhenIsLicensee()
        {
            // Arrange
            var service = CreateExcel();
            var expectedSiteTicket = siteTickets.First(item => item.SiteType == ViewResources.Licensee);
            var worksheet = excelPackage.Worksheets.Add("data");

            // Act
            service.Public_RenderRow(worksheet, expectedSiteTicket, 5, false);

            // Assert
            Assert.Equal(rowIndex - RowStartHeader, worksheet.Cells[RowStartBody, 1].Value);
            Assert.Equal(expectedSiteTicket.SiteName, worksheet.Cells[RowStartBody, 2].Value);
            Assert.Equal(expectedSiteTicket.TransID, worksheet.Cells[RowStartBody, 3].Value);
            Assert.Equal(expectedSiteTicket.ExtInfo, worksheet.Cells[RowStartBody, 4].Value);
            Assert.Equal(expectedSiteTicket.Username, worksheet.Cells[RowStartBody, 5].Value);
        }

        //[Fact]
        //public void ProcessUI_WhenCalled_CallExpectedMethod()
        //{
        //    //Arrange
        //    var service = CreateExcel();
        //    var worksheet = excelPackage.Worksheets.Add("data");

        //    // Act
        //    service.Public_ProcessUI(worksheet, true);

        //    // Assert
        //    service.Received(1).Public_SetStyle(worksheet);
        //    service.Received(1).Public_SetWidthColumn(worksheet, true);
        //}

        [Fact]
        public void SetStyle_WhenCalled_ExpectedStyle()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_SetStyle(worksheet);

            // Assert
            service.Received(1).Public_StyleDefault(worksheet);
            Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Column(1).Style.HorizontalAlignment);
            Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Column(3).Style.HorizontalAlignment);
            Assert.Equal(ExcelHorizontalAlignment.Left, worksheet.Cells[1, 1, RowStartHeader - 1, TotalCols].Style.HorizontalAlignment);
        }

        [Fact]
        public void SetWidthColumn_WhenCalled_ExpectedColumnWidth()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_SetWidthColumn(worksheet, true);

            // Assert
            Assert.Equal(WidthSmall, worksheet.Column(1).Width);
            Assert.Equal(WidthNormal, worksheet.Column(2).Width);
            Assert.Equal(WidthNormal, worksheet.Column(3).Width);
            Assert.Equal(WidthNormal, worksheet.Column(4).Width);
            Assert.Equal(WidthNormal, worksheet.Column(5).Width);
        }

        [Fact]
        public void DrawBorderCell_WhenCalled_ExpectedSetBorderCorrectly()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var cell = worksheet.Cells[1, 2, 3, 4];
            var service = CreateExcel();

            // Act
            service.Public_DrawBorderCell(cell);

            // Assert
            Assert.Equal(ExcelBorderStyle.Thin, cell.Style.Border.Top.Style);
            Assert.Equal(ExcelBorderStyle.Thin, cell.Style.Border.Left.Style);
            Assert.Equal(ExcelBorderStyle.Thin, cell.Style.Border.Bottom.Style);
            Assert.Equal(ExcelBorderStyle.Thin, cell.Style.Border.Right.Style);
        }

        [Fact]
        public void StyleDefault_WhenCalled_ExpectedSetStyleCorrectly()
        {
            // Arrange
            const int FontSize = 8;
            const string FontName = "Tahoma";
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_StyleDefault(worksheet);

            // Assert
            Assert.Equal(FontName, worksheet.Cells.Style.Font.Name);
            Assert.Equal(FontSize, worksheet.Cells.Style.Font.Size);
            Assert.Equal(ExcelVerticalAlignment.Center, worksheet.Cells.Style.VerticalAlignment);
            Assert.True(worksheet.Cells.Style.WrapText);
        }

        #region Helpers

        private MncAffectedTicketExcelTestable CreateExcel()
        {
            siteTickets = new List<AdmSiteTicket>
            {
                new() { SiteType = ViewResources.Credit, SiteName= "Credit", TransID = "123", Username= "Credit", ExtInfo= "ExtInfo" },
                new() { SiteType = ViewResources.Licensee, SiteName= "Licensee", TransID = "456", Username= "Licensee", ExtInfo= "ExtInfo" }
            };
            return Substitute.For<MncAffectedTicketExcelTestable>(string.Empty, siteTickets, eventTime, eventName);
        }
        #endregion Helpers
    }
}
