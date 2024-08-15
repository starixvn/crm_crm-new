namespace CRM.Models.NotificationCenter
{
    using System;

    public class GetResultAdmNotification
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public bool IsOstUser { get; set; }

        public int? FromNotificationId { get; set; }

        public int? ToNotificationId { get; set; }

        public int? NotificationId { get; set; }

        public int? MatchId { get; set; }

        public int? MessageId { get; set; }

        public string Content { get; set; }

        public string Statuses { get; set; }

        public string Sender { get; set; }

        public bool? IsTestOnly { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int TotalRows { get; set; }

        public string SitePermission {  get; set; }

        public short LicenseeType { get; set; }
    }
}
