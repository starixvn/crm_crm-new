namespace CRM.Criteria.ChatTypeMapping
{
    using CRM.Core.Models;
    public class UpdateChatTypeMappingRemarkCommand : BaseNonQueryCommand
    {
        public int ConversationGroupId { get; set; }

        public string Remark { get; set; }

        public int UserId { get; set; }

        public string LoginIP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ChatBot_ChatTypeMappingRemark_Upd";

        public override bool IsValid() => ConversationGroupId > 0;
    }
}