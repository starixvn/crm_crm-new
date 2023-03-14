
namespace CRM.BackgroundJob.Criteria.ChatBot
{
    using CRM.Core.Models;
    using Fanex.Data.Repository;

    public class GetChatBotAbnormalAccountGetUsernameListCriteria : CriteriaBase, CriteriaBaseSiteDb
    {
        public string Messages { get; set; }
        public int SiteDBGroupID { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ChatBot_AbnormalAccount_GetUsernameList";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(Messages) && SiteDBGroupID >= 0;
    }
}