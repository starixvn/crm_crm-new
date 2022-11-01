namespace CRM.Services.Report
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Report.DynamicReport;
    using CRM.Models;
    using CRM.Models.Common;
    using CRM.Models.Report.DynamicReport;
    using CRM.Resources;

    public interface IDynamicReportService
    {
        Task<DynamicReportInfo> GetDynamicReportAsync(GetDynamicReportCriteria criteria);

        Task<DynamicReportInfo> GetChartInfoAsync(GetDynamicReportCriteria criteria);
    }

    public class DynamicReportService : IDynamicReportService
    {
        private readonly IBaseService baseService;
        private readonly ICommonService commonService;

        public DynamicReportService(
            IBaseService baseService,
            ICommonService commonService
        )
        {
            this.baseService = baseService;
            this.commonService = commonService;
        }

        public async Task<DynamicReportInfo> GetDynamicReportAsync(GetDynamicReportCriteria criteria)
        {
            criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
            criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
            var dynamicReport = await GetDynamicReportData(criteria);
            var dynamicPaging = GetPagingLogList(criteria, dynamicReport.ChildReports);

            dynamicPaging.ForEach(x => x.ChildReports.ForEach(y =>
            {
                y.FeedbackDate = commonService.ConvertToClientDateTime(y.FeedbackDate);
                y.PeriodRange.FromDateString = y.PeriodRange.FromDate.ToShortDateFormat();
                y.PeriodRange.ToDateString = y.PeriodRange.ToDate.ToShortDateFormat();
            }));

            return new DynamicReportInfo
            {
                Id = dynamicReport.Id,
                Name = dynamicReport.Name,
                ShortName = dynamicReport.ShortName,
                ChildReports = criteria.IsGetFullReport ? dynamicReport.ChildReports : dynamicPaging,
                TotalChildReports = dynamicReport.TotalChildReports,
            };
        }

        public async Task<DynamicReportInfo> GetChartInfoAsync(GetDynamicReportCriteria criteria)
        {
            var dynamicReport = await GetDynamicReportData(criteria);
            var chartInfo = new DynamicReportInfo
            {
                Id = dynamicReport.Id,
                Name = dynamicReport.Name,
                ShortName = dynamicReport.ShortName,
                TotalChildReports = dynamicReport.TotalChildReports,
                ChildReports = new List<DynamicReportInfo>()
            };

            var childReportLength = dynamicReport.ChildReports.Count;
            for (var periodIndex = 0; periodIndex < childReportLength; periodIndex++)
            {
                var periodReport = dynamicReport.ChildReports[periodIndex];
                chartInfo.ChildReports.Add(new DynamicReportInfo
                {
                    Id = periodReport.Id,
                    Name = periodReport.Name,
                    ShortName = periodReport.ShortName,
                    TotalChildReports = periodReport.TotalChildReports
                });
            }

            return chartInfo;
        }

        public async Task<DynamicReportInfo> GetDynamicReportData(GetDynamicReportCriteria criteria)
        {
            var dynamicReportInfos = await GetDynamicReportDataAsync(criteria);
            DynamicReportInfo dynamicReport;
            switch (criteria.ReportType)
            {
                case PeriodTypeConstants.Daily:
                    dynamicReport = GetDynamicReportByDaily(dynamicReportInfos, criteria);
                    break;

                case PeriodTypeConstants.Weekly:
                    dynamicReport = GetDynamicReportByWeekly(dynamicReportInfos, criteria);
                    break;

                case PeriodTypeConstants.Monthly:
                    dynamicReport = GetDynamicReportByMonthly(dynamicReportInfos, criteria);
                    break;

                case PeriodTypeConstants.Yearly:
                    dynamicReport = GetDynamicReportByYearly(dynamicReportInfos, criteria);
                    break;

                default:
                    throw new ArgumentException("Invalid report type.");
            }

            dynamicReport.ReportTypeId = criteria.ReportType;
            dynamicReport.TotalChildReports = dynamicReportInfos.Count();
            return dynamicReport;
        }


        public async Task<IEnumerable<DynamicReportInfo>> GetDynamicReportDataAsync(GetDynamicReportCriteria criteria)
        {
            var (dynamicReportInfos, settingItems) = await baseService.FetchMultipleAsync<DynamicReportInfo, SettingItem>(criteria);
            foreach (var dynamicReportInfo in dynamicReportInfos)
            {
                var convertFromdate = commonService.ConvertToClientDateTime(dynamicReportInfo.FeedbackDate);
                dynamicReportInfo.DynamicSettings = settingItems.Where(x => x.FeedbackId == dynamicReportInfo.FeedbackId).ToList();
                dynamicReportInfo.PeriodRange = new PeriodRange
                {
                    FromDate = convertFromdate,
                    FromDateString = convertFromdate.ToShortDateFormat()
                };
            }
            return dynamicReportInfos;
        }

        private DynamicReportInfo GetDynamicReportByDaily(IEnumerable<DynamicReportInfo> dynamicReportInfos, GetDynamicReportCriteria criteria)
        {
            DynamicReportInfo dynamicReport = new DynamicReportInfo
            {
                ChildReports = new List<DynamicReportInfo>(),
                Name = string.Format(
                    ViewResources.DynamicReport_Title,
                    ViewResources.Daily,
                    commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
                    commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat()),
                ShortName = string.Format(
                    ViewResources.DynamicReport_ShortTitle,
                    commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
                    commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat())
            };

            if (!dynamicReportInfos.Any())
            {
                return dynamicReport;
            }

            var periodGroups = dynamicReportInfos.GroupBy(data => data.PeriodRange.FromDateString);
            GetDynamicReportInfoByGroup(periodGroups, ref dynamicReport, ViewResources.Daily);
            return dynamicReport;
        }

        private DynamicReportInfo GetDynamicReportByWeekly(IEnumerable<DynamicReportInfo> dynamicReportInfos, GetDynamicReportCriteria criteria)
        {
            DynamicReportInfo dynamicReport = new DynamicReportInfo
            {
                ChildReports = new List<DynamicReportInfo>(),
                Name = string.Format(
                    ViewResources.DynamicReport_Title,
                    ViewResources.Weekly,
                    commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
                    commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat()),
                ShortName = string.Format(
                    ViewResources.DynamicReport_ShortTitle,
                    commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
                    commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat())
            };

            if (!dynamicReportInfos.Any())
            {
                return dynamicReport;
            }

            var periodGroups = dynamicReportInfos.GroupBy(data =>
                data.PeriodRange.FromDate.FirstDayOfWeek().ToShortDateFormat() +
                " - " +
                data.PeriodRange.FromDate.LastDayOfWeek().ToShortDateFormat());
            GetDynamicReportInfoByGroup(periodGroups, ref dynamicReport, ViewResources.Weekly);
            return dynamicReport;
        }

        private DynamicReportInfo GetDynamicReportByMonthly(IEnumerable<DynamicReportInfo> dynamicReportInfos, GetDynamicReportCriteria criteria)
        {
            var dynamicReport = new DynamicReportInfo
            {
                Id = commonService.ConvertToClientDateTime(criteria.FromDate).ToMonthYear(),
                ChildReports = new List<DynamicReportInfo>(),
                Name = string.Format(
                    ViewResources.DynamicReport_Title,
                    ViewResources.Monthly,
                    commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
                    commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat()),
                ShortName = string.Format(
                    ViewResources.DynamicReport_ShortTitle,
                    commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
                    commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat())
            };

            if (!dynamicReportInfos.Any())
            {
                return dynamicReport;
            }

            var periodGroups = dynamicReportInfos.GroupBy(data => new DateTime(data.PeriodRange.FromDate.Year, data.PeriodRange.FromDate.Month, 1));
            foreach (var periodGroup in periodGroups)
            {
                var periodReport = new DynamicReportInfo
                {
                    Name = string.Format(
                        ViewResources.DynamicReport_PeriodReport_Title,
                        ViewResources.Monthly,
                        periodGroup.Key.ToMonthYear()),
                    ShortName = periodGroup.Key.ToMonthYear(),
                    ChildReports = periodGroup.ToList(),
                    PeriodRange = new PeriodRange
                    {
                        FromDate = periodGroup.Key,
                        ToDate = periodGroup.Key.LastDayOfMonth()
                    }
                };

                periodReport.TotalChildReports = periodReport.ChildReports.Count;
                dynamicReport.TotalChildReports += periodReport.TotalChildReports;
                dynamicReport.ChildReports.Add(periodReport);
            }

            return dynamicReport;
        }

        private DynamicReportInfo GetDynamicReportByYearly(IEnumerable<DynamicReportInfo> rawData, GetDynamicReportCriteria criteria)
        {
            var dynamicReport = new DynamicReportInfo
            {
                Id = commonService.ConvertToClientDateTime(criteria.FromDate).Year.ToString(),
                ChildReports = new List<DynamicReportInfo>(),
                Name = string.Format(
                    ViewResources.DynamicReport_Title,
                    ViewResources.Yearly,
                    commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
                    commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat()),
                ShortName = string.Format(
                    ViewResources.DynamicReport_ShortTitle,
                    commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat(),
                    commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat())
            };

            if (!rawData.Any())
            {
                return dynamicReport;
            }

            var periodGroups = rawData.GroupBy(data => data.PeriodRange.FromDate.Year);
            foreach (var periodGroup in periodGroups)
            {
                var periodReport = new DynamicReportInfo
                {
                    Name = string.Format(
                        ViewResources.DynamicReport_PeriodReport_Title,
                        ViewResources.Yearly,
                        periodGroup.Key),
                    ShortName = periodGroup.Key.ToString(),
                    ChildReports = periodGroup.ToList(),
                    PeriodRange = new PeriodRange
                    {
                        FromDate = new DateTime(periodGroup.Key, 1, 1),
                        ToDate = new DateTime(periodGroup.Key, 12, 31)
                    }
                };

                periodReport.TotalChildReports = periodReport.ChildReports.Count;
                dynamicReport.TotalChildReports += periodReport.TotalChildReports;
                dynamicReport.ChildReports.Add(periodReport);
            }

            return dynamicReport;
        }

        private void GetDynamicReportInfoByGroup(IEnumerable<IGrouping<string, DynamicReportInfo>> periodGroups, ref DynamicReportInfo dynamicReport, string groupTypeName)
        {
            foreach (var periodGroup in periodGroups)
            {
                var periodReport = new DynamicReportInfo
                {
                    Name = string.Format(
                        ViewResources.DynamicReport_PeriodReport_Title,
                        groupTypeName,
                        periodGroup.Key),
                    ShortName = periodGroup.Key,
                    ChildReports = periodGroup.ToList()
                };

                periodReport.TotalChildReports = periodReport.ChildReports.Count;
                dynamicReport.TotalChildReports += periodReport.TotalChildReports;
                dynamicReport.ChildReports.Add(periodReport);
            }
        }

        private List<DynamicReportInfo> GetPagingLogList(GetDynamicReportCriteria criteria, List<DynamicReportInfo> dynamicReportList)
        {
            List<DynamicReportInfo> pagingLogList = new List<DynamicReportInfo>();
            var childReportLength = dynamicReportList.Count;
            var startIndex = criteria.PageSize * criteria.PageIndex;
            var endIndex = startIndex + criteria.PageSize - 1;
            var currentIndex = 0;

            var startSplittingIndex = 0;
            var endSplittingIndex = 0;
            for (var i = 0; i < childReportLength && currentIndex <= endIndex; i++)
            {
                var periodGroup = dynamicReportList[i];
                if (currentIndex + periodGroup.ChildReports.Count - 1 < startIndex)
                {
                    currentIndex += periodGroup.ChildReports.Count;
                    continue;
                }

                if (currentIndex < startIndex)
                {
                    startSplittingIndex = startIndex - currentIndex;
                    currentIndex += startSplittingIndex;
                }
                else
                {
                    startSplittingIndex = 0;
                }

                #pragma warning disable S3240 // The simplest possible condition syntax should be used
                if (currentIndex + periodGroup.ChildReports.Count - 1 <= endIndex)
                {
                    endSplittingIndex = periodGroup.ChildReports.Count - 1;
                }
                else
                {
                    endSplittingIndex = startSplittingIndex + (endIndex - currentIndex) <= periodGroup.ChildReports.Count ?
                        (endIndex - currentIndex) + startSplittingIndex : periodGroup.ChildReports.Count - 1;
                }

                pagingLogList.Add(new DynamicReportInfo
                {
                    Name = periodGroup.Name,
                    ShortName = periodGroup.ShortName,
                    ChildReports = periodGroup.ChildReports.Skip(startSplittingIndex)
                        .Take(endSplittingIndex - startSplittingIndex + 1)
                        .ToList(),
                    TotalChildReports = periodGroup.ChildReports.Count,
                    StartChildIndex = startSplittingIndex
                });

                currentIndex += endSplittingIndex - startSplittingIndex + 1;
            }

            return pagingLogList;
        }

    }
}
