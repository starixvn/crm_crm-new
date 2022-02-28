using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Models.Report.CategoriesSummaryReport
{
    [Serializable]
    public class SummaryReportModel
    {
        public string ReportTitle { get; set; }

        public IList<CategorySummary> CategorySummaries { get; set; }

        public IList<Summary> GrandTotals { get; set; }

        public IList<string> Months { get; set; }
    }
}
