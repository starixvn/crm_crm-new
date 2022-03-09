using CRM.Core.Services;
using CRM.Criteria.Report.CategoriesSummaryReport;
using CRM.Models;
using CRM.Models.Report.CategoriesSummaryReport;
using CRM.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Services.Report.CategoriesSummaryReport
{
    public interface ISummaryReportService
    {
        Task<SummaryReportModel> GetSummaryReportAsync(GetSummaryReportCriteria criteria);

    }
    public class SummaryReportService : ISummaryReportService
    {
        private readonly IBaseService baseService;
        public SummaryReportService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<SummaryReportModel> GetSummaryReportAsync(GetSummaryReportCriteria criteria)
        {
            if (string.IsNullOrWhiteSpace(criteria.Categories))
            {
                return new SummaryReportModel();
            }

            string month;
            int numberOfIssues;
            IList<CategorySummary> subCategorySummaries;
            CategorySummary category, subCategory;
            IList<CategorySummary> categorySummaries = new List<CategorySummary>();

            // Filter.
            int[] categoryIds = criteria.Categories.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
            .Select(c => int.Parse(c))
            .ToArray();

            var rawData = await baseService.GetDataAsync<SummaryRawData>(criteria);

            var dataList = rawData
               .Select(c => categoryIds.Contains(c.MainCategoryId))
               .ToList();
            // Get Month.
            var monthData = rawData.OrderBy(s => s.M).Select(s => s.Month.ToUpper()).Distinct().ToList();

            IDictionary<string, Summary> categoryTotal, summaryHash;
            IDictionary<string, Summary> grandTotal = InitializeSummaries(monthData);

            // Group by MainCategory.
            var mainCategoryGroup = rawData.GroupBy(s => new { MainCategoryId = s.MainCategoryId, MainCategory = s.MainCategory });
            foreach (var mainKey in mainCategoryGroup)
            {
                categoryTotal = InitializeSummaries(monthData);
                subCategorySummaries = new List<CategorySummary>();
                category = new CategorySummary
                {
                    Id = mainKey.Key.MainCategoryId,
                    Name = mainKey.Key.MainCategory,
                    SubCategories = subCategorySummaries
                };

                // Group by SubCategory.
                var subCategoryGroup = mainKey.GroupBy(s => new { SubCategoryId = s.SubCategoryId, SubCategory = s.SubCategory });
                foreach (var subKey in subCategoryGroup)
                {
                    summaryHash = InitializeSummaries(monthData);
                    subCategory = new CategorySummary
                    {
                        Id = subKey.Key.SubCategoryId,
                        Name = subKey.Key.SubCategory
                    };

                    foreach (var summary in subKey)
                    {
                        month = summary.Month.ToUpper();
                        numberOfIssues = summary.NoOfIssues;
                        summaryHash[month].Amount = numberOfIssues;

                        // Total of Category.
                        categoryTotal[month].Amount += numberOfIssues;

                        // Grand Total.
                        grandTotal[month].Amount += numberOfIssues;
                    }

                    subCategory.Summaries = summaryHash.Values.ToList();
                    subCategorySummaries.Add(subCategory);
                }

                category.Summaries = categoryTotal.Values.ToList();
                categorySummaries.Add(category);
            }

            return new SummaryReportModel
            {
                CategorySummaries = categorySummaries,
                GrandTotals = grandTotal.Values.ToList(),
                Months = monthData
            };
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

    }
}
