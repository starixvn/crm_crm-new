namespace CRM.Criteria.InformHeadline
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetEditInformsCriteria : CriteriaBase
    {
        public int TitleId { get; set; }

        public byte TypeAccount { get; set; }

        [SpParam(SqlParamName = "Currency")]
        public string Currencies { get; set; }

        [SpParam(SqlParamName = "Level")]
        public string Levels { get; set; }

        [SpParam(SqlParamName = "Site")]
        public string Sites { get; set; }

        public byte IsVip { get; set; }

        [SpParam(SqlParamName = "Ignored")]
        public bool ExcludeIgnoredAccounts { get; set; }

        public override string GetSettingKey() => "Acc_CRM_InformHeadlineSearchSel";

        public override bool IsValid() => TitleId > 0;
    }
}
