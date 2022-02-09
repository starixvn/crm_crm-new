namespace CRM.Services.ExportExcel
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Web;
    using CRM.Models.Report.LogStatistics;
    using CRM.Models.Setting;
    using OfficeOpenXml;
    using OfficeOpenXml.Style;

    public class LogStatisticsDetailExcel : ExcelBase
    {
        private const byte RowStartBody = 5;
        private const byte RowStartHeader = 4;
        private const byte TotalColumns = 23;

        private readonly StatisticsDetailReportByDateModel logStatisticsDetail;
        private readonly IEnumerable<Setting> mainCategories;
        private readonly IEnumerable<Setting> communicationTools;
        private readonly IEnumerable<Product> products;
        private readonly IEnumerable<Product> subProducts;
        private readonly IEnumerable<SettingRelation> extensions;
           
        public LogStatisticsDetailExcel(
            string templatePath, StatisticsDetailReportByDateModel logStatisticsDetail,
            IEnumerable<Setting> mainCategories, IEnumerable<Setting> communicationTools,
            IEnumerable<Product> products, IEnumerable<Product> subProducts,
            IEnumerable<SettingRelation> extensions
            ) : base(templatePath, 0, logStatisticsDetail.Id == 0 ? "MBC_Detail" : "Licensee_Detail")
        {
            this.logStatisticsDetail = logStatisticsDetail;
            this.mainCategories = mainCategories;
            this.communicationTools = communicationTools;
            this.products = products;
            this.subProducts = subProducts;
            this.extensions = extensions;
        }

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
            for (var index = 0; index < childReport.Count; index++)
            {
                var data = childReport[index];
                var rowIndex = RowStartBody + index;
                RenderRowValue(worksheet, data, rowIndex);
            }
        }

        protected internal override void ProcessUI(ExcelWorksheet worksheet)
        {
            SetStyle(worksheet);
            SetWidthColumn(worksheet);
        }

        protected internal virtual void SetStyle(ExcelWorksheet worksheet)
        {
            StyleDefault(worksheet);
            worksheet.Column(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        }

        protected internal virtual void SetWidthColumn(ExcelWorksheet worksheet)
        {
            const int WidthSmall = 15;
            const int WidthLarge = 35;
            const int WidthExtraLarge = 45;
            const int ColumnCustomer = 5;
            const int ColumnContactInfo = 10;
            const int ColumnCategory = 14;
            const int ColumnSubCategory = 15;
            const int ColumnComplaints = 16;
            const int ColumnSolution = 17;
            const int ColumnExt = 8;
            const int ColumnInquiries = 18;

            worksheet.DefaultColWidth = WidthSmall;
            worksheet.Cells.AutoFitColumns();
            worksheet.Column(ColumnCustomer).Width = WidthLarge;
            worksheet.Column(ColumnContactInfo).Width = WidthLarge;
            worksheet.Column(ColumnCategory).Width = WidthLarge;
            worksheet.Column(ColumnSubCategory).Width = WidthLarge;
            worksheet.Column(ColumnComplaints).Width = WidthExtraLarge;
            worksheet.Column(ColumnSolution).Width = WidthExtraLarge;
            var logStatisticLength = logStatisticsDetail.ChildReports.ToList().Count;
            if(logStatisticLength > 0)
            {
                var totalRows = RowStartBody + logStatisticLength - 1;
                worksheet.Cells[RowStartBody, 1, totalRows, ColumnExt].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                worksheet.Cells[RowStartBody, ColumnInquiries, totalRows, TotalColumns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                DrawBorderCell(worksheet.Cells[RowStartBody, 1, totalRows, TotalColumns]);
            }
        }

        protected internal virtual void RenderRowValue(ExcelWorksheet worksheet,
            StatisticsDetailbyDateModel data, int rowIndex
            )
        {
            var communicationValue = GetCommunicationValue(data.CommunicationID);
            var mainCategoryValue = GetMainCategoryValue(data.CategoryID);
            var subCategoryValue = GetSubCategoryValue(data.CategoryID, data.SubCategoryID);
            var extensionValue = GetExtentionValue(data.StationID);
            var productValue = GetProductValue(products, data.ProductID);
            var subproductValue = GetProductValue(subProducts ,data.SubProductID);

            var colIndex = 1;
            worksheet.Cells[rowIndex, colIndex++].Value = data.FeedbackDate.ToString("MMM dd, yyyy");
            worksheet.Cells[rowIndex, colIndex++].Value = data.StartTime;
            worksheet.Cells[rowIndex, colIndex++].Value = data.EndTime;
            worksheet.Cells[rowIndex, colIndex++].Value = data.DurationTime;
            worksheet.Cells[rowIndex, colIndex++].Value = data.UserName;
            worksheet.Cells[rowIndex, colIndex++].Value = data.SiteName;
            worksheet.Cells[rowIndex, colIndex++].Value = communicationValue;
            worksheet.Cells[rowIndex, colIndex++].Value = extensionValue;
            worksheet.Cells[rowIndex, colIndex++].Value = data.Role;
            worksheet.Cells[rowIndex, colIndex++].Value = RemoveHtmlTags(data.Contact);
            worksheet.Cells[rowIndex, colIndex++].Value = productValue;
            worksheet.Cells[rowIndex, colIndex++].Value = subproductValue;
            worksheet.Cells[rowIndex, colIndex++].Value = data.CountryName;
            worksheet.Cells[rowIndex, colIndex++].Value = mainCategoryValue;
            worksheet.Cells[rowIndex, colIndex++].Value = subCategoryValue;
            worksheet.Cells[rowIndex, colIndex++].Value = RemoveHtmlTags(data.RemarkText);
            worksheet.Cells[rowIndex, colIndex++].Value = RemoveHtmlTags(data.Solution);
            worksheet.Cells[rowIndex, colIndex++].Value = data.NoInquiries;
            worksheet.Cells[rowIndex, colIndex++].Value = data.Status;
            worksheet.Cells[rowIndex, colIndex++].Value = data.Language;
            worksheet.Cells[rowIndex, colIndex++].Value = data.Response;
            worksheet.Cells[rowIndex, colIndex++].Value = data.CreatorName;
            worksheet.Cells[rowIndex, colIndex].Value = data.CreateDate.ToString("MMM dd, yyyy");
        }

        private string GetCommunicationValue(int id)
        {
            var activeSetting = communicationTools.Where(x => x.Id == id && x.IsActive);
            return activeSetting.Any() ? activeSetting.FirstOrDefault().Name : "N/A";
        }

        private string GetExtentionValue(int id)
        {
            var activeSetting = extensions.Where(x => x.Id == id && x.IsActive);
            return activeSetting.Any() ? activeSetting.FirstOrDefault().Value : "N/A";
        }

        private string GetMainCategoryValue(int id)
        {
            var activeSetting = mainCategories.Where(x => x.MainCategoryID == id && x.IsActive);
            return activeSetting.Any() ? activeSetting.FirstOrDefault().Name : "N/A";
        }

        private string GetSubCategoryValue(int mainCategoryId, int subCategoryId)
        {
            var mainCategory = mainCategories.FirstOrDefault(c => c.MainCategoryID == mainCategoryId);
            var child = mainCategory?.ChildSettings.FirstOrDefault(c => c.SubCategoryId == subCategoryId);
            return child == null ? string.Empty : child.Name;
        }

        private static string GetProductValue(IEnumerable<Product> settings, int id)
        {
            var activeSetting = settings.Where(x => x.Id == id && x.IsActive);
            return activeSetting.Any() ? activeSetting.FirstOrDefault().Value : "N/A";
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
}
