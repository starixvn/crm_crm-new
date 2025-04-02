namespace CRM.Services.UnitTests.ExportExcel;

using CRM.Models.ChatTypeMapping;
using CRM.Resources;
using CRM.Services.UnitTests.ExportExcel.TestableClasses;
using NSubstitute;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Xunit;

public class ChatTypeMappingExcelTests
{
    private readonly FakeExcelPackage excelPackage = new();
    private const byte RowStartHeaderChatType = 4;
    private const byte RowStartBody = 5;
    private const byte TotalColumnsChatType = 12;
    private const byte WidthExtraSmall = 7;
    private const byte WidthSmall = 10;
    private const byte WidthNormal = 15;
    private const byte WidthLarge = 25;
    private const byte ColIndexMergeDefault = 7;
    private const byte mappingGroup = 1;
    private IEnumerable<ChatTypeMappingModel> chatTypeMappings;

    private int rowIndex = RowStartBody;

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
        Assert.Equal(template.Cells[1, 1, RowStartHeaderChatType - 1, TotalColumnsChatType],
            worksheet.Cells[1, 1, RowStartHeaderChatType - 1, TotalColumnsChatType]);
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
        Assert.Equal(templateWorksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType], worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType]);
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
        service.Received(2).Protected("RenderRow", Arg.Any<ChatTypeMappingModel>(), Arg.Any<int>(), worksheet);
        service.Received().Protected("SetBackgroundColor", Arg.Any<ExcelRange>(), Arg.Any<Color>());
    }

    [Fact]
    public void RenderRow_WhenCalledWithRecipientsCountGreaterZero_ExpectedMergeCellValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();
        var colIndex = 1;
        var rowNum = 1;
        var chatTypeMapping = chatTypeMappings.FirstOrDefault();

        // Act
        service.Public_RenderRow(chatTypeMapping, rowNum, worksheet);

        // Assert
        service.Received(12).Protected("StyleMergeCell", worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, rowNum);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChannelName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.BotName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatType);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.DisplayName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.Headlines.Any() ? string.Join(", ", chatTypeMapping.Headlines.Select(x => x.HeadlineName)) : "");
        colIndex++;
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatTypeId == mappingGroup ? "" : chatTypeMapping.LetstalkID_Username);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.Language);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatTypeId == mappingGroup ? chatTypeMapping.MappingStatus : "");
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.IsActive ? ViewResources.Yes : ViewResources.No);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex].Value, chatTypeMapping.Remark);
        for (var i = 0; i < chatTypeMapping.Recipients.Count(); i++)
        {
            Assert.Equal(worksheet.Cells[rowIndex++, ColIndexMergeDefault].Value,
                $"{chatTypeMapping.Recipients.ToList()[i].RecipientName} ({chatTypeMapping.Recipients.ToList()[i].RoleName})");
        }
    }

    [Fact]
    public void RenderRow_WhenCalledWithRecipientsCountEqualZero_ExpectedNormalCellsValue()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();
        var colIndex = 1;
        var rowNum = 1;
        chatTypeMappings.FirstOrDefault().Recipients = Array.Empty<ConversationRecipient>();
        var chatTypeMapping = chatTypeMappings.FirstOrDefault();

        // Act
        service.Public_RenderRow(chatTypeMapping, rowNum, worksheet);

        // Assert
        service.DidNotReceive().Protected("StyleMergeCell", worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, rowNum);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChannelName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.BotName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatType);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.DisplayName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.Headlines.Any() ? string.Join(", ", chatTypeMapping.Headlines.Select(x => x.HeadlineName)) : "");
        colIndex++;
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatTypeId == mappingGroup ? "" : chatTypeMapping.LetstalkID_Username);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.Language);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatTypeId == mappingGroup ? chatTypeMapping.MappingStatus : "");
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.IsActive ? ViewResources.Yes : ViewResources.No);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex].Value, chatTypeMapping.Remark);
        rowIndex++;
    }

    [Fact]
    public void RenderRow_WhenCalledWithNullValue_ExpectedReturnEmptyCell()
    {
        // Arrange
        var worksheet = excelPackage.Worksheets.Add("data");
        var service = CreateExcel();
        var colIndex = 1;
        var rowNum = 1;
        var chatTypeFirst = chatTypeMappings.FirstOrDefault();
        chatTypeFirst.Recipients = Array.Empty<ConversationRecipient>();
        chatTypeFirst.Headlines = Array.Empty<ConversationHeadlineModel>();
        chatTypeFirst.IsActive = true;
        chatTypeFirst.ChatTypeId = 1;
        var chatTypeMapping = chatTypeMappings.FirstOrDefault();

        // Act
        service.Public_RenderRow(chatTypeMapping, rowNum, worksheet);

        // Assert
        service.DidNotReceive().Protected("StyleMergeCell", worksheet, Arg.Any<int>(), Arg.Any<int>(), Arg.Any<int>());
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, rowNum);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChannelName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.BotName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatType);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.DisplayName);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.Headlines.Any() ? string.Join(", ", chatTypeMapping.Headlines.Select(x => x.HeadlineName)) : "");
        colIndex++;
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatTypeId == mappingGroup ? "" : chatTypeMapping.LetstalkID_Username);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.Language);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.ChatTypeId == mappingGroup ? chatTypeMapping.MappingStatus : "");
        Assert.Equal(worksheet.Cells[rowIndex, colIndex++].Value, chatTypeMapping.IsActive ? ViewResources.Yes : ViewResources.No);
        Assert.Equal(worksheet.Cells[rowIndex, colIndex].Value, chatTypeMapping.Remark);
        rowIndex++;
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
        excel.Public_StyleMergeCell(worksheet, startRow, TotalColumnsChatType, endRow);

        // Assert
        Assert.True(worksheet.Cells[startRow, TotalColumnsChatType, endRow, TotalColumnsChatType].Merge);
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
        Assert.True(worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType].Style.Font.Bold);
        Assert.Equal(expectedColor,
            worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType].Style.Font.Color.Rgb);
        Assert.Equal(ExcelHorizontalAlignment.Center,
            worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType].Style.HorizontalAlignment);
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
        Assert.Equal(WidthExtraSmall, worksheet.Column(TotalColumnsChatType - 1).Width);
        Assert.Equal(WidthLarge, worksheet.Column(TotalColumnsChatType).Width);
    }

    #region Helpers

    private ChatTypeMappingExcelTestable CreateExcel()
    {
        chatTypeMappings = new List<ChatTypeMappingModel>
        {
            new()
            {
                BotId = 1,
                BotName= "OW_Local",
                ChatTypeId= 2,
                ConversationGroupId= 1,
                DisplayName= "jennyphan",
                ConversationId= "id1",
                MappingStatusId = 1,
                IsActive = true,
                Headlines = new List<ConversationHeadlineModel>
                {
                    new()
                    {
                        ConversationGroupId = 1,
                        HeadlineId = 1,
                        HeadlineName = "test"
                    }
                },
                Recipients =new List<ConversationRecipient>
                {
                    new()
                    {
                        ConversationGroupId = 1,
                        LetstalkId = "t01",
                        RecipientId = 1,
                        RecipientName = "ab",
                        RecipientTypeName = "PIC",
                        RoleName = "partner"
                    },
                    new()
                    {
                        ConversationGroupId = 2,
                        LetstalkId = "t02",
                        RecipientId = 2,
                        RecipientName = "test2",
                        RecipientTypeName = "PIC2",
                        RoleName = "partner"
                    }
                }
            },
            new()
            {
                BotId = 1,
                BotName= "OW_Local",
                ChatTypeId= 2,
                ConversationGroupId= 1,
                DisplayName= "jennyphan",
                ConversationId= "id1",
                MappingStatusId = 1,
                IsActive = true,
                Headlines = new List<ConversationHeadlineModel>
                {
                    new()
                    {
                        ConversationGroupId = 1,
                        HeadlineId = 1,
                        HeadlineName = "test"
                    }
                },
                Recipients =new List<ConversationRecipient>
                {
                    new()
                    {
                        ConversationGroupId = 1,
                        LetstalkId = "t01",
                        RecipientId = 1,
                        RecipientName = "ab",
                        RecipientTypeName = "PIC",
                        RoleName = "partner"
                    },
                    new()
                    {
                        ConversationGroupId = 2,
                        LetstalkId = "t02",
                        RecipientId = 2,
                        RecipientName = "test2",
                        RecipientTypeName = "PIC2",
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