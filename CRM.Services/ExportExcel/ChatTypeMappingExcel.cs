namespace CRM.Services.ExportExcel
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Models.ChatTypeMapping;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class ChatTypeMappingExcel : ExcelBase
    {
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte TotalColumns = 12;
        private const byte WidthExtraSmall = 7;
        private const byte WidthSmall = 10;
        private const byte WidthNormal = 15;
        private const byte WidthLarge = 22;
        private readonly IEnumerable<ChatTypeMappingModel> chatTypeMappings;

        public ChatTypeMappingExcel(string templatePath, IEnumerable<ChatTypeMappingModel> chatTypeMappings)
            : base(templatePath, 0, ViewResources.PICAssignment)
        {
            this.chatTypeMappings = chatTypeMappings;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]
                .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]);
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            int rowIndex = RowStartBody;
            var chatTypeMappingsArray = chatTypeMappings.ToList();
            for (var index = 0; index < chatTypeMappingsArray.Count; index++)
            {
                RenderRow(worksheet, chatTypeMappingsArray[index], index + 1, rowIndex++);
            }
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetStyle(worksheet);
            SetWidthColumn(worksheet);
            DrawBorderCell(worksheet.Cells[1, 1, RowStartBody + chatTypeMappings.Count() - 1, TotalColumns]);
        }

        protected internal virtual void RenderRow(ExcelWorksheet worksheet, ChatTypeMappingModel chatType, int index, int rowIndex)
        {
            var colIndex = 1;
            const byte mappingGroup = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = index;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.ChatType;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.BotName;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.ConversationGroupName;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.Recipients.Count() > 0 ? chatType.Recipients.FirstOrDefault().RecipientTypeName : "";
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.Headlines.Count() > 0 ? string.Join(", ", chatType.Headlines.Select(x => x.HeadlineName)) : "";
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.ConversationGroupName;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.ChatTypeId == mappingGroup ? "" : chatType.ConversationId;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.Language;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.MappingStatus;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.IsActive ? ViewResources.Yes : ViewResources.No;
            worksheet.Cells[rowIndex, colIndex++].Value = chatType.Remark;

            worksheet.Cells[rowIndex, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[rowIndex, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            if ((index & 1) == 0)
            {
                SetBackgroundColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
            }
        }

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            SetBackgroundColor(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns], HeaderTitleColor);
            worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.Font.Bold = true;
            worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.Font.Color.SetColor(System.Drawing.Color.White);
            worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const byte colBotName = 3;
            const byte colGroupHeadline = 6;
            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = WidthExtraSmall;
            worksheet.Column(colBotName).Width = WidthSmall;
            worksheet.Column(colGroupHeadline).Width = WidthLarge;
            worksheet.Column(TotalColumns - 1).Width = WidthLarge;
            worksheet.Column(TotalColumns).Width = WidthLarge;
        }
    }
}