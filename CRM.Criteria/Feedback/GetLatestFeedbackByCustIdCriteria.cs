using CRM.Core.Constants;
using Fanex.Data.Repository;

namespace CRM.Criteria.Feedback
{
    public class GetLatestFeedbackByCustIdCriteria : CriteriaBase
    {
        public int Top { get; set; }
        public int CustID { get; set; }

        public byte UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_FeedbackSelTopByCustId";

        public override bool IsValid() => Top > 0 && CustID > 0;
    }
}
