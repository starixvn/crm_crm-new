using System.Collections.Generic;

namespace CRM.Models.Report.LogStatistics
{
    public class LogStatisticsBaseModel : BaseModel
    {
        public IEnumerable<int> ListOfCommunicationCount { get; set; } = new List<int>();

        public IEnumerable<int> ListOfCommunicationSumByProduct { get; set; } = new List<int>();
    }
}
