namespace CRM.Criteria.PicAndHeadline;

using Fanex.Data.Repository;

public class GetSystemSiteCriteria : CriteriaBase
{
    public override string GetSettingKey() => "Acc_SiteSel_Credit";

    public override bool IsValid() => true;
}