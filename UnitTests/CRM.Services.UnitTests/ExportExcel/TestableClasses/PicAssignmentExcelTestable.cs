namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using System.Collections.Generic;
using CRM.Models.PicAndHeadline;
using CRM.Models.Setting;
using OfficeOpenXml;
using Services.ExportExcel;

public class PicAssignmentExcelTestable(
    string templatePath,
    IEnumerable<PICAssignmentInfo> assignments,
    IEnumerable<GroupAssignmentCommunication> groupAssignmentCommunications,
    IEnumerable<Setting> communicationTools,
    bool isRenderPicManagement)
    : PicAssignmentExcel(templatePath, assignments, groupAssignmentCommunications, communicationTools,
        isRenderPicManagement)
{
    public void Public_RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        base.RenderTitle(templateWorksheet, worksheet);
    }

    public void Public_RenderHeader(ExcelWorksheet template, ExcelWorksheet worksheet)
    {
        base.RenderHeader(template, worksheet);
    }

    public void Public_RenderBody(ExcelWorksheet template, ExcelWorksheet worksheet)
    {
        base.RenderBody(template, worksheet);
    }

    public void Public_RenderStatusRow(ExcelWorksheet templateWorksheet,
        ExcelWorksheet worksheet,
        string Status,
        int colIndex,
        int rowIndex)
    {
        base.RenderStatusRow(templateWorksheet, worksheet, Status, colIndex, rowIndex);
    }

    public void Public_RenderCommunicationToolMergeCommon(ExcelWorksheet templateWorksheet,
        ExcelWorksheet worksheet,
        int rowIndex,
        int countCommIncludeMergeHeadline,
        IList<GroupAssignmentCommunication> commIncludeMergeHeadline)
    {
        base.RenderCommunicationToolMergeCommon(templateWorksheet, worksheet, rowIndex, countCommIncludeMergeHeadline, commIncludeMergeHeadline);
    }

    public List<int> Public_GetIdMergePic(IEnumerable<PICAssignmentInfo> assignments)
    {
        return base.GetIdMergePic(assignments);
    }

    public IEnumerable<GroupHeadlineOfPic> Public_GroupByMergePic(IEnumerable<PICAssignmentInfo> assignments)
    {
        return base.GroupByMergePic(assignments);
    }

    public void  Public_RenderBodyAssigment(
        ExcelWorksheet templateWorksheet,
        ExcelWorksheet worksheet,
        List<PICAssignmentInfo> excludeMergeCommonPIC,
        int colIndex,
        int rowIndex,
        int rowNum)
    {
        base.RenderBodyAssigment(templateWorksheet, worksheet, excludeMergeCommonPIC, rowIndex, rowNum);
    }

    public void Public_RenderCommunicationTools(
        ExcelWorksheet templateWorksheet,
        ExcelWorksheet worksheet,
        int rowIndex,
        GroupAssignmentCommunication comm
    )
    {
        base.RenderCommunicationTools(templateWorksheet, worksheet, rowIndex, comm);
    }

    public IList<GroupAssignmentCommunication> Public_GetUniqueCommunicationToolsByPicModel(
        IList<PicModel> picModels)
    {
        return base.GetUniqueCommunicationToolsByPicModel(picModels);
    }

    public IEnumerable<GroupAssignmentCommunication> Public_GetUniqueCommunicationTools(
        IEnumerable<PicOfDirectAccount> headlinePic)
    {
        return base.GetUniqueCommunicationTools(headlinePic);
    }

    public void Public_ProcessUI(ExcelWorksheet worksheet)
    {
        base.ProcessUI(worksheet);
    }

    public void Public_SetStyle(ExcelWorksheet worksheet)
    {
        base.SetStyle(worksheet);
    }
    public byte Public_GetTemplateRowIndex(string status)
    {
        return base.GetTemplateRowIndex(status);
    }

    public void Public_StyleMergeCell(ExcelWorksheet worksheet, int startRow, int colIndex, int endRow)
    {
        base.StyleMergeCell(worksheet, startRow, colIndex, endRow);
    }

    public string Public_GetPicCell(IEnumerable<PicModel> picList)
    {
        return base.GetPicCell(picList);
    }
}