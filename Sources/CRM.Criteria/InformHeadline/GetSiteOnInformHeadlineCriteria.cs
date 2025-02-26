namespace CRM.Criteria.InformHeadline
{
    using Fanex.Data.Repository;

    public class GetSiteOnInformHeadlineCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Acc_CRM_SiteSel_InformHeadline";

        public override bool IsValid() => true;
    }
}