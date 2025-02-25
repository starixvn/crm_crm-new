namespace CRM.Models.NotificationCenter
{
    using System;

    public class ResultAdmNotification : ResultAdmNotificationDetail
    {
        public string SessionID { get; set; }

        public DateTime? EventDate { get; set; }

        public DateTime? CreatedTime { get; set; }

        public DateTime? SendDate { get; set; }

        public string Sender { get; set; }

        public int MatchId { get; set; }
    }
}
