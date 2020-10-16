namespace CRM.Services.UnitTests.ExportExcel
{
    using System.Collections.Generic;
    using System.Drawing;
    using System.IO;
    using System.Linq;
    using CRM.Models;
    using CRM.Models.PicAndHeadline;
    using CRM.Models.Setting;
    using CRM.Resources;
    using Microsoft.AspNetCore.Hosting;
    using NSubstitute;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    using Xunit;

    public class PicManagementExcelTests
    {
        private IHostingEnvironment hostingEnvironment;
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();
        private const byte RowStartHeader = 4;
        private const byte BaseColumnIndex = 9;
        private const byte StartComToolsIndex = 7;

        [Fact]
        public void RenderHeader_WhenCalled_ExpectedCellValue()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            var tools = CreateCommunicationTools();
            excel.CommunicationTools = tools;
            int totalColumn = BaseColumnIndex + tools.Count - 1;

            // Act
            excel.Public_RenderHeader(worksheet);

            // Assert
            Assert.Equal(Labels.CommunicationTool, worksheet.Cells[RowStartHeader, StartComToolsIndex].Value);
            Assert.True(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader, StartComToolsIndex + tools.Count - 1].Merge);
            Assert.Equal(tools[0].Name, worksheet.Cells[RowStartHeader + 1, StartComToolsIndex].Value);
            Assert.Equal(tools[1].Name, worksheet.Cells[RowStartHeader + 1, StartComToolsIndex + 1].Value);
            Assert.Equal(Labels.Remark, worksheet.Cells[RowStartHeader, totalColumn - 1].Value);
            Assert.True(worksheet.Cells[RowStartHeader, totalColumn - 1, RowStartHeader + 1, totalColumn - 1].Merge);
            Assert.Equal(Labels.Active, worksheet.Cells[RowStartHeader, totalColumn].Value);
            Assert.True(worksheet.Cells[RowStartHeader, totalColumn, RowStartHeader + 1, totalColumn].Merge);
        }

        [Fact]
        public void RenderRow_WhenCalledWithIndexIsOddNumber_ExpectedCellValue()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            var pic = CreatePicInfo();
            var tools = CreateCommunicationTools();
            excel.CommunicationTools = tools;

            // Act
            excel.Public_RenderRow(worksheet, pic, 1, 1);

            // Assert
            Assert.Equal(1, worksheet.Cells[1, 1].Value);
            Assert.Equal(pic.Username, worksheet.Cells[1, 2].Value);
            Assert.Equal(pic.RoleName, worksheet.Cells[1, 3].Value);
            Assert.Equal(string.Join(", ", pic.Languages.Select(lang => lang.SettingValue)), worksheet.Cells[1, 4].Value);
            Assert.Equal(pic.CountryName, worksheet.Cells[1, 5].Value);
            Assert.Equal(pic.GroupHeadline, worksheet.Cells[1, 6].Value);
            Assert.Equal(pic.CommunicationTools[0].Value, worksheet.Cells[1, 7].Value);
            Assert.Equal(string.Empty, worksheet.Cells[1, 8].Value);
            Assert.Equal(pic.Remark, worksheet.Cells[1, 9].Value);
            Assert.Equal(Labels.Yes, worksheet.Cells[1, 10].Value);
            Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 1].Style.HorizontalAlignment);
            Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 10].Style.HorizontalAlignment);
            excel.DidNotReceive().Protected("SetBackgroudColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
        }

        [Fact]
        public void RenderRow_WhenCalledWithIndexIsEvenNumber_ExpectedCellValue()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            var pic = CreatePicInfo();
            var tools = CreateCommunicationTools();
            excel.CommunicationTools = tools;

            // Act
            excel.Public_RenderRow(worksheet, pic, 2, 1);

            // Assert
            Assert.Equal(2, worksheet.Cells[1, 1].Value);
            Assert.Equal(pic.Username, worksheet.Cells[1, 2].Value);
            Assert.Equal(pic.RoleName, worksheet.Cells[1, 3].Value);
            Assert.Equal(string.Join(", ", pic.Languages.Select(lang => lang.SettingValue)), worksheet.Cells[1, 4].Value);
            Assert.Equal(pic.CountryName, worksheet.Cells[1, 5].Value);
            Assert.Equal(pic.GroupHeadline, worksheet.Cells[1, 6].Value);
            Assert.Equal(pic.CommunicationTools[0].Value, worksheet.Cells[1, 7].Value);
            Assert.Equal(string.Empty, worksheet.Cells[1, 8].Value);
            Assert.Equal(pic.Remark, worksheet.Cells[1, 9].Value);
            Assert.Equal(Labels.Yes, worksheet.Cells[1, 10].Value);
            Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 1].Style.HorizontalAlignment);
            Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[1, 10].Style.HorizontalAlignment);
            excel.Received().Protected("SetBackgroudColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
        }

        [Fact]
        public void SetStyle_WhenCalled_ExpectedStyle()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            int totalColumn = BaseColumnIndex;
            var white = Color.White;
            var expectedColor = $"FF{white.R:X2}{white.G:X2}{white.B:X2}";

            // Act
            excel.Public_SetStyle(worksheet);

            // Assert
            excel.Received().Protected("StyleDefault", worksheet);
            Assert.True(worksheet.Cells[1, 1, 2, totalColumn].Merge);
            Assert.True(worksheet.Cells[3, 1, 3, totalColumn].Merge);
            excel.Received().Protected("SetBackgroudColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
            Assert.True(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.Font.Bold);
            Assert.Equal(expectedColor, 
                worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.Font.Color.Rgb);
            Assert.Equal(ExcelHorizontalAlignment.Center, 
                worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.HorizontalAlignment);
        }

        [Fact]
        public void SetWidthColumn_WhenCalled_ExpectedColumnWidth()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            int totalColumn = BaseColumnIndex;
            byte WidthExtraSmall = 7;
            byte WidthSmall = 10;
            byte WidthNormal = 15;
            byte WidthLarge = 22;

            // Act
            excel.Public_SetWidthColumn(worksheet);

            // Assert
            Assert.Equal(WidthNormal, worksheet.DefaultColWidth);
            Assert.Equal(WidthExtraSmall, worksheet.Column(1).Width);
            Assert.Equal(WidthSmall, worksheet.Column(3).Width);
            Assert.Equal(WidthLarge, worksheet.Column(6).Width);
            Assert.Equal(WidthLarge, worksheet.Column(totalColumn - 1).Width);
            Assert.Equal(WidthExtraSmall, worksheet.Column(totalColumn).Width);
        }


        #region Helpers

        private PicManagementExcelTestable CreateExcel()
        {
            hostingEnvironment = Substitute.For<IHostingEnvironment>();
            var excel = Substitute.For<PicManagementExcelTestable>(hostingEnvironment);
            return excel;
        }

        private List<BaseModel> CreateCommunicationTools()
        {
            return new List<BaseModel>
            {
                new BaseModel{Id=1, Name="A"},
                new BaseModel{Id=2, Name="B"}
            };
        }

        private PicInfo CreatePicInfo()
        {
            var pic = new PicInfo
            {
                Username = "PIC",
                RoleName = "Role",
                CountryName = "Vn",
                GroupHeadline = "Group",
                Remark = "",
                IsActive = true
            };
            pic.Language = "<ROOT><Setting Id=\"1\" Value=\"VN\" /><Setting Id=\"2\" Value=\"EN\" /></ROOT>";
            pic.CommunicationTools = new List<CommunicationTool>
            {
                new CommunicationTool{SettingId=1, Value="tool" }
            };
            return pic;
        }

        #endregion Helpers
    }
}
