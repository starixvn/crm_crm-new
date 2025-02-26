namespace CRM.Criteria.Common
{
    using Fanex.Data.Repository;

    public class GetBotServicesCriteria : CriteriaBase
    {
        public override string GetSettingKey() => "Acc_CRM_ChatBot_Channel_Sel";

        public override bool IsValid() => true;
    }
}