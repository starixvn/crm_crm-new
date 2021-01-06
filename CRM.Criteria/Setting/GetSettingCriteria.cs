namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetSettingCriteria : CriteriaBase
    {
        public int? UserRole { get; set; }
        public string SettingName { get; set; }
        public bool? IsActive { get; set; }

        public override string GetSettingKey() => "Acc_CRM_SettingSel";

        public override bool IsValid() => true;
    }
}