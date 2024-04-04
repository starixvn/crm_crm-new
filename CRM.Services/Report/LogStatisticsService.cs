namespace CRM.Services.Report
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Report.LogStatistics;
    using CRM.Models;
    using CRM.Models.Feedback.LatestFeedback;
    using CRM.Models.Report.LogStatistics;
    using CRM.Resources;

    public interface ILogStatisticsService
    {
        Task<LogStatisticsViewModel> GetReportDataAsync(LogStatisticsCriteria criteria);

        Task<StatisticsDetailReportByDateModel> GetReportDetailsAsync(LogStatisticsDetailCriteria criteria);
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
               ViewResources.LogStatistics_ExcelTitle,
               GetLogStatisticSiteTypeName(criteria.SiteType, false),
               commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
               commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat());

            var excelFileName = string.Format(
               ViewResources.LogStatistics_ExcelFileName,
               GetLogStatisticSiteTypeName(criteria.SiteType, true),
               commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormatDash(),
               commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormatDash());

            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
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

        public async Task<StatisticsDetailReportByDateModel> GetReportDetailsAsync(LogStatisticsDetailCriteria criteria)
        {
            var reportTitle = string.Format(
               ViewResources.LogStatistics_Detail_ExcelTitle,
               GetLogStatisticDetailSiteTypeName(criteria.SiteType, false),
               commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
               commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat());

            var excelFileName = string.Format(
               ViewResources.LogStatistics_Detail_ExcelFileName,
               GetLogStatisticDetailSiteTypeName(criteria.SiteType, true),
               commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormatDash(),
               commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormatDash());

            criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var (reportDetails, communicationTools) = 
                await baseService.FetchMultipleAsync<StatisticsDetailbyDateModel, LatestFeedbackCommunicationTool>(criteria);
            foreach (var report in reportDetails)
            {
                report.FeedbackDate = commonService.ConvertToClientDateTime(report.FeedbackDate);
                report.ResolutionDate = commonService.ConvertToClientDateTime(report.ResolutionDate);
                report.CreateDate = commonService.ConvertToClientDateTime(report.CreateDate);
                report.NewContact = GetNewFeedbackCommunicationTool(communicationTools, report.FeedbackID);
                report.IsHeadline = communicationTools.FirstOrDefault(x => x.FeedbackID.Equals(report.FeedbackID))?.isHeadline ?? false;
            }
            var result = new StatisticsDetailReportByDateModel
            {
                Id = criteria.SiteType,
                Name = reportTitle,
                ExcelFileName = excelFileName,
                ChildReports = reportDetails,
                CommunicationTools = communicationTools
            };
            return result;
        }

        private static string GetNewFeedbackCommunicationTool(IEnumerable<LatestFeedbackCommunicationTool> communicationTools, int feedbackID)
        {
            var contactInfo = new StringBuilder();
            foreach (var communicationTool in from communicationTool in communicationTools
                                              where communicationTool.FeedbackID.Equals(feedbackID)
                                              select communicationTool)
            {
                if (!contactInfo.ToString().Contains(communicationTool.PicInfo))
                {
                    var picInfo = !contactInfo.Length.Equals(0) ? 
                        $"<br/>{communicationTool.PicInfo}:" : $"{communicationTool.PicInfo}:";
                    contactInfo.Append(picInfo);
                }

                contactInfo.Append($"<br/>{communicationTool.CommunicationName}: {communicationTool.CommunicationValue}");
            }

            return contactInfo.ToString();
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

        private List<BaseModel> GetProductColumns(IEnumerable<LogStatisticsEntity> logStatisticEntities)
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

        private static List<int> GetSumOfCommunicationByProductForSubCategory(
            IGrouping<int, LogStatisticsEntity> subCategoryGroup)
        {
            var communicatonToolGroup = subCategoryGroup.GroupBy(data => data.ProductId).ToList();

            return communicatonToolGroup.Select(data => data.Sum(p => p.Total)).ToList();
        }

        private static List<int> GetNumberOfCommunicationForSubCategory(
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

        private static void SumTotalCommunicationForMainCategory(IEnumerable<LogStatisticsMainCategory> mainCategories)
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

        private static string GetLogStatisticSiteTypeName(short siteType, bool isFileName)
        {
            if (isFileName)
            {
                switch (siteType)
                {
                    case LogStatisticConstants.IBC:
                        return ViewResources.CreditDailyLogStatisticsFileName;

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
                        return ViewResources.CreditDailyLogStatistics;

                    case LogStatisticConstants.Licensee:
                        return ViewResources.LicenseeDailyLogStatistics;

                    default:
                        return string.Empty;
                }
            }
        }

        private static string GetLogStatisticDetailSiteTypeName(short siteType, bool isFileName)
        {
            if (isFileName)
            {
                switch (siteType)
                {
                    case LogStatisticConstants.IBC:
                        return ViewResources.CreditDailyLogStatisticsDetail_FileName;

                    case LogStatisticConstants.Licensee:
                        return ViewResources.LogStatisticsDetail_FileName;

                    default:
                        return string.Empty;
                }
            }
            else
            {
                switch (siteType)
                {
                    case LogStatisticConstants.IBC:
                        return ViewResources.CreditDailyLogStatisticsDetail;

                    case LogStatisticConstants.Licensee:
                        return ViewResources.LicenseeDailyLogStatisticsDetail;

                    default:
                        return string.Empty;
                }
            }
        }
    }
}