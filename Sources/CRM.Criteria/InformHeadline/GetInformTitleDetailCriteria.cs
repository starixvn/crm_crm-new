namespace CRM.Criteria.InformHeadline;

using Fanex.Data.Repository;

public class GetInformTitleDetailCriteria : CriteriaBase
{
    public int TitleId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_InformTitleDetail";

    public override bool IsValid() => TitleId > 0;
}