namespace CRM.Criteria.Customer;

using Fanex.Data.Repository;

public class GetHeadlineCompanyServiceCriteria : CriteriaBase
{
    public int HeadlineID { get; set; }

    public override string GetSettingKey() => "Acc_CRM_NewAccDetail_GetHeadlineCompanyService";

    public override bool IsValid() => HeadlineID > 0;
}