namespace CRM.Services.UnitTests.ExportExcel.TestableClasses;

using System.Collections.Generic;
using CRM.Models.Feedback;
using CRM.Models.Setting;
using OfficeOpenXml;
using Services.ExportExcel;

public class LatestFeedbackExcelTestable(
    string templatePath,
    IEnumerable<FeedbackDetail> feedbacks,
    IEnumerable<Setting> mainCategories,
    int top,
    string username)
    : LatestFeedbackExcel(templatePath, feedbacks, mainCategories, top, username)
{
    public void Public_RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        base.RenderTitle(templateWorksheet, worksheet);
    }

    public void Public_RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        base.RenderHeader(templateWorksheet, worksheet);
    }

    public void Public_RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        base.RenderBody(templateWorksheet, worksheet);
    }

    public void Public_RenderRow(ExcelWorksheet worksheet, FeedbackDetail feedback, int index, int rowIndex)
    {
        base.RenderRow(worksheet, feedback, index, rowIndex);
    }

    public void Public_ProcessUI(ExcelWorksheet worksheet)
    {
        base.ProcessUI(worksheet);
    }
}