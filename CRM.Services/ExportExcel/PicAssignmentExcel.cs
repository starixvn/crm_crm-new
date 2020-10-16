namespace CRM.Services
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Models.PicAndHeadline;
    using CRM.Resources;
    using Microsoft.AspNetCore.Hosting;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public interface IPicAssignmentExcel
    {
        byte[] Export(IEnumerable<PICAssignmentInfo> assignments);
    }

    public class PicAssignmentExcel : IPicAssignmentExcel
    {
        private const string CustomPath = "ExcelTemplates/PicAssignment.xlsx";
        private const byte RowStartBody = 5;
        private const byte RowClosed = 6;
        private const byte RowSuspended = 7;
        private const byte RowDisabled = 8;
        private const byte TotalColumns = 10;
        private readonly IHostingEnvironment hostingEnvironment;

        public PicAssignmentExcel(IHostingEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public byte[] Export(IEnumerable<PICAssignmentInfo> assignments)
        {
            var templatePath = Path.Combine(hostingEnvironment.ContentRootPath, CustomPath);
            using (var templatePackage = new ExcelPackage(new FileInfo(templatePath)))
            {
                using (var xlPackage = new ExcelPackage())
                {
                    var template = templatePackage.Workbook.Worksheets[Labels.PicAssignment];
                    var worksheet = xlPackage.Workbook.Worksheets.Add(Labels.PicAssignment);
                    RenderTitleAndHeader(template, worksheet);
                    var colIndex = 1;
                    int rowIndex = RowStartBody;
                    var rowNum = 1;
                    var mergeHeadline = 0;
                    var mergePic = 0;
                    foreach (PICAssignmentInfo assignment in assignments)
                    {
                        colIndex = 1;
                        template.Cells[RowStartBody, 1].Copy(worksheet.Cells[rowIndex, colIndex]);
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
                        template.Cells[templateRowIndex, colIndex, templateRowIndex, TotalColumns].Copy(worksheet.Cells[rowIndex, colIndex, rowIndex, TotalColumns]);
                        worksheet.Cells[rowIndex, colIndex++].Value = assignment.DirectAccount;
                        worksheet.Cells[rowIndex, colIndex++].Value = assignment.Status;
                        worksheet.Cells[rowIndex, colIndex++].Value = assignment.Site;
                        worksheet.Cells[rowIndex, colIndex++].Value = assignment.Currency;
                        worksheet.Cells[rowIndex, colIndex].Value = assignment.Position;

                        mergeHeadline--;
                        mergePic--;
                        rowIndex++;
                    }

                    worksheet.Cells.AutoFitColumns();
                    worksheet.View.FreezePanes(RowStartBody, TotalColumns + 1);
                    return xlPackage.GetAsByteArray();
                }
            }
        }

        protected internal void RenderTitleAndHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartBody - 1, TotalColumns]
                .Copy(worksheet.Cells[1, 1, RowStartBody - 1, TotalColumns]);
        }

        protected internal byte GetTemplateRowIndex(string status)
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

        private static string GetPicCell(IEnumerable<PicModel> picList)
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

        private static void StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
        {
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Merge = true;
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Style.VerticalAlignment = OfficeOpenXml.Style.ExcelVerticalAlignment.Center;
            DrawBorderCell(worksheet.Cells[startRow, colIndex]);
        }

        private static void DrawBorderCell(ExcelRange cell)
        {
            cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
            cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
            cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
        }
    }
}