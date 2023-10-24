namespace CRM.Models.AdminTool.CategoryClassification
{
    using CRM.Models.Feedback;
    using Fanex.Data;
    using System.Collections.Generic;

    public class GetCategoryClassification
    {
        public IEnumerable<CategorySubCategorySetting> Categories { get; set; } = new List<CategorySubCategorySetting>();

        public string Remark { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int TotalRows { get; set; }
    }
}
