namespace CRM.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Models.PicAndHeadline;
    using CRM.Resources;
    using OfficeOpenXml;

    public class PicAssignmentExcel : ExcelBase
    {
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 5;
        private const byte RowClosed = 6;
        private const byte RowSuspended = 7;
        private const byte RowDisabled = 8;
        private const byte TotalColumns = 10;
        private readonly IEnumerable<PICAssignmentInfo> assignments;

        public PicAssignmentExcel(string templatePath, IEnumerable<PICAssignmentInfo> assignments)
            : base(templatePath, 0, ViewResources.PICAssignment)
        {
            this.assignments = assignments;
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
            var colIndex = 1;
            var rowNum = 1;
            var mergeHeadline = 0;
            var mergePic = 0;
            foreach (PICAssignmentInfo assignment in assignments)
            {
                colIndex = 1;
                templateWorksheet.Cells[RowStartBody, 1].Copy(worksheet.Cells[rowIndex, colIndex]);
                worksheet.Cells[rowIndex, colIndex++].Value = rowNum++;
                if (mergeHeadline == 0)
                {
                    mergeHeadline = assignments.Count(assign => assign.HeadlineID == assignment.HeadlineID);
                    var pics = assignments.Where(assign => assign.HeadlineID == assignment.HeadlineID && assign.PicForMapping == assignment.PicForMapping);
                    mergePic = pics.Count();
                    StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadline - 1);
                    worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineName;
                    StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadline - 1);
                    worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineType;
                    StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadline - 1);
                    worksheet.Cells[rowIndex, colIndex++].Value = GetPicCell(assignment.DefaultPicList);

                    if (mergePic > 0)
                    {
                        var picCell = GetPicCell(assignment.PicList);
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergePic - 1);
                        worksheet.Cells[rowIndex, colIndex].Value = picCell;
                    }

                    colIndex++;
                }
                else if (mergePic == 0)
                {
                    const int addCol = 3;
                    colIndex += addCol;
                    var pics = assignments.Where(assign => assign.HeadlineID == assignment.HeadlineID && assign.PicForMapping == assignment.PicForMapping);
                    mergePic = pics.Count();
                    var picCell = GetPicCell(assignment.PicList);
                    StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergePic - 1);
                    worksheet.Cells[rowIndex, colIndex++].Value = picCell;
                }
                else
                {
                    const int addCol = 4;
                    colIndex += addCol;
                }

                var templateRowIndex = GetTemplateRowIndex(assignment.Status);
                templateWorksheet.Cells[templateRowIndex, colIndex, templateRowIndex, TotalColumns]
                    .Copy(worksheet.Cells[rowIndex, colIndex, rowIndex, TotalColumns]);
                worksheet.Cells[rowIndex, colIndex++].Value = assignment.DirectAccount;
                worksheet.Cells[rowIndex, colIndex++].Value = assignment.Status;
                worksheet.Cells[rowIndex, colIndex++].Value = assignment.Site;
                worksheet.Cells[rowIndex, colIndex++].Value = assignment.Currency;
                worksheet.Cells[rowIndex, colIndex].Value = assignment.Position;

                mergeHeadline--;
                mergePic--;
                rowIndex++;
            }
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            worksheet.Cells.AutoFitColumns();
            worksheet.View.FreezePanes(RowStartBody, TotalColumns + 1);
        }

        protected internal virtual byte GetTemplateRowIndex(string status)
        {
            if (status == CustomerStatus.Closed.ToString())
            {
                return RowClosed;
            }

            if (status == CustomerStatus.Suspended.ToString())
            {
                return RowSuspended;
            }

            if (status == CustomerStatus.Disabled.ToString())
            {
                return RowDisabled;
            }

            return RowStartBody;
        }

        protected internal virtual void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            DrawBorderCell(worksheet.Cells[startRow, colIndex]);
        }

        protected internal virtual string GetPicCell(IEnumerable<PicModel> picList)
        {
            if (picList == null || !picList.Any())
            {
                return ExcelCharacter.NullCharacter;
            }

            var buffer = new StringBuilder();
            var last = picList.Last();
            foreach (var pic in picList)
            {
                var endCharacter = last == pic ? string.Empty : ExcelCharacter.NewLineCharacter;
                buffer.Append($"{pic.PicName} ({pic.Role}){endCharacter}");
            }

            return buffer.ToString();
        }
    }
}