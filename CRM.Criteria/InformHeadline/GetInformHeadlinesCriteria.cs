namespace CRM.Criteria.InformHeadline
{
    using Fanex.Data.Repository;

    public class GetInformHeadlinesCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Acc_CRM_InformHeadlineList";

        public override bool IsValid() => true;
    }
}
