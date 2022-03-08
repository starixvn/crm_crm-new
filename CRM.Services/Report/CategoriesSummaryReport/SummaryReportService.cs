using CRM.Core.Services;
using CRM.Criteria.Report.CategoriesSummaryReport;
using CRM.Models;
using CRM.Models.Report.CategoriesSummaryReport;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CRM.Services.Report.CategoriesSummaryReport
{
    public interface ISummaryReportService
    {
        Task<SummaryReportModel> GetSummaryReportAsync(GetSummaryReportCriteria criteria);
        void GetSummaryReportAsyncdemo(GetSummaryReportCriteria a);
    }
    public class SummaryReportService : ISummaryReportService
    {
        private readonly IBaseService baseService;
        private readonly ISettingService _settingServices;

        public SummaryReportService()
            : this(null, null)
        {
        }
        public SummaryReportService(IBaseService baseService, ISettingService settingServices)
        {
            this.baseService = baseService;
            _settingServices = settingServices;
        }

        public void GetSummaryReportAsyncdemo(GetSummaryReportCriteria criteria)
        {
            var rawData = baseService.GetDataAsync<CategorySummary>(criteria);

            int ab = 0;

            //var settlementReport = MappingDataSettlementReport(rawData, countryDictionary, criteria);

            //settlementReport.TotalChildReports = settlementReport.ChildReports.Count;
            //settlementReport.ChartInfo = GetChartInfo(settlementReport);

            //return new SummaryReportModel
            //{
            //    ReportTitle = "",
            //    CategorySummaries = rawData,

            //};
        }

        Task<SummaryReportModel> ISummaryReportService.GetSummaryReportAsync(GetSummaryReportCriteria criteria)
        {
            throw new NotImplementedException();
        }
    }
}
