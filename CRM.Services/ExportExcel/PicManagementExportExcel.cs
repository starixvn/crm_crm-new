namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Drawing;
    using System.IO;
    using System.Linq;
    using CRM.Models;
    using CRM.Models.PicAndHeadline;
    using CRM.Resources;
    using Microsoft.AspNetCore.Hosting;
    using OfficeOpenXml;

    public interface IPicManagementExportExcel
    {
        IEnumerable<BaseModel> CommunicationTools { get; set; }

        byte[] Export(PicReport picReport);
    }
    public class PicManagementExportExcel : BaseExportExcel, IPicManagementExportExcel
    {
        public IEnumerable<BaseModel> CommunicationTools { get; set; }

        private const string CustomPath = "ExcelTemplates/PicManagement.xlsx";
        
        private const byte RowStartBody = 6;
        private const byte RowStartHeader = 4;
        private const byte BaseColumnIndex = 9;
        private const byte StartComToolsIndex = 7;
        private int totalColumn = BaseColumnIndex;
        private const byte WidthExtraSmall = 7;
        private const byte WidthSmall = 10;
        private const byte WidthNormal = 15;
        private const byte WidthLarge = 22;
        private readonly IHostingEnvironment hostingEnvironment;

        public PicManagementExportExcel(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public byte[] Export(PicReport picReport)
        {
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, CustomPath);
            using (var templatePackage = new ExcelPackage(new FileInfo(templatePath)))
            {
                using (var xlPackage = new ExcelPackage())
                {
                    var template = templatePackage.Workbook.Worksheets[0];
                    var worksheet = xlPackage.Workbook.Worksheets.Add(Labels.PICManagement);
                    totalColumn = BaseColumnIndex + CommunicationTools.Count() -1;
                    var rowIndex = 1;
                    template.Cells[1, 1, RowStartBody - 1, StartComToolsIndex - 1].Copy(worksheet.Cells[1, 1, RowStartBody - 1, StartComToolsIndex - 1]);
                    RenderHeader(worksheet);
                    rowIndex = RowStartBody;

                    for(var index = 0; index < picReport.DataList.Count; index++)
                    {
                        RenderRow(worksheet, picReport.DataList[index], index + 1, rowIndex++);
                    }

                    SetStyle(worksheet);
                    SetWidthColumn(worksheet);
                    DrawBorderCell(worksheet.Cells[1, 1, rowIndex - 1, totalColumn]);
                    return xlPackage.GetAsByteArray();
                }
            }
        }

        private void RenderHeader(ExcelWorksheet worksheet)
        {
            var tools = CommunicationTools.ToList();
            worksheet.Cells[RowStartHeader, StartComToolsIndex].Value = Labels.CommunicationTool;
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader, StartComToolsIndex + tools.Count - 1].Merge = true;
            for (var index = 0; index < tools.Count; index++) 
            {
                worksheet.Cells[RowStartHeader + 1, StartComToolsIndex + index].Value = tools[index].Name;
            }
            worksheet.Cells[RowStartHeader, totalColumn - 1].Value = Labels.Remark;
            StyleMergeCell(worksheet, RowStartHeader, totalColumn - 1, RowStartHeader + 1);
            worksheet.Cells[RowStartHeader, totalColumn].Value = Labels.Active;
            StyleMergeCell(worksheet, RowStartHeader, totalColumn, RowStartHeader + 1);
        }

        private void RenderRow(ExcelWorksheet worksheet, PicInfo picInfo, int index, int rowIndex)
        {
            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = index;
            worksheet.Cells[rowIndex, colIndex++].Value = picInfo.Username;
            worksheet.Cells[rowIndex, colIndex++].Value = picInfo.RoleName;
            worksheet.Cells[rowIndex, colIndex++].Value = string.Join(", ", picInfo.Languages.Select(lang => lang.SettingValue));
            worksheet.Cells[rowIndex, colIndex++].Value = picInfo.CountryName;
            worksheet.Cells[rowIndex, colIndex++].Value = picInfo.GroupHeadline;

            var tools = CommunicationTools.ToList();
            for(var i = 0; i < tools.Count; i++)
            {
                var item = picInfo.CommunicationTools.Find(t => t.SettingId == tools[i].Id);
                worksheet.Cells[rowIndex, colIndex++].Value = item == null ? string.Empty : item.Value;
            }

            worksheet.Cells[rowIndex, colIndex++].Value = picInfo.Remark;
            worksheet.Cells[rowIndex, colIndex].Value = picInfo.IsActive ? Labels.Yes : Labels.No;

            StyleHorizontalAlignmentCenter(worksheet.Cells[rowIndex, 1]);
            StyleHorizontalAlignmentCenter(worksheet.Cells[rowIndex, colIndex]);
            if ((index & 1) == 0)
            {
                SetBackgroudColor(worksheet.Cells[rowIndex, 1, rowIndex, colIndex], EvenRowColor);
            }
        }

        private void SetStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            const byte firstRow = 1;
            const byte spaceRowTitle = 3;
            worksheet.Cells[firstRow, 1, firstRow + 1, totalColumn].Merge = true;
            worksheet.Cells[spaceRowTitle, 1, spaceRowTitle, totalColumn].Merge = true;
            SetBackgroudColor(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn], HeaderTitleColor);
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.Font.Bold = true;
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn].Style.Font.Color.SetColor(Color.White);
            StyleHorizontalAlignmentCenter(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, totalColumn]);
        }

        private void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const byte colRole = 3;
            const byte colGroupHeadline = 6;
            worksheet.DefaultColWidth = WidthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = WidthExtraSmall;
            worksheet.Column(colRole).Width = WidthSmall;
            worksheet.Column(colGroupHeadline).Width = WidthLarge;
            worksheet.Column(totalColumn - 1).Width = WidthLarge;
            worksheet.Column(totalColumn).Width = WidthExtraSmall;
        }
    }
}
