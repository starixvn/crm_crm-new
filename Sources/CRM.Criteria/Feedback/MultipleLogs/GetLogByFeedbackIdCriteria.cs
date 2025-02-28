
namespace CRM.Criteria.Feedback.MultipleLogs;

using Constants;
using Fanex.Data.Repository;

public class GetLogByFeedbackIdCriteria : CriteriaBase
{
    public int FeedbackId { get; set; }
    public short UserRole { get; } = Constants.UserRole;

    public override string GetSettingKey() => "Acc_CRM_CommunicationLogSel";

    public override bool IsValid() => FeedbackId > 0;
}