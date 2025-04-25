using System;
using Fanex.Data;
using Fanex.Data.Repository;

namespace CRM.Criteria.ManageSMAFeedback
{
    public class GetSmaFeedbackCriteria : CriteriaBase
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

        public short UserRole { get; set; } = Constants.Constants.UserRole;

        public string SitePermission { get; set; }

        public override string GetSettingKey() => "Acc_CRM_ManageSMAFeedback";

        public override bool IsValid() => true;
    }
}