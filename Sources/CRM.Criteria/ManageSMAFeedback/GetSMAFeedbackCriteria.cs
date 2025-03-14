using System;
using Fanex.Data.Repository;

namespace CRM.Criteria.ManageSMAFeedback
{
    public class GetSmaFeedbackCriteria : CriteriaBase
    {
        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public string ReviewStatus { get; set; }

        public string Username { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int TotalRows { get; set; }

        public override string GetSettingKey() => "";

        public override bool IsValid() => true;
    }
}