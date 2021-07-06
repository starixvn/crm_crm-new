
namespace CRM.BackgroundJob.Criteria.ChatBot
{
    using Fanex.Data.Repository;

    public class GetChatBotAbnormalAccountGetUsernameListCriteria : CriteriaBase
    {
        public string Messages { get; set; }

        public override string GetSettingKey() => "Acc_CRM_AbnormalAccount_GetUsernameList";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(Messages);
    }
}
