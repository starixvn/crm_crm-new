namespace CRM.Services.Report;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Constants;
using CRM.Criteria.Report.DynamicReport;
using CRM.Extensions;
using CRM.Models.Common;
using CRM.Models.Report.DynamicReport;
using CRM.Resources;
using Interfaces;

public interface IDynamicReportService
{
    Task<DynamicReportInfo> GetDynamicReportAsync(GetDynamicReportCriteria criteria);
}

public class DynamicReportService(
    IBaseService baseService,
    ICommonService commonService)
    : IDynamicReportService
{
    public async Task<DynamicReportInfo> GetDynamicReportAsync(GetDynamicReportCriteria criteria)
    {
        criteria.FromDate = commonService.ConvertToServerDateTime(criteria.FromDate);
        criteria.ToDate = commonService.ConvertClientToTimeToServerTime(criteria.ToDate);
        var dynamicReport  = await GetDynamicReportData(criteria);
        var chartInfo = new DynamicReportInfo
        {
            Id = dynamicReport.Id,
            Name = dynamicReport.Name,
            ShortName = dynamicReport.ShortName,
            TotalChildReports = dynamicReport.TotalChildReports,
            ChildReports = []
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

        return new DynamicReportInfo
        {
            Id = dynamicReport.Id,
            Name = dynamicReport.Name,
            ShortName = dynamicReport.ShortName,
            DynamicSettings = dynamicReport.DynamicSettings,
            ChildReports = criteria.IsGetFullReport ? dynamicReport.ChildReports : GetPagingLogList(criteria, dynamicReport.ChildReports),
            TotalChildReports = dynamicReport.TotalChildReports,
            ChartInfo = chartInfo
        };
    }

    public async Task<DynamicReportInfo> GetDynamicReportData(GetDynamicReportCriteria criteria)
    {
        var (dynamicReportInfos, settingItems) = await GetDynamicReportDataAsync(criteria);
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
        dynamicReport.DynamicSettings = settingItems.ToList();
        dynamicReport.ReportTypeId = criteria.ReportType;
        dynamicReport.TotalChildReports = dynamicReportInfos.ToList().Count;
        return dynamicReport;
    }


    public async Task<ValueTuple<IEnumerable<DynamicReportInfo>, IEnumerable<SettingItem>>> GetDynamicReportDataAsync(GetDynamicReportCriteria criteria)
    {
        var (dynamicReportInfos, settingItems) = await baseService.FetchMultipleAsync<DynamicReportInfo, SettingItem>(criteria);
        foreach (var dynamicReportInfo in dynamicReportInfos)
        {
            dynamicReportInfo.FeedbackDate = commonService.ConvertToClientDateTime(dynamicReportInfo.FeedbackDate);
        }
        var result = new ValueTuple<IEnumerable<DynamicReportInfo>, IEnumerable<SettingItem>>(dynamicReportInfos, settingItems);
        return result;
    }

    private DynamicReportInfo GetDynamicReportByDaily(IEnumerable<DynamicReportInfo> dynamicReportInfos, GetDynamicReportCriteria criteria)
    {
        var dynamicReport = new DynamicReportInfo
        {
            ChildReports = [],
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

        var periodGroups = dynamicReportInfos.GroupBy(data => data.FeedbackDate.ToShortDateFormat());
        GetDynamicReportInfoByGroup(periodGroups, ref dynamicReport, ViewResources.Daily);
        return dynamicReport;
    }

    private DynamicReportInfo GetDynamicReportByWeekly(IEnumerable<DynamicReportInfo> dynamicReportInfos, GetDynamicReportCriteria criteria)
    {
        var dynamicReport = new DynamicReportInfo
        {
            ChildReports = [],
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
            data.FeedbackDate.FirstDayOfWeek().ToShortDateFormat() +
            " - " +
            data.FeedbackDate.LastDayOfWeek().ToShortDateFormat());
        GetDynamicReportInfoByGroup(periodGroups, ref dynamicReport, ViewResources.Weekly);
        return dynamicReport;
    }

    private DynamicReportInfo GetDynamicReportByMonthly(IEnumerable<DynamicReportInfo> dynamicReportInfos, GetDynamicReportCriteria criteria)
    {
        var dynamicReport = new DynamicReportInfo
        {
            Id = commonService.ConvertToClientDateTime(criteria.FromDate).ToMonthYear(),
            ChildReports = [],
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

        var periodGroups = dynamicReportInfos.GroupBy(data => 
            new DateTimeOffset(data.FeedbackDate.Year, data.FeedbackDate.Month, 1,0,0,0,TimeSpan.Zero).DateTime);
        foreach (var periodGroup in periodGroups)
        {
            var periodReport = new DynamicReportInfo
            {
                Name = string.Format(
                    ViewResources.DynamicReport_PeriodReport_Title,
                    ViewResources.Monthly,
                    periodGroup.Key.ToMonthYear()),
                ShortName = periodGroup.Key.ToMonthYear(),
                ChildReports = periodGroup.ToList()
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
            ChildReports = [],
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

        var periodGroups = rawData.GroupBy(data => data.FeedbackDate.Year);
        foreach (var periodGroup in periodGroups)
        {
            var periodReport = new DynamicReportInfo
            {
                Name = string.Format(
                    ViewResources.DynamicReport_PeriodReport_Title,
                    ViewResources.Yearly,
                    periodGroup.Key),
                ShortName = periodGroup.Key.ToString(),
                ChildReports = periodGroup.ToList()
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
        var pagingLogList = new List<DynamicReportInfo>();
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