namespace CRM.Services.Report;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report;
using CRM.Extensions;
using CRM.Models;
using CRM.Models.Report;
using CRM.Resources;
using Interfaces;

public interface IIssueStatisticsService
{
    Task<IssuesStatisticsReportInfo> GetIssuesStatisticsReportAsync(GetIssuesStatisticReportCriteria criteria);
}

public class IssueStatisticsService(IBaseService baseService, ICommonService commonService) : IIssueStatisticsService
{
    public async Task<IssuesStatisticsReportInfo> GetIssuesStatisticsReportAsync(GetIssuesStatisticReportCriteria criteria)
    {
        IssuesStatisticsReportInfo issuesStatisticsReportInfo;
        criteria.FromDate = commonService.ConvertClientFromTimeToServerTime(criteria.FromDate);
        criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
        var issuesStatistics = await baseService.GetDataAsync<IssuesStatistics>(criteria);
        foreach (var issue in issuesStatistics)
        {
            issue.FeedbackDate = commonService.ConvertToClientDateTime(issue.FeedbackDate);
        }
        var groupByCountryId = issuesStatistics.GroupBy(x => x.CountryId).Select(group => new Country
        {
            Id = group.First().CountryId,
            Name = group.First().CountryId == SettingConstants.NotApply ? "N/A" : group.First().CountryName
        });
        var countryList = groupByCountryId.ToList();

        var countryDictionary = GetCountryDictionary(countryList);

        switch (criteria.ReportType)
        {
            case PeriodTypeConstants.Daily:
                issuesStatisticsReportInfo = GetStatisticReportByDaily(
                    issuesStatistics,
                    countryList,
                    countryDictionary,
                    criteria);
                break;

            case PeriodTypeConstants.Monthly:
                issuesStatisticsReportInfo = GetStatisticReportByMonthly(
                    issuesStatistics,
                    countryList,
                    countryDictionary,
                    criteria);
                break;

            default:
                return new IssuesStatisticsReportInfo();
        }

        issuesStatisticsReportInfo.ReportTypeId = criteria.ReportType;
        issuesStatisticsReportInfo.TotalChildReports = issuesStatisticsReportInfo.ChildReports.Count;

        return new IssuesStatisticsReportInfo
        {
            Name = issuesStatisticsReportInfo.Name,
            ShortName = issuesStatisticsReportInfo.ShortName,
            ChildReports = criteria.IsGetFullReport ?
                issuesStatisticsReportInfo.ChildReports :
                GetPagingLogList(criteria, issuesStatisticsReportInfo.ChildReports),
            Total = issuesStatisticsReportInfo.Total,
            TotalChildReports = issuesStatisticsReportInfo.TotalChildReports,
        };
    }

    private static IList<IssuesStatisticsReportInfo> GetPagingLogList(
        GetIssuesStatisticReportCriteria criteria,
        IList<IssuesStatisticsReportInfo> statisticReportList)
    {
        return statisticReportList.Skip(criteria.PageSize * (criteria.PageIndex - 1)).Take(criteria.PageSize).ToList();
    }

    private IssuesStatisticsReportInfo GetStatisticReportByDaily(
        IEnumerable<IssuesStatistics> issuesStatistics,
        IList<Country> countryList,
        IDictionary<int, int> countryDictionary,
        GetIssuesStatisticReportCriteria criteria)
    {
        var countryLength = countryDictionary.Count;
        var fromDateClient = commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat();
        var toDateClient = commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat();

        var statisticReport = new IssuesStatisticsReportInfo
        {
            ChildReports = new List<IssuesStatisticsReportInfo>(),
            Name = string.Format(ViewResources.StatisticReport_Title, ViewResources.Daily, fromDateClient, toDateClient),
            ShortName = string.Format(ViewResources.StatisticReport_ShortTitle, fromDateClient, toDateClient),
            Total = new IssuesStatisticsReportInfo
            {
                ShortName = ViewResources.Grand_Total,
                ChildReports = GetDummyCountryList(countryLength, countryList, true)
            }
        };

        if (!issuesStatistics.Any())
        {
            return statisticReport;
        }

        var dateGroups = issuesStatistics.GroupBy(data => data.FeedbackDate.ToShortDateFormat());
        foreach (var dateGroup in dateGroups)
        {
            var dateReport = new IssuesStatisticsReportInfo
            {
                ShortName = dateGroup.Key,
                ChildReports = new List<IssuesStatisticsReportInfo>(),
                Total = new IssuesStatisticsReportInfo
                {
                    ShortName = string.Format(
                        ViewResources.StatisticReport_TotalTitle,
                        dateGroup.Key),
                    ChildReports = GetDummyCountryList(countryLength, countryList, false)
                }
            };

            var timeGroups = dateGroup.OrderBy(data => data.FeedbackDate.Hour).GroupBy(data => data.FeedbackDate.Hour);
            foreach (var timeGroup in timeGroups)
            {
                var timeReport = new IssuesStatisticsReportInfo
                {
                    ShortName = string.Format("{0:00}:00 - {0:00}:59", timeGroup.Key),
                    ChildReports = GetDummyCountryList(countryLength, countryList, false)
                };

                GetTimeReport(timeGroup.ToList(), countryDictionary, ref timeReport, ref statisticReport, ref dateReport);
            }

            statisticReport.Total.NumberOfIssues += dateReport.Total.NumberOfIssues;
            statisticReport.ChildReports.Add(dateReport);
        }

        return statisticReport;
    }

    private IssuesStatisticsReportInfo GetStatisticReportByMonthly(
        IEnumerable<IssuesStatistics> issuesStatistics,
        IList<Country> countryList,
        IDictionary<int, int> countryDictionary,
        GetIssuesStatisticReportCriteria criteria)
    {
        var countryLength = countryDictionary.Count;
        var fromDateClient = commonService.ConvertToClientDateTime(criteria.FromDate).ToShortDateFormat();
        var toDateClient = commonService.ConvertToClientDateTime(criteria.ToDate).ToShortDateFormat();

        var statisticReport = new IssuesStatisticsReportInfo
        {
            ChildReports = new List<IssuesStatisticsReportInfo>(),
            Name = string.Format(ViewResources.StatisticReport_Title, ViewResources.Monthly, fromDateClient, toDateClient),
            ShortName = string.Format(ViewResources.StatisticReport_ShortTitle, fromDateClient, toDateClient),
            Total = new IssuesStatisticsReportInfo
            {
                ShortName = ViewResources.Grand_Total,
                ChildReports = GetDummyCountryList(countryLength, countryList, true)
            }
        };

        if (issuesStatistics == null || !issuesStatistics.Any())
        {
            return statisticReport;
        }

        var dateGroups = issuesStatistics.GroupBy(data =>
            new DateTimeOffset(data.FeedbackDate.Year, data.FeedbackDate.Month, 1, 0, 0, 0, TimeSpan.Zero).DateTime);
        foreach (var dateGroup in dateGroups)
        {
            var dateReport = new IssuesStatisticsReportInfo
            {
                ShortName = dateGroup.Key.ToString("MMM yyyy"),
                ChildReports = new List<IssuesStatisticsReportInfo>(),
                PeriodRange = new PeriodRange
                {
                    FromDate = dateGroup.Key,
                    ToDate = commonService.LastDayOfMonth(dateGroup.Key)
                },
                Total = new IssuesStatisticsReportInfo
                {
                    ShortName = string.Format(
                        ViewResources.StatisticReport_TotalTitle,
                        dateGroup.Key.ToString("MMM yyyy")),
                    ChildReports = GetDummyCountryList(countryLength, countryList, false)
                }
            };

            dateReport.PeriodRange.FromDateString = dateReport.PeriodRange.FromDate.ToShortDateString();
            dateReport.PeriodRange.ToDateString = dateReport.PeriodRange.ToDate.ToShortDateString();
            var timeGroups = dateGroup
                .OrderBy(data => data.FeedbackDate.Hour)
                .GroupBy(data => new DateTimeOffset(
                    dateGroup.Key.Year,
                    dateGroup.Key.Month,
                    dateGroup.Key.Day,
                    data.FeedbackDate.Hour,
                    0,
                    0, TimeSpan.Zero).DateTime);
            foreach (var timeGroup in timeGroups)
            {
                var timeReport = new IssuesStatisticsReportInfo
                {
                    ShortName = string.Format("{0:00}:00 - {0:00}:59", timeGroup.Key.Hour),
                    ChildReports = GetDummyCountryList(countryLength, countryList, false)
                };

                GetTimeReport(timeGroup.ToList(), countryDictionary, ref timeReport, ref statisticReport, ref dateReport);
            }

            statisticReport.Total.NumberOfIssues += dateReport.Total.NumberOfIssues;
            statisticReport.ChildReports.Add(dateReport);
        }

        return statisticReport;
    }

    private void GetTimeReport(
        IList<IssuesStatistics> timeGroup,
        IDictionary<int, int> countryDictionary,
        ref IssuesStatisticsReportInfo timeReport,
        ref IssuesStatisticsReportInfo statisticReport,
        ref IssuesStatisticsReportInfo dateReport)
    {
        foreach (var timeData in timeGroup)
        {
            var countryIndex = countryDictionary[timeData.CountryId];
            var reportInfo = new IssuesStatisticsReportInfo
            {
                HasData = true,
                NumberOfIssues = timeData.NoOfIssues
            };

            if (!timeReport.ChildReports[countryIndex].HasData)
            {
                timeReport.ChildReports[countryIndex] = reportInfo;
            }
            else
            {
                timeReport.ChildReports[countryIndex].NumberOfIssues += reportInfo.NumberOfIssues;
            }

            timeReport.NumberOfIssues += reportInfo.NumberOfIssues;
            dateReport.Total.ChildReports[countryIndex].NumberOfIssues += reportInfo.NumberOfIssues;
            statisticReport.Total.ChildReports[countryIndex].NumberOfIssues += reportInfo.NumberOfIssues;
        }

        dateReport.Total.NumberOfIssues += timeReport.NumberOfIssues;
        dateReport.ChildReports.Add(timeReport);
    }

    private IList<IssuesStatisticsReportInfo> GetDummyCountryList(
        int countryLength,
        IList<Country> countryList,
        bool isGrandTotal)
    {
        var dummyCountries = new List<IssuesStatisticsReportInfo>();
        for (var i = 0; i < countryLength; i++)
        {
            dummyCountries.Add(new IssuesStatisticsReportInfo
            {
                CountryInfo = isGrandTotal ? countryList[i] : null
            });
        }

        return dummyCountries;
    }

    private static IDictionary<int, int> GetCountryDictionary(IList<Country> countryList)
    {
        var countryDictionary = new Dictionary<int, int>();
        var countryLength = countryList.Count;
        var currentCountryIndex = 0;
        for (var i = 0; i < countryLength; i++)
        {
            var country = countryList[i];
            if (!countryDictionary.TryAdd(country.Id, currentCountryIndex))
            {
                continue;
            }

            currentCountryIndex++;
        }

        return countryDictionary;
    }
}