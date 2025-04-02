namespace CRM.Criteria.NotificationCenter;

using Fanex.Data.Repository;

public class GetReasonListSettingCriteria : CriteriaBase
{
    public bool IsActive { get; set; }

    public override string GetSettingKey() => "Acc_CRM_ReasonSettingSel";

    public override bool IsValid() => true;
}