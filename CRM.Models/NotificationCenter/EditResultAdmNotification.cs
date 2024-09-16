namespace CRM.Models.NotificationCenter
{
    public class EditResultAdmNotification
    {
        public int NotificationId { get; set; }

        public string NewStatus { get; set; }

        public string NewSubject { get; set; }

        public string NewContentEN { get; set; }

        public string NewContentCH { get; set; }

        public string NewContentCS { get; set; }

        public string NewContentZHCN { get; set; }

        public int UpdaterID { get; set; }
    }
}
