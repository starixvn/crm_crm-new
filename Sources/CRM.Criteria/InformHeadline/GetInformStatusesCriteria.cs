namespace CRM.Criteria.InformHeadline
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetInformStatusesCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "Mode")]
        public bool IsIncludeKeptForRefence { get; set; }

        public override string GetSettingKey() => "Acc_CRM_InformHeadlineStatusSel";

        public override bool IsValid() => true;
    }
}
