namespace CRM.Criteria.PicAndHeadline
{
    using Fanex.Data.Repository;

    public class GetReportCriteria : CriteriaBase
    {
        public string Username { get; set; }

        public string Role { get; set; }

        public string HeadlineName { get; set; }

        public int TotalRows { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public override string GetSettingKey() => "Acc_CRM_PicManagementSel";

        public override bool IsValid() => true;
    }
}
