namespace CRM.Core.Criteria.PushResultAmendment
{
    using CRM.Core.Models;

    public class EditMessageResultAmendmentCommand : BaseNonQueryCommand
    {
        public int MessageID { get; set; }

        public string UpdType { get; set; }

        public override string GetSettingKey() => "MNC_PushNotification_MsgUpd";

        public override bool IsValid() => true;
    }
}
