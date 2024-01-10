namespace CRM.Criteria.Customer
{
    using Fanex.Data.Repository;

    public class GetHeadlineStaffsAndAuthorityCriteria : CriteriaBase
    {
        public int HeadlineID { get; set; }

        public override string GetSettingKey() => "Acc_CRM_NewAccDetail_GetHeadlineStaffsAndAuthority";

        public override bool IsValid() => HeadlineID > 0;
    }
}
