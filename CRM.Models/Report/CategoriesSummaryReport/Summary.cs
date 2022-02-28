using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Models.Report.CategoriesSummaryReport
{
    [Serializable]
    public class Summary
    {
        public string Month { get; set; }

        public int Amount { get; set; }
    }
}
