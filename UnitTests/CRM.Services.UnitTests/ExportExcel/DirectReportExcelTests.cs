namespace CRM.Services.UnitTests.ExportExcel
{
    using CRM.Models.Report.DirectCustomerReport;
    using CRM.Resources;
    using CRM.Services.UnitTests.ExportExcel.TestableClasses;
    using NSubstitute;
    using OfficeOpenXml;
    using System.Collections.Generic;
    using System.Drawing;
    using Xunit;

    public class DirectReportExcelTests
    {
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();
        private DirectCustomerReportInfo reportInfo;

        [Fact]
        public void RenderTitle_WhenCalled_ExpectedCopyRows()
        {
            // Arrange
            var template = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateService();

            // Act
            service.Public_RenderTitle(template, worksheet);

            // Assert
            Assert.Equal(template.Cells[1, 2, 3, 4], worksheet.Cells[1, 2, 3, 4]);
            Assert.Equal(ViewResources.DirectCustomerReport, worksheet.Cells[1, 1].Value);
        }

        [Fact]
        public void RenderHeader_WhenCalled_ExpectedCopyRows()
        {
            // Arrange
            var template = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateService();

            // Act
            service.Public_RenderHeader(template, worksheet);

            // Assert
            Assert.Equal(template.Cells[4, 1, 4, 4], worksheet.Cells[4, 1, 4, 4]);
        }

        [Fact]
        public void RenderBody_WhenCalled_CallExpectedMethod()
        {
            // Arrange
            var template = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateService();

            // Act
            service.Public_RenderBody(template, worksheet);

            // Assert
            service.Received().Protected("RenderRow", worksheet, reportInfo.CustomerList[0], 5);
        }

        [Fact]
        public void ProcessUI_WhenCalled_CallExpectedMethod()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateService();

            // Act
            service.Public_ProcessUI(worksheet);

            // Assert
            service.Received().Protected("SetDefaultStyle", worksheet);
            service.Received().Protected("SetBackground", Arg.Any<ExcelRange>());
        }

        [Fact]
        public void SetValueRow_WhenCalledWithChildReportsCountGreaterOne_ExpectedCellValue()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateService();
            var report = CreateReportInfo();
            var lastCol = 30;
            var rowIndex = 5;

            // Act
            service.Public_RenderRow(worksheet, reportInfo.CustomerList[0], 5);

            // Assert
            Assert.True(worksheet.Cells[rowIndex, 1, report.CustomerList.Count, 1].Merge);
            Assert.True(worksheet.Cells[rowIndex, lastCol, report.CustomerList.Count, lastCol].Merge);
            Assert.Equal(report.CustomerList[0].Headline ?? "not assign group", worksheet.Cells[rowIndex, 1].Value);
            Assert.Equal(report.CustomerList[0].Username, worksheet.Cells[rowIndex, 2].Value);
            Assert.Equal(report.CustomerList[0].Status, worksheet.Cells[rowIndex, 3].Value);
            Assert.Equal(report.CustomerList[0].Site, worksheet.Cells[rowIndex, 4].Value);
            Assert.Equal(report.CustomerList[0].Currency, worksheet.Cells[rowIndex, 5].Value);
            Assert.Equal(report.CustomerList[0].Position, worksheet.Cells[rowIndex, 6].Value);
            Assert.Equal(report.CustomerList[0].IntroducedBy, worksheet.Cells[rowIndex, 7].Value);
            Assert.Equal(report.CustomerList[0].Language_name, worksheet.Cells[rowIndex, 8].Value);
            Assert.Equal(report.CustomerList[0].CountryName, worksheet.Cells[rowIndex, 9].Value);
            Assert.Equal(report.CustomerList[0].Checker, worksheet.Cells[rowIndex, 10].Value);
            Assert.Equal("√", worksheet.Cells[rowIndex, 11].Value);
            Assert.Equal(report.CustomerList[0].FirstName, worksheet.Cells[rowIndex, 12].Value);
            Assert.Equal(report.CustomerList[0].LastName, worksheet.Cells[rowIndex, 13].Value);
            Assert.Equal(report.CustomerList[0].Phone, worksheet.Cells[rowIndex, 14].Value);
            Assert.Equal(report.CustomerList[0].Phone2, worksheet.Cells[rowIndex, 15].Value);
            Assert.Equal(report.CustomerList[0].Phone3, worksheet.Cells[rowIndex, 16].Value);
            Assert.Equal(report.CustomerList[0].PIC1, worksheet.Cells[rowIndex, 17].Value);
            Assert.Equal(report.CustomerList[0].PIC2, worksheet.Cells[rowIndex, 18].Value);
            Assert.Equal(report.CustomerList[0].PIC3, worksheet.Cells[rowIndex, 19].Value);
            Assert.Equal(report.CustomerList[0].PIC4, worksheet.Cells[rowIndex, 20].Value);
            Assert.Equal(report.CustomerList[0].MobilePhone, worksheet.Cells[rowIndex, 21].Value);
            Assert.Equal(report.CustomerList[0].Email, worksheet.Cells[rowIndex, 22].Value);
            Assert.Equal(report.CustomerList[0].Skype, worksheet.Cells[rowIndex, 23].Value);
            Assert.Equal(report.CustomerList[0].MSN, worksheet.Cells[rowIndex, 24].Value);
            Assert.Equal(report.CustomerList[0].WhatsApp, worksheet.Cells[rowIndex, 25].Value);
            Assert.Equal(report.CustomerList[0].Line, worksheet.Cells[rowIndex, 26].Value);
            Assert.Equal(report.CustomerList[0].WeChat, worksheet.Cells[rowIndex, 27].Value);
            Assert.Equal(report.CustomerList[0].Yahoo, worksheet.Cells[rowIndex, 28].Value);
            Assert.Equal(report.CustomerList[0].BBM, worksheet.Cells[rowIndex, 29].Value);
            Assert.Equal(report.CustomerList[0].QQ, worksheet.Cells[rowIndex, 30].Value);
        }

        [Fact]
        public void SetValueRow_WhenCalledWithChildReportsCountEqualOne_ExpectedCellValue()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateService();
            var report = CreateReportInfo();
            var CustomerList = report.CustomerList[0];
            var rowIndex = 5;
            report.CustomerList = new List<DirectCustomerInfo>
            {
                CustomerList
            };

            // Act
            service.Public_RenderRow(worksheet, reportInfo.CustomerList[0], 5);

            // Assert
            Assert.Equal(report.CustomerList[0].Headline ?? "not assign group", worksheet.Cells[rowIndex, 1].Value);
            Assert.Equal(report.CustomerList[0].Username, worksheet.Cells[rowIndex, 2].Value);
            Assert.Equal(report.CustomerList[0].Status, worksheet.Cells[rowIndex, 3].Value);
            Assert.Equal(report.CustomerList[0].Site, worksheet.Cells[rowIndex, 4].Value);
            Assert.Equal(report.CustomerList[0].Currency, worksheet.Cells[rowIndex, 5].Value);
            Assert.Equal(report.CustomerList[0].Position, worksheet.Cells[rowIndex, 6].Value);
            Assert.Equal(report.CustomerList[0].IntroducedBy, worksheet.Cells[rowIndex, 7].Value);
            Assert.Equal(report.CustomerList[0].Language_name, worksheet.Cells[rowIndex, 8].Value);
            Assert.Equal(report.CustomerList[0].CountryName, worksheet.Cells[rowIndex, 9].Value);
            Assert.Equal(report.CustomerList[0].Checker, worksheet.Cells[rowIndex, 10].Value);
            Assert.Equal("√", worksheet.Cells[rowIndex, 11].Value);
            Assert.Equal(report.CustomerList[0].FirstName, worksheet.Cells[rowIndex, 12].Value);
            Assert.Equal(report.CustomerList[0].LastName, worksheet.Cells[rowIndex, 13].Value);
            Assert.Equal(report.CustomerList[0].Phone, worksheet.Cells[rowIndex, 14].Value);
            Assert.Equal(report.CustomerList[0].Phone2, worksheet.Cells[rowIndex, 15].Value);
            Assert.Equal(report.CustomerList[0].Phone3, worksheet.Cells[rowIndex, 16].Value);
            Assert.Equal(report.CustomerList[0].PIC1, worksheet.Cells[rowIndex, 17].Value);
            Assert.Equal(report.CustomerList[0].PIC2, worksheet.Cells[rowIndex, 18].Value);
            Assert.Equal(report.CustomerList[0].PIC3, worksheet.Cells[rowIndex, 19].Value);
            Assert.Equal(report.CustomerList[0].PIC4, worksheet.Cells[rowIndex, 20].Value);
            Assert.Equal(report.CustomerList[0].MobilePhone, worksheet.Cells[rowIndex, 21].Value);
            Assert.Equal(report.CustomerList[0].Email, worksheet.Cells[rowIndex, 22].Value);
            Assert.Equal(report.CustomerList[0].Skype, worksheet.Cells[rowIndex, 23].Value);
            Assert.Equal(report.CustomerList[0].MSN, worksheet.Cells[rowIndex, 24].Value);
            Assert.Equal(report.CustomerList[0].WhatsApp, worksheet.Cells[rowIndex, 25].Value);
            Assert.Equal(report.CustomerList[0].Line, worksheet.Cells[rowIndex, 26].Value);
            Assert.Equal(report.CustomerList[0].WeChat, worksheet.Cells[rowIndex, 27].Value);
            Assert.Equal(report.CustomerList[0].Yahoo, worksheet.Cells[rowIndex, 28].Value);
            Assert.Equal(report.CustomerList[0].BBM, worksheet.Cells[rowIndex, 29].Value);
            Assert.Equal(report.CustomerList[0].QQ, worksheet.Cells[rowIndex, 30].Value);
        }

        [Fact]
        public void SetBackgroundTotalRow_WhenCalled_CallProtectedSetBackgroundAndExpectedBackground()
        {
            // Arrange
            var cell = excelPackage.Worksheets.Add("data").Cells[1, 1];
            var service = CreateService();
            var white = Color.White;
            var expectedColor = $"FF{white.R:X2}{white.G:X2}{white.B:X2}";

            // Act
            service.Public_SetBackground(cell);

            // Assert
            service.Received().Protected("SetBackgroundColor", cell, Arg.Any<Color>());
            Assert.Equal(expectedColor, cell.Style.Font.Color.Rgb);
            Assert.True(cell.Style.Font.Bold);
        }

        [Fact]
        public void SetDefaultStyle_WhenCalled_ExpectedStyle()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateService();

            // Act
            service.Public_SetDefaultStyle(worksheet);

            // Assert
            service.Received().Protected("StyleDefault", worksheet);
            Assert.Equal(20, worksheet.Column(1).Width);
        }

        #region Helpers
        private DirectReportExcelTestable CreateService()
        {
            reportInfo = CreateReportInfo();
            var excel = Substitute.For<DirectReportExcelTestable>(string.Empty, reportInfo);
            return excel;
        }


        private DirectCustomerReportInfo CreateReportInfo()
        {            
            var CustomerList = new List<DirectCustomerInfo>
            {
                new DirectCustomerInfo
                {
                    BBM = "---",
                    Checker= null,
                    CountryName= null,
                    Currency= "HK$",
                    Email= "---",
                    FirstName= "---",
                    Headline= null,
                    IntroducedBy= null,
                    Language_name= "English",
                    LastName= "---",
                    Line= "---",
                    MSN= "---",
                    MobilePhone= "-----",
                    PIC1= "-------",
                    PIC2= "-------",
                    PIC3= "-------",
                    PIC4= "-------",
                    Phone= "-----",
                    Phone2= "-----",
                    Phone3= "-----",
                    Position= "Member",
                    QQ= "---",
                    Site= "BEST-ODDS",
                    Skype= "---",
                    Status= "Closed",
                    Username= "0000HK",
                    IsVIP= true,
                    WeChat= "---",
                    WhatsApp= "---",
                    Yahoo= null
                }
            };

            return new DirectCustomerReportInfo
            {
                CustomerList = CustomerList,
                TotalCustomer = 1
            };
        }
        #endregion Helpers
    }
}
