using CRM.Core.Services;
using CRM.Criteria.Report.CategoriesSummaryReport;
using CRM.Models.Report.CategoriesSummaryReport;
using System;

namespace CRM.Services.Report.CategoriesSummaryReport
{
    public interface ISummaryReportService
    {
        dynamic AllSettings();

        SummaryReportModel GetSummaryReport(GetSummaryReportCriteria criteria);

        void ExportSummaryReportExcel(GetSummaryReportCriteria criteria);
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

        public dynamic AllSettings()
        {
            throw new NotImplementedException();
        }

        public void ExportSummaryReportExcel(GetSummaryReportCriteria criteria)
        {
            throw new NotImplementedException();
        }

        public SummaryReportModel GetSummaryReport(GetSummaryReportCriteria criteria)
        {
            throw new NotImplementedException();
        }
    }
}
