namespace CRM.Services.ExportExcel;

using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using Constants;
using CRM.Models.PicAndHeadline;
using CRM.Models.Setting;
using CRM.Resources;
using Enum;
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
    private const byte colIndexDirectAccount = 6;
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

    public PicAssignmentExcel(string templatePath, short templateSheetIndex = 0, string sheetName = "Data") : base(templatePath, templateSheetIndex, sheetName)
    {
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
        var mergeCommonPIC = assignments.Where(x => MergePicGroupHeadlineIds.Exists(y => y == x.HeadlineID)).ToList();
        var excludeMergeCommonPIC = assignments.Except(mergeCommonPIC).ToList();
        var mergePICGroupByPicMappingAndHeadline = mergeCommonPIC
            .GroupBy(x => new { x.HeadlineID, x.PicForMapping, x.HeadlineName })
            .Select(y => new {
                y.Key.PicForMapping,
                PicList = y.Select(z => z.PicList).First(),
                mergePicAndHeadline = y.ToList()
            })
            .ToList();
        var mergePICByHeadlines = mergePICGroupByPicMappingAndHeadline.GroupBy(x => x.PicForMapping).Select(y => new {
            PicName = GetPicCell(y.Select(z => z.PicList).First()),
            GroupPicMapping = y.ToList()
        }).ToList();
        var mergePICByHeadlinesOrderBy = mergePICByHeadlines.OrderByDescending(x => x.GroupPicMapping.Count).ThenBy(y => y.PicName);
        int rowIndex = RowStartBody;
        int rowIndexMergePIC = RowStartBody;
        var colIndex = 1;
        var rowNum = 1;
        var mergeHeadlineForPic = 0;
        StyleDefault(worksheet);
        foreach (var groupPicMapping in mergePICByHeadlinesOrderBy.Select(x => x.GroupPicMapping))
        {
            var countMergePic = 0;
            foreach (var mergeHeadlineByPic in groupPicMapping.Select(x => x.mergePicAndHeadline).ToList())
            {
                countMergePic += mergeHeadlineByPic.Count;
            }
            var picMappingByMergeHealine = groupPicMapping.Select(x => x.PicList).First().ToList();
            var merPicCell = GetPicCell(picMappingByMergeHealine);
            StyleMergeCell(worksheet, rowIndex, colIndexMergePic, rowIndexMergePIC + countMergePic - 1);
            worksheet.Cells[rowIndex, colIndexMergePic].Value = merPicCell;
            rowIndexMergePIC = rowIndexMergePIC + countMergePic;
            var countCommIncludeMergeHeadline = 0;
            var commIncludeMergeHeadline = GetUniqueCommunicationToolsByPicModel(picMappingByMergeHealine).ToList();
            var mergePICByHeadlineOrderByCount = groupPicMapping.Select(x => x.mergePicAndHeadline).ToList();

            foreach (var mergeHeadlineByPic in mergePICByHeadlineOrderByCount)
            {
                foreach (var assignment in mergeHeadlineByPic)
                {
                    colIndex = 1;
#pragma warning disable S134 // Control flow statements "if", "switch", "for", "foreach", "while", "do"  and "try" should not be nested too deeply
                    if (mergeHeadlineForPic == 0)
#pragma warning restore S134 // Control flow statements "if", "switch", "for", "foreach", "while", "do"  and "try" should not be nested too deeply
                    {
                        mergeHeadlineForPic = assignments.Where(assign => assign.HeadlineID == assignment.HeadlineID).ToList().Count;
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
                    RenderStatusRow(templateWorksheet, worksheet, assignment.Status, colIndex, rowIndex);
                    worksheet.Cells[rowIndex, colIndex++].Value = assignment.DirectAccount;
                    worksheet.Cells[rowIndex, colIndex++].Value = assignment.Status;
                    worksheet.Cells[rowIndex, colIndex++].Value = assignment.Site;
                    worksheet.Cells[rowIndex, colIndex++].Value = assignment.Currency;
                    worksheet.Cells[rowIndex, colIndex].Value = assignment.Position;
                    RenderCommunicationToolMergeCommon(templateWorksheet, worksheet,
                        rowIndex, countCommIncludeMergeHeadline, commIncludeMergeHeadline);
                    countCommIncludeMergeHeadline++;
                    mergeHeadlineForPic--;
                    rowIndex++;
                }
            }
        }

        RenderBodyAssigment(templateWorksheet, worksheet, excludeMergeCommonPIC, rowIndex, rowNum);

        RenderDrawBorderCell(worksheet, rowIndex);
    }

    protected internal virtual void RenderStatusRow(ExcelWorksheet templateWorksheet,
        ExcelWorksheet worksheet,
        string Status,
        int colIndex,
        int rowIndex)
    {
        if (Status != CustomerStatus.Open.ToString())
        {
            var templateRowIndex = GetTemplateRowIndex(Status);
            templateWorksheet.Cells[templateRowIndex, colIndex, templateRowIndex, TotalColumns]
                .Copy(worksheet.Cells[rowIndex, colIndex, rowIndex, TotalColumns]);
        }
    }

    protected internal virtual void RenderCommunicationToolMergeCommon(ExcelWorksheet templateWorksheet,
        ExcelWorksheet worksheet,
        int rowIndex,
        int countCommIncludeMergeHeadline,
        IList<GroupAssignmentCommunication> commIncludeMergeHeadline)
    {
        if (countCommIncludeMergeHeadline < commIncludeMergeHeadline?.Count && isRenderPicManagement)
        {
            RenderCommunicationTools(templateWorksheet, worksheet, rowIndex, commIncludeMergeHeadline[countCommIncludeMergeHeadline]);
        }
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
                IsMergePIC = y.Key.Length > 0 && y.Count() > 1,
                PicForMappingJoin = y.Key,
                HeadlineID = y.Select(x => x.HeadlineID),
                PICAssignmentInfoGroup = y.ToList()
            })
            .OrderBy(y => y.IsMergePIC ? 0 : 1).ToList();

        var MergePicGroupHeadlineIds = groupbyPicForMappings.Where(x => x.IsMergePIC).Select(y => y.HeadlineID.ToList());
        var headlineIdMerges = new List<int>();
        foreach (var headlineId in MergePicGroupHeadlineIds)
        {
            headlineIdMerges.AddRange(headlineId);
        }
        return headlineIdMerges;
    }

    protected internal virtual IEnumerable<GroupHeadlineOfPic> GroupByMergePic(IEnumerable<PICAssignmentInfo> assignments)
    {
        var groupByCommonMergePic = assignments.GroupBy(a => a.HeadlineID,
            (key, g) => new GroupHeadlineOfPic
            {
                GroupHeadlineId = key,
                GroupHeadline = g.First().HeadlineName,
                HeadlineType = g.First().HeadlineType,
                DefaultPIC = g.First().DefaultPicList,
                Pics = g.GroupBy(p => p.PicForMapping, (_, pic) => new PicOfDirectAccount
                {
                    Pic = pic.First().PicList,
                    DirectAccounts = pic.Select(d => new DirectAccountInfo
                    {
                        DirectAccount = d.DirectAccount,
                        Status = d.Status,
                        Site = d.Site,
                        Currency = d.Currency,
                        Position = d.Position,
                    })
                })
            });
        return groupByCommonMergePic;
    }

#pragma warning disable S1541 // Methods and properties should not be too complex
#pragma warning disable S3776 // Cognitive Complexity of methods should not be too high
    protected internal virtual void RenderBodyAssigment(
#pragma warning restore S3776 // Cognitive Complexity of methods should not be too high
#pragma warning restore S1541 // Methods and properties should not be too complex
        ExcelWorksheet templateWorksheet,
        ExcelWorksheet worksheet,
        List<PICAssignmentInfo> excludeMergeCommonPIC,
        int rowIndex,
        int rowNum )
    {
        var groupByPic = GroupByMergePic(excludeMergeCommonPIC);
        foreach (var assignment in groupByPic)
        {
            var countExtraRowComm = 0;
            var maxGroupHeadline = 0;
            var colIndex = 1;
            var indexCommRender = 0;
            var comm = GetUniqueCommunicationTools(assignment?.Pics)?.ToList();
            var groupHeadlineTotalRow = assignment != null ? assignment.Pics.Sum(p => p.DirectAccounts.ToList().Count) : 0;
            maxGroupHeadline = groupHeadlineTotalRow;
            if (comm?.Count > groupHeadlineTotalRow)
            {
                maxGroupHeadline = comm.Count;
            }
            StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + maxGroupHeadline - 1);
            worksheet.Cells[rowIndex, colIndex++].Value = rowNum++;
            StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + maxGroupHeadline - 1);
            worksheet.Cells[rowIndex, colIndex++].Value = assignment?.GroupHeadline;
            StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + maxGroupHeadline - 1);
            worksheet.Cells[rowIndex, colIndex++].Value = assignment?.HeadlineType;
            StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + maxGroupHeadline - 1);
            worksheet.Cells[rowIndex, colIndex].Value = GetPicCell(assignment?.DefaultPIC);

            foreach (var pic in assignment?.Pics ?? [])
            {
                colIndex = colIndexMergePic;
                var mergePic = pic.DirectAccounts;
                var countMergePic = mergePic.ToList().Count;
                StyleMergeCell(worksheet, rowIndex, colIndex, rowIndex + countMergePic - 1);
                worksheet.Cells[rowIndex, colIndex].Value = GetPicCell(pic?.Pic);

                foreach (var direct in mergePic)
                {
                    colIndex = colIndexDirectAccount;
                    RenderStatusRow(templateWorksheet, worksheet, direct.Status, colIndex, rowIndex);
                    worksheet.Cells[rowIndex, colIndex++].Value = direct.DirectAccount;
                    worksheet.Cells[rowIndex, colIndex++].Value = direct.Status;
                    worksheet.Cells[rowIndex, colIndex++].Value = direct.Site;
                    worksheet.Cells[rowIndex, colIndex++].Value = direct.Currency;
                    worksheet.Cells[rowIndex, colIndex].Value = direct.Position;
#pragma warning disable S134 // Control flow statements "if", "switch", "for", "foreach", "while", "do"  and "try" should not be nested too deeply
                    if (indexCommRender < comm?.Count)
#pragma warning restore S134 // Control flow statements "if", "switch", "for", "foreach", "while", "do"  and "try" should not be nested too deeply
                    {
                        countExtraRowComm++;
                        RenderCommunicationTools(templateWorksheet, worksheet, rowIndex, comm[indexCommRender++]);
                    }
                    rowIndex++;
                }
            }
            if ((countExtraRowComm < maxGroupHeadline) && countExtraRowComm < comm?.Count)
            {
                var remainRow = maxGroupHeadline - countExtraRowComm;
                for (var com = 0; com < remainRow; com++)
                {
                    RenderCommunicationTools(templateWorksheet, worksheet, rowIndex++, comm[indexCommRender++]);
                }
            }
        }
        RenderDrawBorderCell(worksheet, rowIndex);
    }

    protected internal virtual void RenderDrawBorderCell(
        ExcelWorksheet worksheet,
        int rowIndex)
    {
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
        if (comm!= null && isRenderPicManagement)
        {
            var colIndexComm = StartComToolsIndex;
            worksheet.Cells[rowIndex, colIndexComm++].Value = comm.PicName.Length > 0 ? comm.PicName : "";
            foreach (var commRender in communicationTools)
            {
                var renderValueComm = comm.ListComm.Where(item => item.CommunicationTool == commRender.SettingValue).ToList();
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
                    splitPicModels.Exists(y => y == x.PicId))
                .ToList()
            : [];
    }

    protected internal virtual IEnumerable<GroupAssignmentCommunication> GetUniqueCommunicationTools(
        IEnumerable<PicOfDirectAccount> headlinePic)
    {
        if(!headlinePic.Any() || headlinePic == null)
        {
            return [];
        }
        var picIds = new List<string>();
        foreach (var pic in headlinePic.Select(x => x.Pic))
        {
            if (pic != null)
            {
                picIds.AddRange(pic?.Select(x=>x.PicName));
            }
        }
        var uniquePicMapping = picIds.Distinct();

        return uniquePicMapping.Any() ? groupAssignmentCommunications.Where(x =>
                    uniquePicMapping.Any(y => y == x.PicName))
                .ToList()
            : Enumerable.Empty<GroupAssignmentCommunication>();
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