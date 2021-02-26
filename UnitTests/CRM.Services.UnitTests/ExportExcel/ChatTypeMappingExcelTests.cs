namespace CRM.Services.UnitTests.ExportExcel
{
    using AutoFixture;
    using CRM.Models.ChatTypeMapping;
    using CRM.Services.UnitTests.ExportExcel.TestableClasses;
    using NSubstitute;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Text;
    using Xunit;

    public class ChatTypeMappingExcelTests
    {
        private readonly FakeExcelPackage excelPackage = new FakeExcelPackage();
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte TotalColumns = 12;
        private const byte WidthExtraSmall = 7;
        private const byte WidthSmall = 10;
        private const byte WidthNormal = 15;
        private const byte WidthLarge = 25;
        private const byte ColIndexMergeDefault = 7;
        private const byte mappingGroup = 1;
        private IEnumerable<ChatTypeMappingModel> chatTypeMappings;

        private int rowIndex = RowStartBody;
        private readonly IFixture fixture = new Fixture();
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
            Assert.Equal(template.Cells[1, 1, RowStartHeader - 1, TotalColumns],
                worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
        }

        [Fact]
        public void Public_RenderHeader_WhenCalled_CopysHeaderFromTemplate()
        {
            // Arrange
            var templateWorksheet = excelPackage.Worksheets.Add("template");
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Action
            excel.Public_RenderHeader(templateWorksheet, worksheet);

            // Assert
            Assert.Equal(templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns], worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]);
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
            service.Received(1).Protected("RenderRow", Arg.Any<ChatTypeMappingModel>(), Arg.Any<int>(), worksheet);
        }

        [Fact]
        public void RenderRow_WhenCalledWithIndexIsOddNumber_ExpectedCellValue()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();
            var chatTypeMapping = chatTypeMappings.FirstOrDefault();


            // Act
            service.Public_RenderRow(chatTypeMapping, 1, worksheet);

            // Assert
            Assert.Equal(1, worksheet.Cells[RowStartBody, 1].Value);
            Assert.Equal(ExcelHorizontalAlignment.Center, worksheet.Cells[RowStartBody, 1].Style.HorizontalAlignment);
            service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
        }

        [Fact]
        public void ProcessUI_WhenCalled_CallExpectedMethod()
        {
            //Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var service = CreateExcel();

            // Act
            service.Public_ProcessUI(worksheet);

            // Assert
            service.Received().Protected("SetStyle", worksheet);
            service.Received().Protected("SetWidthColumn", worksheet);
            service.Received().Protected("DrawBorderCell", Arg.Any<ExcelRange>());
        }

        [Fact]
        public void Public_StyleMergeCell_WhenCalled_StylesCorrectly()
        {
            // Arrange
            const int startRow = 1;
            const int endRow = 1;
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();

            // Action
            excel.Public_StyleMergeCell(worksheet, startRow, TotalColumns, endRow);

            // Assert
            Assert.True(worksheet.Cells[startRow, TotalColumns, endRow, TotalColumns].Merge);
            excel.Received(1).Protected("DrawBorderCell", Arg.Any<ExcelRange>());
        }

        [Fact]
        public void SetStyle_WhenCalled_ExpectedStyle()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            var white = Color.White;
            var expectedColor = $"FF{white.R:X2}{white.G:X2}{white.B:X2}";

            // Act
            excel.Public_SetStyle(worksheet);

            // Assert
            excel.Received().Protected("StyleDefault", worksheet);
            excel.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
            Assert.True(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.Font.Bold);
            Assert.Equal(expectedColor,
                worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.Font.Color.Rgb);
            Assert.Equal(ExcelHorizontalAlignment.Center,
                worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.HorizontalAlignment);
        }

        [Fact]
        public void SetWidthColumn_WhenCalled_ExpectedColumnWidth()
        {
            // Arrange
            var worksheet = excelPackage.Worksheets.Add("data");
            var excel = CreateExcel();
            const byte colBotName = 2;
            const byte colLetstalkName = 4;
            const byte colGroupHeadline = 6;
            const byte colRecipient = 7;

            // Act
            excel.Public_SetWidthColumn(worksheet);

            // Assert
            Assert.Equal(WidthNormal, worksheet.DefaultColWidth);
            Assert.Equal(WidthExtraSmall, worksheet.Column(1).Width);
            Assert.Equal(WidthSmall, worksheet.Column(colBotName).Width);
            Assert.Equal(WidthLarge, worksheet.Column(colGroupHeadline).Width);
            Assert.Equal(WidthLarge, worksheet.Column(colLetstalkName).Width);
            Assert.Equal(WidthLarge, worksheet.Column(colRecipient).Width);
            Assert.Equal(WidthExtraSmall, worksheet.Column(TotalColumns - 1).Width);
            Assert.Equal(WidthLarge, worksheet.Column(TotalColumns).Width);
        }

        #region Helpers

        private ChatTypeMappingExcelTestable CreateExcel()
        {
            chatTypeMappings = new List<ChatTypeMappingModel>
            {
                new ChatTypeMappingModel
                {
                    BotId = 1,
                    BotName= "OW_Local",
                    ChatTypeId= 2,
                    ConversationGroupId= 1,
                    ConversationGroupName= "jennyphan",
                    ConversationId= "t01",
                    MappingStatusId = 1,
                    Headlines = new List<ConversationHeadlineModel>
                    {
                        new ConversationHeadlineModel
                        {
                            ConversationGroupId = 1,
                            HeadlineId = 1,
                            HeadlineName = "test"
                        }
                    },
                    Recipients =new List<ConversationRecipient>
                    {
                        new ConversationRecipient
                        {
                            ConversationGroupId = 1,
                            LetstalkId = "t01",
                            RecipientId = 1,
                            RecipientName = "test",
                            RecipientTypeName = "PIC",
                            RoleName = "partner"
                        }
                    }

                 }
            };
            var excel = Substitute.For<ChatTypeMappingExcelTestable>(string.Empty, chatTypeMappings);
            return excel;
        }

        #endregion Helpers

    }
}
