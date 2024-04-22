namespace CRM.Criteria.MessageNotificationCenter
{
    using Fanex.Data.Repository;

    public class GetResultAdmNotiByIdCriteria : CriteriaBase
    {
        public int NotiID { get; set; }

        public override string GetSettingKey() => "MNC_Notification_AdmSelNotiDetail";

        public override bool IsValid() => true;
    }
}
