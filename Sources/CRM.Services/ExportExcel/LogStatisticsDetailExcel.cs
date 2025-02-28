namespace CRM.Services.ExportExcel;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using CRM.Models.Report.LogStatistics;
using CRM.Models.Setting;
using OfficeOpenXml;

public class LogStatisticsDetailExcel(
    string templatePath,
    StatisticsDetailReportByDateModel logStatisticsDetail,
    IEnumerable<Setting> mainCategories,
    IEnumerable<Setting> communicationTools,
    IEnumerable<Product> products,
    IEnumerable<Product> subProducts,
    IEnumerable<SettingRelation> extensions,
    bool perReadHeadlineInfo)
    : ExcelBase(templatePath, 0, logStatisticsDetail.Id == 0 ? "Credit_Detail" : "Licensee_Detail")
{
    private const byte RowStartBody = 5;
    private const byte RowStartHeader = 4;
        private const byte TotalColumns = 26;

    protected internal override void RenderTitle(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]
            .Copy(worksheet.Cells[1, 1, RowStartHeader - 1, TotalColumns]);
        worksheet.Cells[1, 1].Value = logStatisticsDetail.Name;
    }

    protected internal override void RenderHeader(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        templateWorksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]
            .Copy(worksheet.Cells[RowStartHeader, 1, RowStartHeader, TotalColumns]);
    }

    protected internal override void RenderBody(ExcelWorksheet templateWorksheet, ExcelWorksheet worksheet)
    {
        var childReport = logStatisticsDetail.ChildReports.ToList();
        var childReportOjb = childReport.Select((data, index) =>
        {
            templateWorksheet.Cells[RowStartBody, 1, RowStartBody, TotalColumns]
                .Copy(worksheet.Cells[RowStartBody + index, 1, RowStartBody + index, TotalColumns]);

            var communicationValue = GetCommunicationValue(data.CommunicationID);
            var mainCategoryValue = GetMainCategoryValue(data.CategoryID);
            var subCategoryValue = GetSubCategoryValue(data.CategoryID, data.SubCategoryID);
            var extensionValue = GetExtentionValue(data.StationID);
            var productValue = GetProductValue(products, data.ProductID);
            var subproductValue = GetProductValue(subProducts, data.SubProductID);

            return new object[] {
                data.FeedbackDate.ToString("MMM dd, yyyy"), data.StartTime, data.EndTime,
                    data.DurationTime, data.FirstResponseFormatTime, data.DurationFirstTime, data.UserName,
                    data.SiteName, communicationValue, extensionValue, data.Role,
                    RemoveHtmlTags(data.IsNewFeedback  ? CheckPerNewHeadlineContact(data) : data.Contact), productValue == "N/A." ? "N/A" : productValue,
                subproductValue == "N/A." ? "N/A" : subproductValue, data.CountryName,
                mainCategoryValue, subCategoryValue, RemoveHtmlTags(data.RemarkText),
                RemoveHtmlTags(data.Solution), data.NoInquiries, data.Rating , data.Status,
                data.Language, data.Response, data.CreatorName, data.CreateDate.ToString("MMMM dd, yyyy hh:mm:ss tt")
            };
        });
        worksheet.Cells[RowStartBody, 1, RowStartBody, TotalColumns].LoadFromArrays(childReportOjb);
    }

    private string CheckPerNewHeadlineContact(StatisticsDetailbyDateModel data) =>
        (perReadHeadlineInfo || !data.IsHeadline) ? data.NewContact : string.Empty;

    protected internal override void ProcessUI(ExcelWorksheet worksheet)
    {
        SetWidthColumn(worksheet);
    }

    protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
    {
        const int WidthSmall = 15;
            const int WidthNormalSmall = 18;
        const int WidthNormal = 25;
        const int WidthLarge = 35;
        const int WidthExtraLarge = 45;
            const int ColumnFirstResponse = 5;
            const int ColumnCustomer = 7;
            const int ColumnContactInfo = 12;
            const int ColumnCategory = 16;
            const int ColumnSubCategory = 17;
            const int ColumnComplaints = 18;
            const int ColumnSolution = 19;
            const int ColumnCreatedTime = 26;

        worksheet.DefaultColWidth = WidthSmall;
        worksheet.Column(ColumnCustomer).Width = WidthLarge;
        worksheet.Column(ColumnContactInfo).Width = WidthLarge;
        worksheet.Column(ColumnCategory).Width = WidthLarge;
        worksheet.Column(ColumnSubCategory).Width = WidthLarge;
        worksheet.Column(ColumnComplaints).Width = WidthExtraLarge;
        worksheet.Column(ColumnSolution).Width = WidthExtraLarge;
        worksheet.Column(ColumnCreatedTime).Width = WidthNormal;
            worksheet.Column(ColumnFirstResponse).Width = WidthNormalSmall;
    }

    private string GetCommunicationValue(int id)
    {
        var activeSetting = communicationTools.FirstOrDefault(x => x.Id == id && x.IsActive);
        return activeSetting?.Name ?? string.Empty;
    }

    private string GetExtentionValue(int id)
    {
        var activeSetting = extensions.FirstOrDefault(x => x.Id == id && x.IsActive);
        return activeSetting?.Value ?? string.Empty;
    }

    private string GetMainCategoryValue(int id)
    {
        var activeSetting = mainCategories.FirstOrDefault(x => x.MainCategoryID == id && x.IsActive);
        return activeSetting?.Name ?? string.Empty;
    }

    private string GetSubCategoryValue(int mainCategoryId, int subCategoryId)
    {
        var mainCategory = mainCategories.FirstOrDefault(c => c.MainCategoryID == mainCategoryId);
        var child = mainCategory?.ChildSettings.Find(c => c.SubCategoryId == subCategoryId);
        return child?.Name ?? string.Empty;
    }

    private static string GetProductValue(IEnumerable<Product> settings, int id)
    {
        var activeSetting = settings.FirstOrDefault(x => x.Id == id && x.IsActive);
        return activeSetting?.Value ?? string.Empty;
    }

    private static string RemoveHtmlTags(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return string.Empty;
        }

        var result = HttpUtility.HtmlDecode(value);
        var strBuilder = new StringBuilder(result);
        var toReplace = new[] {"<div><br></div>", "<br>", "<div>", "<p>", "<h1>", "<h2>", "<h3>", "<h4>", "<h5>",
            "<h6>", "<li>", "<br/>", "</p>", "</h1>", "</h2>", "</h3>", "</h4>", "</h5>", "</h6>"};
        foreach (var str in toReplace)
        {
            strBuilder.Replace(str, "\n");
        }
        result = Regex.Replace(strBuilder.ToString(), "<[^<>]+>", string.Empty);
        return result;
    }
}