namespace CRM.Criteria.AdminTool.CategoryClassification
{
    using Fanex.Data.Repository;

    public class GetCategoryClassificationByIdCriteria : CriteriaBase
    {
        public int MainCategoryID { get; set; }

        public int SubCategoryID { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CategoryClassificationSel";

        public override bool IsValid() => true;
    }
}
