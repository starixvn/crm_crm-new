namespace CRM.Criteria.Setting
{
    using CRM.Core.Constants;
    using Fanex.Data.Repository;

    public class GetAllCommunicationToolCriteria : CriteriaBase
    {
        public byte UserRole { get; } = Constants.UserRole;
        public byte Active { get; set; }
        public override string GetSettingKey() => "Acc_CRM_CommunicationToolList";

        public override bool IsValid() => true;
    }
}