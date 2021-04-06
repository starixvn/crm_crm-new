namespace CRM.Services
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using System.Text;
    using CRM.Core.Constants;
    using CRM.Core.Enumerables;
    using CRM.Models.PicAndHeadline;
    using CRM.Models.Setting;
    using CRM.Resources;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class PicAssignmentExcel : ExcelBase
    {
        private const byte RowStartHeader = 4;
        private const byte RowStartBody = 6;
        private const byte RowClosed = 7;
        private const byte RowSuspended = 8;
        private const byte RowDisabled = 9;
        private const byte colIndexMergePic = 5;
        private const byte BaseColumnIndex = 10;
        private int TotalColumns = BaseColumnIndex;
        private const byte StartComToolsIndex = 11;


        private readonly IEnumerable<PICAssignmentInfo> assignments;
        private readonly IEnumerable<AssignmentCommunication> picComms;
        private readonly IEnumerable<Setting> communicationTools;
        private readonly bool isRenderPicManagement;

        public PicAssignmentExcel(string templatePath, IEnumerable<PICAssignmentInfo> assignments,
            IEnumerable<AssignmentCommunication> picComms,
            IEnumerable<Setting> communicationTools,
            bool isRenderPicManagement)
            : base(templatePath, 0, ViewResources.PICAssignment)
        {
            this.assignments = assignments;
            this.picComms = picComms;
            this.communicationTools = communicationTools;
            this.isRenderPicManagement = isRenderPicManagement;
        }

        protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]
                .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
        }

        protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]
               .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader + 1, StartComToolsIndex - 1]);

            if(isRenderPicManagement)
            {
                var listComm = communicationTools.ToList();
                TotalColumns = TotalColumns + listComm.Count;
                worksheet.Cells[RowStartHeader, StartComToolsIndex].Value = ViewResources.CommunicationTool;
                worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader, StartComToolsIndex + listComm.Count].Merge = true;
                worksheet.Cells[RowStartHeader + 1, StartComToolsIndex].Value = ViewResources.PICName;
                for (var index = 0; index < listComm.Count; index++)
                {
                    worksheet.Cells[RowStartHeader + 1, StartComToolsIndex + 1 + index].Value = listComm[index].SettingValue;
                }
            }
        }

        protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
        {
            var MergePicGroupHeadlineIds = GetIdMergePic(assignments);
            var mergeCommonPIC = assignments.Where(x => MergePicGroupHeadlineIds.Any(y => y == x.HeadlineID)).ToList();
            var excludeMergeCommonPIC = assignments.Except(mergeCommonPIC).ToList();
            var mergePICGroupByPicMappingAndHeadline = mergeCommonPIC
            .GroupBy(x => new { x.HeadlineID, x.PicForMapping, x.HeadlineName })
            .Select(y => new {
                y.Key.PicForMapping,
                PicList = y.Select(z => z.PicList).First(),
                mergePicAndHeadline = y.ToList()
            })
            .ToList();
            var mergePICByHeadlines = mergePICGroupByPicMappingAndHeadline.GroupBy(x => x.PicForMapping).Select(y=> new{
                PicName = GetPicCell(y.Select(z=>z.PicList).First()),
                GroupPicMapping = y.ToList()
            }).ToList();
            var mergePICByHeadlinesOrderBy = mergePICByHeadlines.OrderByDescending(x => x.GroupPicMapping.Count).ThenBy(y=>y.PicName);
            int rowIndex = RowStartBody;
            int rowIndexMergePIC = RowStartBody;
            var colIndex = 1;
            var colIndexComm = StartComToolsIndex;
            var rowNum = 1;
            var mergeHeadlineForPic = 0;
            StyleDefault(worksheet);
            foreach (var mergePICByHeadline in mergePICByHeadlinesOrderBy)
            {
                var countMergePic = 0;
                foreach (var mergeHeadlineByPic in mergePICByHeadline.GroupPicMapping.Select(x => x.mergePicAndHeadline).ToList())
                {
                    countMergePic += mergeHeadlineByPic.Count;
                }
                var picMappingByMergeHealine = mergePICByHeadline.GroupPicMapping.Select(x => x.PicList).First().ToList();
                var merPicCell = GetPicCell(picMappingByMergeHealine);
                StyleMergeCell(worksheet, rowIndex, colIndexMergePic, rowIndexMergePIC + countMergePic - 1);
                worksheet.Cells[rowIndex, colIndexMergePic].Value = merPicCell;
                rowIndexMergePIC = rowIndexMergePIC + countMergePic;
                var countCommIncludeMergeHeadline = 0;
                var commIncludeMergeHeadline = GetUniqueCommunicationToolsByPicModel(picMappingByMergeHealine).ToList();
                var mergePICByHeadlineOrderByCount = mergePICByHeadline.GroupPicMapping.Select(x => x.mergePicAndHeadline).ToList();

                foreach (var mergeHeadlineByPic in mergePICByHeadlineOrderByCount)
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

                        if (countCommIncludeMergeHeadline < commIncludeMergeHeadline?.Count && isRenderPicManagement)
                        {
                            RenderCommunicationTools(templateWorksheet, worksheet, rowIndex, commIncludeMergeHeadline[countCommIncludeMergeHeadline]);
                        }
                        countCommIncludeMergeHeadline++;
                        mergeHeadlineForPic--;
                        rowIndex++;
                    }
                }
            }
            RenderBodyExcludeMergePic(templateWorksheet, worksheet, excludeMergeCommonPIC,
                                        colIndex, rowIndex, rowNum, colIndexComm);
            var totalColumnDrawInculdeMergeHeadline = isRenderPicManagement ? TotalColumns + 1 : TotalColumns;
            DrawBorderCell(worksheet.Cells[1, 1, rowIndex - 1, totalColumnDrawInculdeMergeHeadline]);
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
            int rowNum,
            int colIndexComm
            )
        {
            var mergeHeadline = 0;
            var mergePic = 0;
            var countComm = 0;
            foreach (PICAssignmentInfo assignment in excludeMergeCommonPIC)
            {
                colIndex = 1;
                var comm = GetUniqueCommunicationTools(assignments, assignment);

                if (mergeHeadline == 0)
                {
                    mergeHeadline = assignments.Count(assign => assign.HeadlineID == assignment.HeadlineID);
                    var pics = assignments.Where(assign => assign.HeadlineID == assignment.HeadlineID && assign.PicForMapping == assignment.PicForMapping);
                    mergePic = pics.Count();
                        
                    countComm = 0;
                    if (comm?.Count > mergeHeadline && isRenderPicManagement)
                    {
                        var countExtraComm = comm.Count - mergeHeadline;
                        var mergeHeadlineExtraComm = mergeHeadline + countExtraComm;
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadlineExtraComm - 1);
                        worksheet.Cells[rowIndex, colIndex++].Value = rowNum++;
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadlineExtraComm - 1);
                        worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineName;
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadlineExtraComm - 1);
                        worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineType;
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadlineExtraComm - 1);
                        worksheet.Cells[rowIndex, colIndex++].Value = GetPicCell(assignment.DefaultPicList);

                    }
                    else
                    {
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadline - 1);
                        worksheet.Cells[rowIndex, colIndex++].Value = rowNum++;
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadline - 1);
                        worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineName;
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadline - 1);
                        worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineType;
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergeHeadline - 1);
                        worksheet.Cells[rowIndex, colIndex++].Value = GetPicCell(assignment.DefaultPicList);
                    }

                    if (mergePic > 0) {
                        var picCell = GetPicCell(assignment.PicList);
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + mergePic - 1);
                        worksheet.Cells[rowIndex, colIndex].Value = picCell;
                    }

                    colIndex++;
                }
                else if (mergePic == 0)
                {
                    colIndexComm = StartComToolsIndex;
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

                if (countComm < comm?.Count && isRenderPicManagement)
                {
                    RenderCommunicationTools(templateWorksheet, worksheet, rowIndex, comm[countComm]);
                }
                countComm++;
                mergeHeadline--;
                mergePic--;
                rowIndex++;
                if (mergeHeadline == 0 && countComm < comm?.Count && isRenderPicManagement)
                {
                    var remainCountComm = comm?.Count - countComm;
                    for (var indexExtraComm = 0; indexExtraComm < remainCountComm; indexExtraComm++)
                    {
                        var rowIndexExtraComm = rowIndex;
                        rowIndex++;
                        RenderCommunicationTools(templateWorksheet, worksheet, rowIndexExtraComm, comm[countComm++]);
                    }
                }
            }
            var totalColumnDraw = isRenderPicManagement ? TotalColumns + 1 : TotalColumns;
            DrawBorderCell(worksheet.Cells[1, 1, rowIndex - 1, totalColumnDraw]);
        }

        protected internal virtual void RenderCommunicationTools(
            ExcelWorksheet templateWorksheet,
            ExcelWorksheet worksheet,
            int rowIndex,
            GroupAssignmentCommunication comm
           )
        {
            if(comm != null)
            {
                var colIndexComm = StartComToolsIndex;
                var listComm = communicationTools.ToList();
                worksheet.Cells[rowIndex, colIndexComm++].Value = comm.PicName.Length > 0 ? comm.PicName : "";
                for (int indexCommRender = 0; indexCommRender< listComm.Count; indexCommRender++)
                {
                    var renderValueComm = comm.ListComm.Where(item => item.CommunicationTool == listComm[indexCommRender].SettingValue).ToList();
                    worksheet.Cells[rowIndex, colIndexComm++].Value = renderValueComm.Count > 0 ? renderValueComm[0].CommunicationValue : "";
                }
            }
        }

        protected internal virtual IList<GroupAssignmentCommunication> GetUniqueCommunicationToolsByPicModel(
            IList<PicModel> picModels)
        {
            var communicationToolsGroup = picComms.GroupBy(x => new { x.PicId, x.Username, x.Order, x.RoleId }).Select(y => new GroupAssignmentCommunication
            {
                Order = y.Key.Order,
                RoleId = y.Key.RoleId,
                PicName = y.Key.Username,
                PicId = y.Key.PicId,
                ListComm = y.ToList()
            }).OrderBy(y => y.Order)
                .ThenBy(y => y.RoleId)
                .ThenBy(y => y.PicName)
                .ToList();

            var splitPicModels = picModels.Select(x => x.PicId).ToList();
            return splitPicModels.Count > 0 ? communicationToolsGroup.Where(x =>
                splitPicModels.Any(y => y == x.PicId))
                .ToList()
            : null;
        }

        protected internal virtual IList<GroupAssignmentCommunication> GetUniqueCommunicationTools(
            IEnumerable<PICAssignmentInfo> assignments,
            PICAssignmentInfo assignment)
        {
            var picForMappingSplit = new List<string>();
            var headline = assignments.Where(assign => assign.HeadlineID == assignment.HeadlineID);
            foreach (var head in headline)
            {
                if (head.PicForMapping?.Length > 0)
                {
                    var splitPic = head.PicForMapping.Split(",");
                    foreach (var pic in splitPic)
                    {
                        picForMappingSplit.Add(pic);
                    }
                }
            }
            var uniquePicMapping =  picForMappingSplit.Distinct().ToList();

            var communicationToolsGroup = picComms.GroupBy(x => new { x.PicId, x.Username, x.Order, x.RoleId }).Select(y => new GroupAssignmentCommunication
            {
                Order = y.Key.Order,
                RoleId = y.Key.RoleId,
                PicName = y.Key.Username,
                PicId = y.Key.PicId,
                ListComm = y.ToList()
            }).OrderBy(y => y.Order)
                .ThenBy(y => y.RoleId)
                .ThenBy(y => y.PicName)
                .ToList();
            return uniquePicMapping.Count > 0 ? communicationToolsGroup.Where(x => 
                uniquePicMapping.Any(y => y == x.PicId.ToString()))
                .ToList()
            : null;
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
            if(isRenderPicManagement)
            {
                SetStyle(worksheet);
            }
        }

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            const byte firstRow = 1;
            worksheet.Cells[firstRow, 1, firstRow + 1, TotalColumns + 1].Merge = true;
            SetBackgroundColor(worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, TotalColumns + 1], HeaderTitleColor);
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, TotalColumns + 1].Style.Font.Bold = true;
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, TotalColumns + 1].Style.Font.Color.SetColor(Color.White);
            worksheet.Cells[RowStartHeader, StartComToolsIndex, RowStartHeader + 1, TotalColumns + 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
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
            worksheet.Cells[startRow, colIndex, endRow, colIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
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