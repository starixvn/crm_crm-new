namespace CRM.Criteria.Setting
{
    using Fanex.Data.Repository;

    public class GetSourceSettingMappingCriteria : CriteriaBase
    {
        public string Settings { get; set; }

        public override string GetSettingKey() => "Acc_CRM_SourceSettingMappingSel";

        public override bool IsValid() => true;
    }
}