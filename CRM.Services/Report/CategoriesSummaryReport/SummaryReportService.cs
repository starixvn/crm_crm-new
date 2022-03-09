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
    }
    public class SummaryReportService : ISummaryReportService
    {
        private readonly IBaseService baseService;
        public SummaryReportService(IBaseService baseService)
        {
            this.baseService = baseService;
        }             

        Task<SummaryReportModel> ISummaryReportService.GetSummaryReportAsync(GetSummaryReportCriteria criteria)
        {
            int a = 0;
            throw new NotImplementedException();
        }
    }
}
