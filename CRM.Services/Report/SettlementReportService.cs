namespace CRM.Services.Report
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Threading.Tasks;
    using CRM.Core.Constants;
    using CRM.Core.Services;
    using CRM.Criteria.Report.SettlementReport;
    using CRM.Models;
    using CRM.Models.Report.SettlementReport;
    using CRM.Resources;

    public interface ISettlementReportService
    {
        Task<SettlementReportInfo> GetSettlementReportAsync(GetSettlementReportCriteria criteria);
    }

    public class SettlementReportService : ISettlementReportService
    {
        private readonly IBaseService baseService;

        public SettlementReportService(IBaseService baseService)
        {
            this.baseService = baseService;
        }

        public async Task<SettlementReportInfo> GetSettlementReportAsync(GetSettlementReportCriteria criteria)
        {
            var rawData = await baseService.GetDataAsync<SettlementReportEntity>(criteria);
            var countryList = rawData
               .Select(settlementReportEntity => new Country
               {
                   Id = settlementReportEntity.CountryId,
                   Name = settlementReportEntity.CountryName
               })
               .OrderBy(country => country.Id)
               .ToList();
            var countryDictionary = GetCountryDictionary(countryList);
            var settlementReport = MappingDataSettlementReport(rawData, countryDictionary, criteria);

            settlementReport.TotalChildReports = settlementReport.ChildReports.Count;
            settlementReport.ChartInfo = GetChartInfo(settlementReport);

            return new SettlementReportInfo
            {
                Name = settlementReport.Name,
                ChildReports = criteria.IsGetFullReport ?
                    settlementReport.ChildReports :
                    GetPagingLogList(criteria, settlementReport.ChildReports),
                Total = settlementReport.Total,
                TotalChildReports = settlementReport.TotalChildReports,
                ChartInfo = settlementReport.ChartInfo
            };
        }

        private static List<SettlementReportInfo> GetPagingLogList(
            GetSettlementReportCriteria criteria,
            List<SettlementReportInfo> settlementReportList)
        {
            return settlementReportList.Skip(criteria.PageSize * (criteria.PageIndex - 1))
                .Take(criteria.PageSize)
                .ToList();
        }

        private static Dictionary<int, int> GetCountryDictionary(List<Country> countryList)
        {
            var countryDictionary = new Dictionary<int, int>();
            var countryLength = countryList.Count;
            var currentIndex = 0;
            for (var i = 0; i < countryLength; i++)
            {
                var country = countryList[i];
                if (countryDictionary.ContainsKey(country.Id))
                {
                    continue;
                }

                countryDictionary.Add(country.Id, currentIndex++);
            }

            return countryDictionary;
        }

        private List<SettlementReportInfo> GetDummyCountryList(Dictionary<int, int> countryDictionary)
        {
            var dummyCountries = new List<SettlementReportInfo>();
            foreach (var keyPair in countryDictionary)
            {
                dummyCountries.Add(new SettlementReportInfo
                {
                    Id = keyPair.Key
                });
            }

            return dummyCountries;
        }

        private SettlementReportInfo MappingDataSettlementReport(
            IEnumerable<SettlementReportEntity> rawData,
            Dictionary<int, int> countryDictionary,
            GetSettlementReportCriteria criteria)
        {
            var settlementReport = new SettlementReportInfo
            {
                ChildReports = new List<SettlementReportInfo>(),
                Name = string.Format(
                    ViewResources.SettlementReport_Title,
                    criteria.Year),
                Total = new SettlementReportInfo
                {
                    Name = ViewResources.Grand_Total,
                    ChildReports = GetDummyCountryList(countryDictionary)
                }
            };

            if (rawData == null || !rawData.Any())
            {
                return settlementReport;
            }

            var monthGroups = rawData.GroupBy(data => data.Month);
            foreach (var monthGroup in monthGroups)
            {
                var monthReport = new SettlementReportInfo
                {
                    Name = new DateTimeOffset(criteria.Year, monthGroup.Key, 1,0,0,0,TimeSpan.Zero).DateTime.ToString("MMM", CultureInfo.InvariantCulture),
                    ChildReports = new List<SettlementReportInfo>()
                };

                foreach (var monthDetail in monthGroup)
                {
                    var countryReport = new SettlementReportInfo
                    {
                        Id = monthDetail.CountryId,
                        Name = monthDetail.CountryId == SettingConstants.NotApply ?
                            ViewResources.Symbol_NotApply :
                            monthDetail.CountryName,
                        NumberOfIssues = monthDetail.NoOfIssues
                    };

                    monthReport.ChildReports.Add(countryReport);
                    monthReport.NumberOfIssues += countryReport.NumberOfIssues;

                    var countryIndex = countryDictionary[monthDetail.CountryId];
                    settlementReport.Total.ChildReports[countryIndex].Id = countryReport.Id;
                    if (string.IsNullOrEmpty(settlementReport.Total.ChildReports[countryIndex].Name))
                    {
                        settlementReport.Total.ChildReports[countryIndex].Name = countryReport.Name;
                    }

                    settlementReport.Total.ChildReports[countryIndex].NumberOfIssues += countryReport.NumberOfIssues;
                    settlementReport.Total.NumberOfIssues += countryReport.NumberOfIssues;
                }

                settlementReport.ChildReports.Add(monthReport);
            }

            return settlementReport;
        }

        private SettlementReportInfo GetChartInfo(SettlementReportInfo settlementReport)
        {
            var chartInfo = new SettlementReportInfo
            {
                Name = settlementReport.Name,
                NumberOfIssues = settlementReport.Total.NumberOfIssues,
                ChildReports = new List<SettlementReportInfo>()
            };

            var monthReportLength = settlementReport.ChildReports.Count;
            for (var monthIndex = 0; monthIndex < monthReportLength; monthIndex++)
            {
                var monthReport = settlementReport.ChildReports[monthIndex];
                var monthChart = new SettlementReportInfo
                {
                    Name = monthReport.Name,
                    NumberOfIssues = monthReport.NumberOfIssues,
                    ChildReports = new List<SettlementReportInfo>()
                };

                var countryReportLength = monthReport.ChildReports.Count;
                for (var countryIndex = 0; countryIndex < countryReportLength; countryIndex++)
                {
                    var countryReport = monthReport.ChildReports[countryIndex];
                    var timeChart = new SettlementReportInfo
                    {
                        Name = countryReport.Name,
                        NumberOfIssues = countryReport.NumberOfIssues,
                        ChildReports = new List<SettlementReportInfo>()
                    };

                    monthChart.ChildReports.Add(timeChart);
                }

                chartInfo.ChildReports.Add(monthChart);
            }

            return chartInfo;
        }
    }
}