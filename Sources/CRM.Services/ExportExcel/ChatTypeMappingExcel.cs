namespace CRM.Services.ExportExcel;

using CRM.Models.ChatTypeMapping;
using CRM.Resources;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Collections.Generic;
using System.Linq;

public class ChatTypeMappingExcel(string templatePath, IEnumerable<ChatTypeMappingModel> chatTypeMappings)
    : ExcelBase(templatePath, 0, ViewResources.ChatTypeMapping)
{
    private const byte RowStartHeaderChatType = 4;
    private const byte RowStartBody = 5;
    private const byte TotalColumnsChatType = 12;
    private const byte WidthExtraSmall = 7;
    private const byte WidthSmall = 10;
    private const byte WidthNormal = 15;
    private const byte WidthLarge = 25;
    private const byte ColIndexMergeDefault = 7;
    private const byte mappingGroup = 1;

    private int rowIndex = RowStartBody;

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeaderChatType - 1, TotalColumnsChatType]
            .Copy(worksheet.Cells[1, 1, RowStartHeaderChatType - 1, TotalColumnsChatType]);
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType]
            .Copy(worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType]);
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var rowNum = 0;
        foreach (var chatType in chatTypeMappings)
        {
            rowNum++;
            if (chatType.Recipients.Count() > 1 && (rowNum & 1) == 0)
            {
                for (var i = 1; i < chatType.Recipients.Count(); i++)
                {
                    SetBackgroundColor(worksheet.Cells[rowIndex + i, ColIndexMergeDefault, rowIndex + i, ColIndexMergeDefault], EvenRowColor);
                }
            }
            RenderRow(chatType, rowNum, worksheet);
        }
    }

    protected internal virtual void RenderRow(ChatTypeMappingModel chatType, int rowNum, ExcelWorksheet worksheet)
    {
        var colIndex = 1;
        var colIndexMerge = 1;
        var colIndexMergeAfterHeadline = 8;
        var recipientCounts = chatType.Recipients.Count();
        if (recipientCounts > 1)
        {
            var rowMerge = rowIndex + recipientCounts - 1;
            StyleMergeCell(worksheet, rowIndex, colIndexMerge++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMerge++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMerge++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMerge++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMerge++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMerge++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMerge, rowMerge);

            StyleMergeCell(worksheet, rowIndex, colIndexMergeAfterHeadline++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMergeAfterHeadline++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMergeAfterHeadline++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMergeAfterHeadline++, rowMerge);
            StyleMergeCell(worksheet, rowIndex, colIndexMergeAfterHeadline, rowMerge);
        }

        worksheet.Cells[rowIndex, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

        worksheet.Cells[rowIndex, colIndex++].Value = rowNum;
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.ChannelName;
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.BotName;
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.ChatType;
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.DisplayName;
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.Headlines.Any() ? string.Join(", ", chatType.Headlines.Select(x => x.HeadlineName)) : "";
        colIndex++;
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.ChatTypeId == mappingGroup ? "" : chatType.LetstalkID_Username;
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.Language;
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.ChatTypeId == mappingGroup ? chatType.MappingStatus : "";
        worksheet.Cells[rowIndex, colIndex++].Value = chatType.IsActive ? ViewResources.Yes : ViewResources.No;
        worksheet.Cells[rowIndex, colIndex].Value = chatType.Remark;
        if (recipientCounts > 0)
        {
            for (var i = 0; i < recipientCounts; i++)
            {
                worksheet.Cells[rowIndex++, ColIndexMergeDefault].Value =
                    $"{chatType.Recipients.ToList()[i].RecipientName} ({chatType.Recipients.ToList()[i].RoleName})";
            }
        }
        else
        {
            rowIndex++;
        }
        if ((rowNum & 1) == 1)
        {
            SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
        }
    }

    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetStyle(worksheet);
        SetWidthColumn(worksheet);
        var countMergeCells = 0;
        foreach (var recipients in chatTypeMappings.Select(x => x.Recipients))
        {
            if (recipients.Count() > 1)
            {
                countMergeCells += recipients.Count() - 1;
            }
        }
        var chatTypeCountDrawBoder = RowStartBody + chatTypeMappings.Count() + countMergeCells - 1;
        DrawBorderCell(worksheet.Cells[1, 1, chatTypeCountDrawBoder, TotalColumnsChatType]);
    }

    protected internal virtual void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
    {
        worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
        DrawBorderCell(worksheet.Cells[startRow, colIndex]);
    }

    protected internal virtual void SetStyle(ExcelWorksheet worksheet)
    {
        StyleDefault(worksheet);
        SetBackgroundColor(worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType], HeaderTitleColor);
        worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType].Style.Font.Bold = true;
        worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType].Style.Font.Color.SetColor(System.Drawing.Color.White);
        worksheet.Cells[RowStartHeaderChatType, 1, RowStartHeaderChatType, TotalColumnsChatType].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        const byte colBotName = 2;
        const byte colLetstalkName = 4;
        const byte colGroupHeadline = 6;
        const byte colRecipient = 7;
        worksheet.DefaultColWidth = WidthNormal;
        worksheet.Cells.AutoFitColumns();
        worksheet.Column(1).Width = WidthExtraSmall;
        worksheet.Column(colBotName).Width = WidthSmall;
        worksheet.Column(colGroupHeadline).Width = WidthLarge;
        worksheet.Column(colLetstalkName).Width = WidthLarge;
        worksheet.Column(colRecipient).Width = WidthLarge;
        worksheet.Column(TotalColumnsChatType - 1).Width = WidthExtraSmall;
        worksheet.Column(TotalColumnsChatType).Width = WidthLarge;
    }
}