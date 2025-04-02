namespace CRM.Models.Report.CategoriesSummaryReport;

using System;
using System.Collections.Generic;

[Serializable]
public class CategorySummary
{
    public int Id { get; set; }

    public string Name { get; set; }

    public IList<Summary> Summaries { get; set; }

    public IList<CategorySummary> SubCategories { get; set; }
}