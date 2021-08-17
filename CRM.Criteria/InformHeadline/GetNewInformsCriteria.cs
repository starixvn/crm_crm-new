namespace CRM.Criteria.InformHeadline
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetNewInformsCriteria : CriteriaBase
    {
        [SpParam(Ignored = true)]
        public string Title { get; set; }

        public int TypeAccount { get; set; }

        [SpParam(SqlParamName = "Currency")]
        public string Currencies { get; set; }

        [SpParam(SqlParamName = "Level")]
        public string Levels { get; set; }

        [SpParam(SqlParamName = "Site")]
        public string Sites { get; set; }

        [SpParam(SqlParamName = "Ignored")]
        public bool ExcludeIgnoredAccounts { get; set; }

        public byte IsVip { get; set; }

        public int PageIndex { get; set; }

        [SpParam(SqlParamName = "ItemsPerPage")]
        public int PageSize { get; set; }

        public override string GetSettingKey()
        {
            return "Acc_CRM_InformHeadlineSel";
        }

        public override bool IsValid() => true;
    }
}
