using System;
using Fanex.Data;

namespace CRM.Criteria.ManageSMAFeedback
{
    public class GetSmaFeedbackCriteria : BaseSitePermisionCriteria
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        [SpParam(AllowNull = true)]
        public string ListReviewStatusIDs { get; set; }

        public bool TestOnly { get; set; }

        public string Username { get; set; }

        public int ItemsPerPage { get; set; }

        public int PageIndex { get; set; }

        public int TotalRows { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ManageSMAFeedback";

        public override bool IsValid() => true;
    }
}