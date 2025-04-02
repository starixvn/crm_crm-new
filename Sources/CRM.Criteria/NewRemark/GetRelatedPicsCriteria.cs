namespace CRM.Criteria.NewRemark;

using Fanex.Data.Repository;

public class GetRelatedPicsCriteria : CriteriaBase
{
    public int CustId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CustomerPicSel";

    public override bool IsValid() => true;
}