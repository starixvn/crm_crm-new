namespace CRM.Criteria.Customer
{
    using Fanex.Data.Repository;

    public class GetAllCustomersCriteria : CriteriaBase
    {
        private const int statusId = 1;
        private const int groupId = 0;
        private const int pageIndex = 1;
        private const int pageSize = 1000;

        public int Status { get; set; } = statusId;
        public int SiteId { get; set; }
        public int GroupId { get; set; } = groupId;
        public string Environment { get; set; }
        public string Username { get; set; } = string.Empty;
        public int PageIndex { get; set; } = pageIndex;
        public int PageSize { get; set; } = pageSize;
        public int TotalRows { get; set; }
        public override string GetSettingKey() => "NAP_User_Search";

        public override bool IsValid() => true;
    }
}
