using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Models.Announcement
{
    public class AnnouncementInfo
    {
        public int AnnouncementId { get; set; }
        public string NotificationTemplate { get; set; }
        public string SendDateString { get; set; }
        public string SendTimeString { get; set; }
        public string CreatedBy { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
    }
}
