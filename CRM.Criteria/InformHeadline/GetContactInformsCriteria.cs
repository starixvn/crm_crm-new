namespace CRM.Criteria.InformHeadline
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetContactInformsCriteria : CriteriaBase
    {
        public int TitleId { get; set; }

        public string Username { get; set; }

        public string StatusId { get; set; }

        public int PageIndex { get; set; }

        [SpParam(SqlParamName = "ItemsPerPage")]
        public int PageSize { get; set; }

        public override string GetSettingKey() => "Acc_CRM_InformHeadlineDetail";

        public override bool IsValid() => TitleId > 0;
    }
}
