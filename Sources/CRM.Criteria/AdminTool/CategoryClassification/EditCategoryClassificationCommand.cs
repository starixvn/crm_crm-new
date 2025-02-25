namespace CRM.Criteria.AdminTool.CategoryClassification
{
    using CRM.Core.Models;

    public class EditCategoryClassificationCommand : BaseNonQueryCommand
    {
        public int MainCategoryID { get; set; }

        public int SubCategoryID { get; set; }

        public string RemarkNewValue { get; set; }

        public int ActionType { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CategoryClassificationUpd";

        public override bool IsValid() => true;
    }
}
