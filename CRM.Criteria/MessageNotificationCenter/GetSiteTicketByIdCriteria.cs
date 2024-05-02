namespace CRM.Criteria.MessageNotificationCenter
{
    using Fanex.Data.Repository;

    public class GetSiteTicketByIdCriteria : CriteriaBase
    {
        public int NotiID { get; set; }

        public override string GetSettingKey() => "MNC_Notification_AdmSelNotiTickets";

        public override bool IsValid() => true;
    }
}
