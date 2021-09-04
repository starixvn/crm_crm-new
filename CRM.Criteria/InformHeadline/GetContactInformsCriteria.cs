namespace CRM.Criteria.InformHeadline
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetContactInformsCriteria : CriteriaBase
    {
        public int TitleId { get; set; }

        public string Username { get; set; }

        public string StatusId { get; set; }

        [SpParam(SqlParamName = "ItemsPerPage")]
        public int PageSize { get; } = -1;

        public override string GetSettingKey() => "Acc_CRM_InformHeadlineDetail";

        public override bool IsValid() => TitleId > 0;
    }
}
