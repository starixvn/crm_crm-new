using System;
using System.Collections.Generic;
using System.Text;

namespace CRM.Models.Report.CategoriesSummaryReport
{
    [Serializable]
    public class CategorySummary
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public IList<Summary> Summaries { get; set; }

        public IList<CategorySummary> SubCategories { get; set; }
    }
}
