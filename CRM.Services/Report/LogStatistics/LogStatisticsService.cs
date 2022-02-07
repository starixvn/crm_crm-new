namespace CRM.Services.Report.LogStatistics
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Report.LogStatistics;
    using CRM.Models;
    using CRM.Models.Report.LogStatistics;
    using CRM.Resources;

    public interface ILogStatisticsService
    {
        Task<LogStatisticsViewModel> GetReportDataAsync(LogStatisticsCriteria criteria);
        Task<IEnumerable<StatisticsDetailbyDateModel>> GetReportDetailsAsync(LogStatisticsDetailCriteria criteria);
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
            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertToServerDateTime(criteria.ToDate);
            var reportTitle = string.Format(
               ViewResources.LogStatistics_ExcelTitle,
               GetLogStatisticSiteTypeName(criteria.SiteType, false),
               criteria.FromDate.ToShortDateFormat(),
               criteria.ToDate.ToShortDateFormat());

            var excelFileName = string.Format(
               ViewResources.LogStatistics_ExcelFileName,
               GetLogStatisticSiteTypeName(criteria.SiteType, true),
               criteria.FromDate.ToShortDateFormat(),
               criteria.ToDate.ToShortDateFormat());
            var logStatisticEntities = await baseService.GetDataAsync<LogStatisticsEntity>(criteria);

            var logStatistic = new LogStatisticsViewModel
            {
                Name = reportTitle,
                ExcelFileName = excelFileName,
                CommunicationColumns = GetCommunicationColumns(logStatisticEntities),
                ProductColumns = GetProductColumns(logStatisticEntities)
            };

            int productLength = logStatistic.ProductColumns.ToList().Count;
            int communicationLength = logStatistic.CommunicationColumns.ToList().Count;

            logStatistic.MainCategories = GetMainCategories(logStatisticEntities, productLength, communicationLength);
            SumTotalCommunicationForMainCategory(logStatistic.MainCategories);

            return logStatistic;
        }

        public async Task<IEnumerable<StatisticsDetailbyDateModel>> GetReportDetailsAsync(LogStatisticsDetailCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertToServerDateTime(criteria.ToDate);
            var reportDetails = await baseService.GetDataAsync<StatisticsDetailbyDateModel>(criteria);
            foreach(var report in reportDetails)
            {
                report.FeedbackDate = commonService.ConvertToClientDateTime(report.FeedbackDate);
                report.ResolutionDate = commonService.ConvertToClientDateTime(report.ResolutionDate);
                report.CreateDate = commonService.ConvertToClientDateTime(report.CreateDate);
            }
            return reportDetails;
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

        private string GetLogStatisticSiteTypeName(short siteType, bool isFileName)
        {
            if (isFileName)
            {
                switch (siteType)
                {
                    case LogStatisticConstants.IBC:
                        return ViewResources.MBCDailyLogStatisticsFileName;

                    case LogStatisticConstants.Licensee:
                        return ViewResources.LicenseeDailyLogStatisticsFileName;

                    default:
                        return string.Empty;
                }
            }
            else
            {
                switch (siteType)
                {
                    case LogStatisticConstants.IBC:
                        return ViewResources.MBCDailyLogStatistics;

                    case LogStatisticConstants.Licensee:
                        return ViewResources.LicenseeDailyLogStatistics;

                    default:
                        return string.Empty;
                }
            }
        }
    }
}
