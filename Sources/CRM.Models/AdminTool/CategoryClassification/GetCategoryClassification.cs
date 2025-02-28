namespace CRM.Models.AdminTool.CategoryClassification;

using System.Collections.Generic;
using CRM.Models.Feedback;

public class GetCategoryClassification
{
    public IEnumerable<CategorySubCategorySetting> Categories { get; set; } = new List<CategorySubCategorySetting>();

    public string Remark { get; set; }

    public int PageIndex { get; set; }

    public int PageSize { get; set; }

    public int TotalRows { get; set; }
}