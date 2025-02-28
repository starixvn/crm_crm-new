namespace CRM.Services.Report.CategoriesSummaryReport;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.CategoriesSummaryReport;
using CRM.Models.Common;
using CRM.Models.Report.CategoriesSummaryReport;
using CRM.Resources;
using Interfaces;

public interface ISummaryReportService
{
    Task<SummaryReportModel> GetSummaryReportAsync(GetSummaryReportCriteria criteria);

    Task<AllSetting> AllSettings();
}

public class SummaryReportService(
    IBaseService baseService,
    ISettingService settingService,
    IPermissionService permissionService)
    : ISummaryReportService
{
    public async Task<SummaryReportModel> GetSummaryReportAsync(GetSummaryReportCriteria criteria)
    {
        if (!criteria.IsValid())
        {
            return new SummaryReportModel();
        }

        IList<CategorySummary> categorySummaries = new List<CategorySummary>();
        var categoryIds = criteria.Categories.Split([','], StringSplitOptions.RemoveEmptyEntries)
            .Select(c => int.Parse(c))
            .ToArray();

        var rawData = await baseService.GetDataAsync<SummaryRawData>(criteria);
        IEnumerable<SummaryRawData> dataList = rawData.Where(c => categoryIds.Contains(c.MainCategoryId)).ToList();

        var monthData = dataList.OrderBy(s => s.M).Select(s => s.Month.ToUpper(CultureInfo.InvariantCulture)).Distinct().ToList();
        var grandTotal = InitializeSummaries(monthData);
        var mainCategoryGroup = dataList.GroupBy(s => (MainCategoryId: s.MainCategoryId, MainCategory: s.MainCategory));

        MappingDataSummaryReport(mainCategoryGroup, monthData, categorySummaries, grandTotal);

        return new SummaryReportModel
        {
            ReportTitle = string.Format(ViewResources.SummaryReport_Title, criteria.Year),
            CategorySummaries = categorySummaries,
            GrandTotals = grandTotal.Values.ToList(),
            Months = monthData
        };
    }

    private void MappingDataSummaryReport(
        IEnumerable<IGrouping<(int MainCategoryId, string MainCategory),
            SummaryRawData>> mainCategoryGroup, List<string> monthData,
        IList<CategorySummary> categorySummaries, IDictionary<string,
            Summary> grandTotal
    )
    {
        foreach (var mainKey in mainCategoryGroup)
        {
            var categoryTotal = InitializeSummaries(monthData);
            IList<CategorySummary> subCategorySummaries = new List<CategorySummary>();
            var category = new CategorySummary
            {
                Id = mainKey.Key.MainCategoryId,
                Name = mainKey.Key.MainCategory,
                SubCategories = subCategorySummaries
            };

            var subCategoryGroup = mainKey.GroupBy(s => (SubCategoryId: s.SubCategoryId, SubCategory: s.SubCategory));

            MappingDataSubcategory(categoryTotal, grandTotal, subCategorySummaries, monthData, subCategoryGroup);

            category.Summaries = categoryTotal.Values.ToList();
            categorySummaries.Add(category);
        }
    }

    private void MappingDataSubcategory(
        IDictionary<string, Summary> categoryTotal,
        IDictionary<string, Summary> grandTotal,
        IList<CategorySummary> subCategorySummaries,
        List<string> monthData,
        IEnumerable<IGrouping<(int SubCategoryId, string SubCategory), SummaryRawData>> subCategoryGroup)
    {
        foreach (var subKey in subCategoryGroup)
        {
            var summaryHash = InitializeSummaries(monthData);
            var subCategory = new CategorySummary
            {
                Id = subKey.Key.SubCategoryId,
                Name = subKey.Key.SubCategory
            };

            CalculateDataSubcategory(categoryTotal, grandTotal, subCategorySummaries, subKey, summaryHash, subCategory);
        }
    }

    private static void CalculateDataSubcategory(
        IDictionary<string, Summary> categoryTotal,
        IDictionary<string, Summary> grandTotal,
        IList<CategorySummary> subCategorySummaries,
        IGrouping<(int SubCategoryId, string SubCategory),
            SummaryRawData> subKey, IDictionary<string, Summary> summaryHash,
        CategorySummary subCategory)
    {
        foreach (var summary in subKey)
        {
            var month = summary.Month.ToUpper(CultureInfo.InvariantCulture);
            var numberOfIssues = summary.NoOfIssues;
            summaryHash[month].Amount = numberOfIssues;

            categoryTotal[month].Amount += numberOfIssues;

            grandTotal[month].Amount += numberOfIssues;
        }

        subCategory.Summaries = summaryHash.Values.ToList();
        subCategorySummaries.Add(subCategory);
    }

    private IDictionary<string, Summary> InitializeSummaries(IList<string> months)
    {
        IDictionary<string, Summary> summaries = new Dictionary<string, Summary>();
        foreach (var item in months)
        {
            summaries.Add(item, new Summary { Month = item, Amount = 0 });
        }
        return summaries;
    }

    public async Task<AllSetting> AllSettings()
    {
        var minReportDate = Convert.ToInt32(ViewResources.MinReportDate);
        var currentYear = DateTimeOffset.Now.DateTime.Year;
        var yearRange = new List<Setting>();
        for (var i = minReportDate; i <= currentYear; i++)
        {
            yearRange.Add(new Setting { Id = i, Value = i.ToString() });
        }
        var isHasPermissionOnCredit = await permissionService.IsHavingPermissionAsync(FunctionKey.Credit);
        var isHasPermissionOnLicensee = await permissionService.IsHavingPermissionAsync(FunctionKey.Licensee);
        var siteTypes = new List<Setting>();

        if (isHasPermissionOnCredit || isHasPermissionOnLicensee)
        {
            siteTypes.Add(new() { Id = SiteConstants.All, Name = ViewResources.All });
            siteTypes.Add(new() { Id = SiteConstants.NA, Name = ViewResources.Symbol_NotApply });
        }
        if (isHasPermissionOnCredit)
        {
            siteTypes.Add(new() { Id = SiteConstants.IBCGroup, Name = ViewResources.Credit });
        }
        if (isHasPermissionOnLicensee)
        {
            siteTypes.Add(new() { Id = SiteConstants.LicenseeGroup, Name = ViewResources.Licensee });
        }

        var categories = await settingService.GetMainCategoryAsync(SettingConstants.Active);
        return new AllSetting
        {
            YearRange = yearRange,
            SiteTypes = siteTypes,
            Categories = categories
        };
    }
}