namespace CRM.Services.Report.LogStatistics
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Report.LogStatistics;
    using CRM.Models;
    using CRM.Models.Report.LogStatistics;
    using CRM.Resources;

    public interface ILogStatisticsService
    {
        Task<LogStatisticsViewModel> GetReportDataAsync(LogStatisticsCriteria criteria);
    }
    public class LogStatisticsService : ILogStatisticsService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;

        public LogStatisticsService(IBaseService baseService, ICommonService commonService)
        {
            this.baseService = baseService;
            this.commonService = commonService;
        }

        public async Task<LogStatisticsViewModel> GetReportDataAsync(LogStatisticsCriteria criteria)
        {
            var reportTitle = string.Format(
                    ViewResources.LogStatisticsReport_Title,
                    GetLogStatisticSiteTypeName(criteria.SiteType),
                    commonService.ConvertToServerDateTime(criteria.FromDate).ToShortDateString(),
                    commonService.ConvertToServerDateTime(criteria.ToDate).ToShortDateString()
                );

            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertToServerDateTime(criteria.ToDate);
            var logStatisticEntities = await baseService.GetDataAsync<LogStatisticsEntity>(criteria);

            var logStatistic = new LogStatisticsViewModel
            {
                Name = reportTitle,
                CommunicationColumns = GetCommunicationColumns(logStatisticEntities),
                ProductColumns = GetProductColumns(logStatisticEntities)
            };

            int productLength = logStatistic.ProductColumns.ToList().Count;
            int communicationLength = logStatistic.CommunicationColumns.ToList().Count;

            logStatistic.MainCategories = GetMainCategories(logStatisticEntities, productLength, communicationLength);
            SumTotalCommunicationForMainCategory(logStatistic.MainCategories);

            return logStatistic;
        }

        private static string GetLogStatisticSiteTypeName(int siteType)
        {
            switch (siteType)
            {
                case LogStatisticConstants.IBC:
                    return "MBC";

                case LogStatisticConstants.Licensee:
                    return "Licensee";

                default:
                    return string.Empty;
            }
        }

        private List<BaseModel> GetCommunicationColumns(
            IEnumerable<LogStatisticsEntity> logStatisticEntities)
        {
            var communicatonToolGroup = logStatisticEntities.GroupBy(data => data.CommunicationId).ToList();

            return communicatonToolGroup.Select(item => new BaseModel
            {
                Id = item.Key,
                Name = item.First().Communication
            }).ToList();
        }

        private List<BaseModel> GetProductColumns(
            IEnumerable<LogStatisticsEntity> logStatisticEntities)
        {
            var productGroup = logStatisticEntities.GroupBy(data => data.ProductId).ToList();

            return productGroup.Select(item => new BaseModel
            {
                Id = item.Key,
                Name = item.First().Product
            }).ToList();
        }

        private IEnumerable<LogStatisticsMainCategory> GetMainCategories(
           IEnumerable<LogStatisticsEntity> logStatisticEntities, int productLength, int communicationLength)
        {
            var dataGroupByMainCategory = logStatisticEntities.GroupBy(data => data.MainCategoryId);

            return dataGroupByMainCategory.Select(reportData => new LogStatisticsMainCategory
            {
                Id = reportData.Key,
                Name = reportData.First().MainCategory,
                SubCategories = GetSubCategories(reportData),
                ListOfCommunicationSumByProduct = Enumerable.Repeat(0, productLength).ToList(),
                ListOfCommunicationCount = Enumerable.Repeat(0, productLength * communicationLength).ToList()
            }).ToList();
        }

        private IEnumerable<LogStatisticsBaseModel> GetSubCategories(
            IGrouping<int, LogStatisticsEntity> mainCategoryGroup)
        {
            var dataGroupBySubCategory = mainCategoryGroup.GroupBy(s => s.SubCategoryId);

            return dataGroupBySubCategory.Select(data => new LogStatisticsBaseModel
            {
                Id = data.Key,
                Name = data.First().SubCategory,
                ListOfCommunicationSumByProduct = GetSumOfCommunicationByProductForSubCategory(data),
                ListOfCommunicationCount = GetNumberOfCommunicationForSubCategory(data)
            }).ToList();
        }

        private List<int> GetSumOfCommunicationByProductForSubCategory(
            IGrouping<int, LogStatisticsEntity> subCategoryGroup)
        {
            var communicatonToolGroup = subCategoryGroup.GroupBy(data => data.ProductId).ToList();

            return communicatonToolGroup.Select(data => data.Sum(p => p.Total)).ToList();
        }

        private List<int> GetNumberOfCommunicationForSubCategory(
            IGrouping<int, LogStatisticsEntity> subCategoryGroup)
        {
            List<int> numberOfCommunication = new List<int>();

            var communicatonToolGroup = subCategoryGroup.GroupBy(data => data.ProductId).ToList();

            foreach (var data in communicatonToolGroup)
            {
                numberOfCommunication.AddRange(data.Select(p => p.Total));
            }

            return numberOfCommunication;
        }

        private void SumTotalCommunicationForMainCategory(IEnumerable<LogStatisticsMainCategory> mainCategories)
        {
            foreach (var mainCategory in mainCategories)
            {
                foreach (var subCategory in mainCategory.SubCategories)
                {
                    SumCommunicationCountForMainCategory(mainCategory, subCategory.ListOfCommunicationCount);
                    SumCommunicationCountByProductForMainCategory(mainCategory, subCategory.ListOfCommunicationSumByProduct);
                }
            }
        }

        private static void SumCommunicationCountForMainCategory(
            LogStatisticsBaseModel mainCategory, IEnumerable<int> numberOfCommunicationBySubCategory)
        {
            var totalNumBerOfCommunicationBySubCategory = numberOfCommunicationBySubCategory.ToList().Count;
            var listOfCommunicationCount = mainCategory.ListOfCommunicationCount.ToList();
            for (int i = 0; i < totalNumBerOfCommunicationBySubCategory; i++)
            {
                listOfCommunicationCount[i] += numberOfCommunicationBySubCategory.ElementAt(i);
            }

            mainCategory.ListOfCommunicationCount = listOfCommunicationCount;
        }

        private static void SumCommunicationCountByProductForMainCategory(
            LogStatisticsBaseModel mainCategory, IEnumerable<int> sumOfCommunicationBySubCategory)
        {
            var totalSumOfCommunicationBySubCategory = sumOfCommunicationBySubCategory.Count();
            var listOfCommunicationCount = mainCategory.ListOfCommunicationSumByProduct.ToList();
            for (int i = 0; i < totalSumOfCommunicationBySubCategory; i++)
            {
                listOfCommunicationCount[i] += sumOfCommunicationBySubCategory.ElementAt(i);
            }

            mainCategory.ListOfCommunicationSumByProduct = listOfCommunicationCount;
        }
    }
}
