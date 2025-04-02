namespace CRM.Criteria.Customer;

using Fanex.Data.Repository;

public class GetHeadlineStaffAndAuthorityCriteria : CriteriaBase
{
    public int HeadlineID { get; set; }

    public override string GetSettingKey() => "Acc_CRM_NewAccDetail_GetHeadlineStaffAndAuthority";

    public override bool IsValid() => HeadlineID > 0;
}