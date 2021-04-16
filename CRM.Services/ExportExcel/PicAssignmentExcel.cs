namespace CRM.Services
{
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
        private readonly IEnumerable<GroupAssignmentCommunication> groupAssignmentCommunications;
        private readonly IEnumerable<Setting> communicationTools;
        private readonly bool isRenderPicManagement;

        public PicAssignmentExcel(string templatePath, IEnumerable<PICAssignmentInfo> assignments,
            IEnumerable<GroupAssignmentCommunication> groupAssignmentCommunications,
            IEnumerable<Setting> communicationTools,
            bool isRenderPicManagement)
            : base(templatePath, 0, ViewResources.PICAssignment)
        {
            this.assignments = assignments;
            this.groupAssignmentCommunications = groupAssignmentCommunications;
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
                var commIncludeMergeHeadline = GetUniqueCommunicationToolsByPicModel(picMappingByMergeHealine).ToList();
                var mergePICByHeadlineOrderByCount = mergePICByHeadline.GroupPicMapping.Select(x => x.mergePicAndHeadline).ToList();
                foreach (var mergeHeadlineByPic in mergePICByHeadlineOrderByCount)
                {

                    var groupByCommonMergePic = GroupByMergePic(mergeHeadlineByPic);
                    for (int i = 0; i < groupByCommonMergePic.Count; i++)
                    {
                        RenderBodyAssigment(templateWorksheet, worksheet, groupByCommonMergePic, colIndex, ref rowIndex, rowNum, true);
                    }
                    var totalColumnDraw = isRenderPicManagement ? TotalColumns + 1 : TotalColumns;
                    DrawBorderCell(worksheet.Cells[1, 1, rowIndex - 1, totalColumnDraw]);
                }
            }
            var groupByPic = GroupByMergePic(excludeMergeCommonPIC);

            RenderBodyAssigment(templateWorksheet, worksheet, groupByPic, colIndex, ref rowIndex, rowNum, false);
            
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

        protected internal virtual List<GroupHeadlineOfPic> GroupByMergePic(IEnumerable<PICAssignmentInfo> assignments)
        {
            var groupByCommonMergePic = assignments.GroupBy(a => a.HeadlineID,
                        (key, g) => new GroupHeadlineOfPic
                        {
                            GroupHeadlineId = key,
                            GroupHeadline = g.FirstOrDefault().HeadlineName,
                            HeadlineType = g.FirstOrDefault().HeadlineType,
                            DefaultPIC = g.FirstOrDefault().DefaultPicList,
                            Pics = g.GroupBy(p => p.PicForMapping, (k, pic) => new PicOfDirectAccount
                            {
                                Pic = pic.FirstOrDefault().PicList,
                                DirectAccounts = pic.Select(d => new DirectAccountInfo
                                {
                                    DirectAccount = d.DirectAccount,
                                    Status = d.Status,
                                    Site = d.Site,
                                    Currency = d.Currency,
                                    Position = d.Position,
                                }).OrderBy(a => a.DirectAccount)
                            }).OrderBy(v => v.Pic == null)
                        }).OrderBy(x => x.GroupHeadlineId == 0).ThenBy(x => x.GroupHeadline).ToList();
            return groupByCommonMergePic;
        }

        protected internal virtual void RenderBodyAssigment(
           ExcelWorksheet templateWorksheet,
           ExcelWorksheet worksheet,
           List<GroupHeadlineOfPic> groupByPic,
           int colIndex,
           ref int rowIndex,
           int rowNum,
           bool isMergeCommonPic
           )
        {
        for (int i = 0; i < groupByPic.Count; i++)
            {
                var countExtraRowComm = 0;
                var maxGroupHeadline = 0;
                colIndex = 1;
                var indexCommRender = 0;
                var assignment = groupByPic[i];
                var comm = GetUniqueCommunicationTools(assignment?.Pics)?.ToList();
                var groupHeadlineTotalRow = assignment.Pics.Sum(p => p.DirectAccounts.ToList().Count);
                maxGroupHeadline = groupHeadlineTotalRow;
                if (comm?.Count > groupHeadlineTotalRow)
                {
                    maxGroupHeadline = comm.Count;
                }
                StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + maxGroupHeadline - 1);
                worksheet.Cells[rowIndex, colIndex++].Value = rowNum++;
                StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + maxGroupHeadline - 1);
                worksheet.Cells[rowIndex, colIndex++].Value = assignment.GroupHeadline;
                StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + maxGroupHeadline - 1);
                worksheet.Cells[rowIndex, colIndex++].Value = assignment.HeadlineType;
                StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + maxGroupHeadline - 1);
                worksheet.Cells[rowIndex, colIndex].Value = GetPicCell(assignment.DefaultPIC).ToString();

                var picsCount = assignment.Pics.ToList();
                for (int j = 0; j < picsCount.Count; j++)
                {
                    colIndex = 5;
                    var mergePic = picsCount[j].DirectAccounts.ToList();
                    var countMergePic = mergePic.Count;
                    if(!isMergeCommonPic)
                    {
                        StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + countMergePic - 1);
                        worksheet.Cells[rowIndex, colIndex].Value = GetPicCell(picsCount[j]?.Pic).ToString();
                    }
                    
                    for (int d = 0; d < countMergePic; d++)
                    {
                        colIndex = 6;
                        var direct = mergePic[d];
                        if (direct.Status != CustomerStatus.Open.ToString())
                        {
                            var templateRowIndex = GetTemplateRowIndex(direct.Status);
                            templateWorksheet.Cells[templateRowIndex, colIndex, templateRowIndex, TotalColumns]
                                .Copy(worksheet.Cells[rowIndex, colIndex, rowIndex, TotalColumns]);
                        }
                        worksheet.Cells[rowIndex, colIndex++].Value = direct.DirectAccount;
                        worksheet.Cells[rowIndex, colIndex++].Value = direct.Status;
                        worksheet.Cells[rowIndex, colIndex++].Value = direct.Site;
                        worksheet.Cells[rowIndex, colIndex++].Value = direct.Currency;
                        worksheet.Cells[rowIndex, colIndex].Value = direct.Position;
                        if (indexCommRender < comm?.Count && isRenderPicManagement)
                        {
                            countExtraRowComm++;
                            RenderCommunicationTools(templateWorksheet, worksheet, rowIndex, comm[indexCommRender++]);
                        }
                        rowIndex++;
                    }
                }
                if ((countExtraRowComm < maxGroupHeadline) && countExtraRowComm < comm?.Count && isRenderPicManagement)
                {
                    var remainRow = maxGroupHeadline - countExtraRowComm;
                    for (int com = 0; com < remainRow; com++)
                    {
                        RenderCommunicationTools(templateWorksheet, worksheet, rowIndex++, comm[indexCommRender++]);
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
            if (comm!= null)
            {
                var colIndexComm = StartComToolsIndex;
                var listComm = communicationTools.ToList();
                worksheet.Cells[rowIndex, colIndexComm++].Value = comm.PicName.Length > 0 ? comm.PicName : "";
                for (int indexCommRender = 0; indexCommRender < listComm.Count; indexCommRender++)
                {
                    var renderValueComm = comm.ListComm.Where(item => item.CommunicationTool == listComm[indexCommRender].SettingValue).ToList();
                    worksheet.Cells[rowIndex, colIndexComm++].Value = renderValueComm.Count > 0 ? renderValueComm[0].CommunicationValue : "";
                }
            }
        }

        protected internal virtual IList<GroupAssignmentCommunication> GetUniqueCommunicationToolsByPicModel(
            IList<PicModel> picModels
        )
        {
            var splitPicModels = picModels.Select(x => x.PicId).ToList();
            return splitPicModels.Count > 0 ? groupAssignmentCommunications.Where(x =>
                splitPicModels.Any(y => y == x.PicId))
                .ToList()
            : null;
        }

        protected internal virtual IList<GroupAssignmentCommunication> GetUniqueCommunicationTools(
           IEnumerable<PicOfDirectAccount> headlinePic)
        {
            if(!headlinePic.Any() || headlinePic == null)
            {
                return null;
            }
            var picIds = new List<string>();
            foreach (var pic in headlinePic)
            {
                if (pic.Pic != null)
                {
                    picIds.AddRange(pic.Pic?.Select(x=>x.PicName));
                }
            }
            var uniquePicMapping = picIds.Distinct();

            return uniquePicMapping.Any() ? groupAssignmentCommunications.Where(x =>
                uniquePicMapping.Any(y => y == x.PicName.ToString()))
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