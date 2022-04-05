using System;

namespace CRM.Models.Report.CategoriesSummaryReport
{
    [Serializable]
    public class Summary
    {
        public string Month { get; set; }

        public int Amount { get; set; }
    }
}
