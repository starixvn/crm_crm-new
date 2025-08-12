using System;
using System.Collections.Generic;
using CRM.Models.Setting;

namespace CRM.Models.ManageSmaFeedback
{
    public class GetSmaFeedbackInfo
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public string ListReviewStatusIDs { get; set; }

        public bool TestOnly { get; set; }

        public string Username { get; set; }

        public string SitePermission { get; set; }

        public short LicenseeType { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int TotalRows { get; set; }

        public IEnumerable<SettingRelation> ReviewStatusSettings { get; set; } = new List<SettingRelation>();

        public string Rating { get; set; }

        public bool AllFeedback { get; set; }
    }
}
