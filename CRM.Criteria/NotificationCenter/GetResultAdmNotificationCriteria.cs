namespace CRM.Criteria.NotificationCenter
{
    using System;

    public class GetResultAdmNotificationCriteria : BaseSitePermisionCriteria
    {
        public DateTime? FCreatedDateGMT8 { get; set; }

        public DateTime? TCreatedDateGMT8 { get; set; }

        public int NotiType { get; set; }

        public int? FNotiID { get; set; }

        public int? TNotiID { get; set; }

        public int? MatchID { get; set; }

        public int? MsgID { get; set; }

        public string Content { get; set; }

        public string Status { get; set; }

        public string Sender { get; set; }

        public bool? TestOnly { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int TotalRows { get; set; }

        public override string GetSettingKey() => "MNC_Notification_AdmSelNoti";

        public override bool IsValid() => true;
    }
}
