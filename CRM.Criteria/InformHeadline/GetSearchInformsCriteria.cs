namespace CRM.Criteria.InformHeadline
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetSearchInformsCriteria : CriteriaBase
    {
        public int TitleId { get; set; }

        public byte TypeAccount { get; set; }

        [SpParam(SqlParamName = "currency")]
        public string Currencies { get; set; }

        [SpParam(SqlParamName = "level")]
        public string Levels { get; set; }

        [SpParam(SqlParamName = "site")]
        public string Sites { get; set; }

        public byte IsVip { get; set; }

        [SpParam(SqlParamName = "ignored")]
        public bool ExcludeIgnoredAccounts { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_InformHeadlineSearchSel";
        }

        public override bool IsValid() => TitleId > 0;
    }
}
