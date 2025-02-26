namespace CRM.Criteria.Report.DirectCustomerReport
{
    using Fanex.Data.Repository;

    public class DirectCustomerReportCriteria : CriteriaBase
    {
        public string Headline { get; set; }

        public string Username { get; set; }

        public bool ExcludeIgnoredAcc { get; set; }

        public int TotalRows { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public override string GetSettingKey() => "Acc_Crm_Rpt_DirectCustomerReport";

        public override bool IsValid() => true;
    }
}
