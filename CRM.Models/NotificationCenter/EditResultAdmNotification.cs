namespace CRM.Models.NotificationCenter
{
    using Fanex.Data;
    using Microsoft.AspNetCore.Http;
    using System.Collections.Generic;

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

        public string Filename { get; set; }

        [SpParam(Ignored = true)]
        public IList<IFormFile> FormFile { get; set; } = new List<IFormFile>();

        [SpParam(Ignored = true)]
        public IList<string> FileString { get; set; } = new List<string>();

        [SpParam(Ignored = true)]
        public IList<string> FileStringRemove { get; set; } = new List<string>();
    }
}
