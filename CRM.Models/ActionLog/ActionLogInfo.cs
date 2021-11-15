namespace CRM.Models.ActionLog
{
    using System;
    using System.Collections.Generic;

    public class ActionLogInfo
    {
        public DateTime LogDate { get; set; }

        public string Username { get; set; }

        public string ActionName { get; set; }

        public string OldValues { get; set; }

        public string NewValues { get; set; }

        public IList<string> FieldNames { get; set; }

        public IList<string> OldValuesList { get; set; }

        public IList<string> NewValuesList { get; set; }
    }
}
