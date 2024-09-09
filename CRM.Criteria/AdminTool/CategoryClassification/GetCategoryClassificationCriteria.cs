namespace CRM.Criteria.AdminTool.CategoryClassification
{
    using System.Collections.Generic;
    using System.Linq;
    using CRM.Core.Extensions.XML;
    using CRM.Models.Feedback;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetCategoryClassificationCriteria : CriteriaBase
    {
        [SpParam(Ignored = true)]
        public IEnumerable<CategorySubCategorySetting> Categories { get; set; } = new List<CategorySubCategorySetting>();

        [SpParam(SqlParamName = "Category")]
        public string CategoryXml => Categories.Any() ? Categories.ToXML("ROOT").ToString() : string.Empty;

        public string RemarkSearch { get; set; }

        public byte Active { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int TotalRows { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CategoryClassificationList";

        public override bool IsValid() => true;
    }
}