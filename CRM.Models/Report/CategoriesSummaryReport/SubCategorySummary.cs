using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Models.Report.CategoriesSummaryReport
{
    [Serializable]
    public class SubCategorySummary
    {
        public int SubCategoryId { get; set; }

        public string SubCategoryName { get; set; }

        public IList<Summary> Summaries { get; set; }
    }
}
