namespace CRM.Services.Report.LogStatistics
{
    using System.Threading.Tasks;
    using CRM.Core.Services;
    using CRM.Criteria.Report.LogStatistics;

    public interface ILogStatisticsService
    {
        Task<SettlementReportInfo> GetReportDataAsync(LogStatisticsCriteria criteria);
    }
    public class LogStatisticsService
    {
        private readonly IBaseService baseService;

        public LogStatisticsService(IBaseService baseService)
        {
            this.baseService = baseService;
        }
    }
}
