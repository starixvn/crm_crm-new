namespace CRM.Services
{
    using System;
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
        private const byte colIndexMergePic = 5;
        private const byte BaseColumnIndex = 10;
        private int TotalColumns = BaseColumnIndex;
        private const byte StartComToolsIndex = 12;


        private readonly IEnumerable<PICAssignmentInfo> assignments;
        private readonly IEnumerable<AssignmentCommunication> picComms;

        public PicAssignmentExcel(string templatePath, IEnumerable<PICAssignmentInfo> assignments, 
            IEnumerable<AssignmentCommunication> picComms)
            : base(templatePath, 0, ViewResources.PICAssignment)
        {
            this.assignments = assignments;
            this.picComms = picComms;
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

            var listComm = picComms.Select(x => x.SettingValue).Distinct().ToList();
            TotalColumns = TotalColumns + listComm.Count - 1;
            worksheet.Cells[RowStartHeader, StartComToolsIndex].Value = ViewResources.CommunicationTool;
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader, StartComToolsIndex + listComm.Count - 1].Merge = true;
            for (var index = 0; index < listComm.Count; index++)
            {
                worksheet.Cells[RowStartHeader + 1, StartComToolsIndex + index].Value = listComm[index];
            }

        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var groupByComm = picComms.GroupBy(x => new { x.PicId, x.Username }).Select(y => new
            {
                PicName = y.Key.Username,
                PicId = y.Key.PicId,
                ListComm = y.ToList()
            }).ToList();

            var MergePicGroupHeadlineIds = GetIdMergePic(assignments);

            var mergeCommonPIC = assignments.Where(x => MergePicGroupHeadlineIds.Any(y=>y == x.HeadlineID))
                .OrderBy(z => z.PicForMapping).ToList();

            var excludeMergeCommonPIC = assignments.Where(x => MergePicGroupHeadlineIds.Any(y => y != x.HeadlineID)).ToList();
            var mergePICGroupByPicMappingAndHeadline = mergeCommonPIC
            .GroupBy(x => new { x.HeadlineID, x.PicForMapping })
            .Select(y => new {
                y.Key.PicForMapping,
                PicList = y.Select(z=>z.PicList).First(),
                mergePicAndHeadline = y.ToList() }).ToList();

            var mergePICByHeadlines = mergePICGroupByPicMappingAndHeadline.GroupBy(x => x.PicForMapping);

            int rowIndex = RowStartBody;
            int rowIndexMergePIC = RowStartBody;
            var colIndex = 1;
            var rowNum = 1;
            var mergeHeadlineForPic = 0;
            StyleDefault(worksheet);
            foreach (var mergePICByHeadline in mergePICByHeadlines)
            {
                var countMergePic = 0;
                foreach (var mergeHeadlineByPic in mergePICByHeadline.Select(x => x.mergePicAndHeadline).ToList())
                {
                    countMergePic += mergeHeadlineByPic.Count;
                }
                var merPicCell = GetPicCell(mergePICByHeadline.Select(x => x.PicList).First());
                StyleMergeCell(worksheet, rowIndex, colIndexMergePic, rowIndexMergePIC + countMergePic - 1);
                worksheet.Cells[rowIndex, colIndexMergePic].Value = merPicCell;
                rowIndexMergePIC = rowIndexMergePIC + countMergePic;

                foreach (var mergeHeadlineByPic in mergePICByHeadline.Select(x => x.mergePicAndHeadline).ToList())
                {
                    foreach (PICAssignmentInfo assignment in mergeHeadlineByPic)
                    {
                        colIndex = 1;
                        if (mergeHeadlineForPic == 0)
                        {
                            mergeHeadlineForPic = assignments.Count(assign => assign.HeadlineID == assignment.HeadlineID);

                            StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadlineForPic - 1);
                            worksheet.Cells[rowIndex, colIndex++].Value = rowNum++;

                            StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadlineForPic - 1);
                            worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineName;
                            StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadlineForPic - 1);
                            worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineType;
                            StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadlineForPic - 1);
                            worksheet.Cells[rowIndex, colIndex++].Value = GetPicCell(assignment.DefaultPicList);
                            colIndex++;
                        }
                        else
                        {
                            const int addCol = 5;
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

                        mergeHeadlineForPic--;
                        rowIndex++;
                    }
                }
            }
            RenderBodyExcludeMergePic(templateWorksheet, worksheet,
            excludeMergeCommonPIC, colIndex, rowIndex, rowNum);
            DrawBorderCell(worksheet.Cells[1, 1, rowIndex - 1, colIndex]);
        }

        protected internal virtual List<int> GetIdMergePic(IEnumerable<PICAssignmentInfo> assignments)
        {
            var assignmentGroup = assignments
           .GroupBy(x => new { x.HeadlineID, x.HeadlineName, x.HeadlineType, x.PicForMapping })
           .Select(y => new
           {
               y.Key.HeadlineID,
               y.Key.HeadlineName,
               y.Key.HeadlineType,
               y.Key.PicForMapping,
               GroupPICMapping = y.ToList()
           }
           ).OrderBy(z => z.HeadlineName).ToList();

            var groupHeadlines = assignmentGroup.GroupBy(x =>
                                new { x.HeadlineID, x.HeadlineName, x.HeadlineType })
                                .Select(y => new
                                {
                                    y.Key.HeadlineID,
                                    PicForMappingJoin = y.Select(z => z.GroupPICMapping).Count() == 1 && string.Join(", ", y.Select(z => z.PicForMapping)).Length > 0
                                    ? string.Join(", ", y.Select(z => z.PicForMapping))
                                    : string.Join(", ", y.Key.HeadlineID),
                                    GroupHeadlines = y.Select(z => z.GroupPICMapping)
                                }).ToList();

            var groupbyPicForMappings = groupHeadlines.GroupBy(x => x.PicForMappingJoin)
                .Select(y => new
                {
                    IsMergePIC = y.Key.Length > 0 && y.Count() > 1 ? true : false,
                    PicForMappingJoin = y.Key,
                    HeadlineID = y.Select(x => x.HeadlineID),
                    PICAssignmentInfoGroup = y.ToList()
                })
                .OrderBy(y => y.IsMergePIC ? 0 : 1).ToList();

            var MergePicGroupHeadlineIds = groupbyPicForMappings.Where(x => x.IsMergePIC).Select(y => y.HeadlineID.ToList());
            var headlineIdMerges = new List<int>();
            foreach (var headlineId in MergePicGroupHeadlineIds)
            {
                for (int i = 0; i < headlineId.Count; i++)
                {
                    headlineIdMerges.Add(headlineId[i]);
                }
            }
            return headlineIdMerges;
        }

        protected internal virtual void RenderBodyExcludeMergePic(
            ExcelWorksheet templateWorksheet,
            ExcelWorksheet worksheet,
            List<PICAssignmentInfo> excludeMergeCommonPIC,
            int colIndex,
            int rowIndex,
            int rowNum
            )
        {

            var mergeHeadline = 0;
            var mergePic = 0;
            foreach (PICAssignmentInfo assignment in excludeMergeCommonPIC)
            {
                colIndex = 1;
                if (mergeHeadline == 0)
                {
                    mergeHeadline = assignments.Count(assign => assign.HeadlineID == assignment.HeadlineID);
                    var pics = assignments.Where(assign => assign.HeadlineID == assignment.HeadlineID && assign.PicForMapping == assignment.PicForMapping);
                    mergePic = pics.Count();

                    StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadline - 1);
                    worksheet.Cells[rowIndex, colIndex++].Value = rowNum++;
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
                    const int addCol = 4;
                    colIndex += addCol;
                    var pics = assignments.Where(assign => assign.HeadlineID == assignment.HeadlineID && assign.PicForMapping == assignment.PicForMapping);
                    mergePic = pics.Count();
                    var picCell = GetPicCell(assignment.PicList);
                    StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergePic - 1);
                    worksheet.Cells[rowIndex, colIndex++].Value = picCell;
                }
                else
                {
                    const int addCol = 5;
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
            const byte widthLarge = 20;
            const byte widthNormal = 15;
            const byte widthSmall = 7;
            const byte colPIC = 5;
            worksheet.DefaultColWidth = widthNormal;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(1).Width = widthSmall;
            worksheet.Column(colPIC).Width = widthLarge;
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
        }

        protected internal virtual string GetPicCell(IEnumerable<PicModel> picList)
        {
            if (picList == null || !picList.Any())
            {
                return string.Empty;
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