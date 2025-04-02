namespace CRM.Criteria.Feedback;

using Fanex.Data.Repository;

public class CheckFeedbackIDIsNewCriteria : CriteriaBase
{
    public int FeedbackId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_NewManualFeedback_CheckFeedbackIDIsNew";

    public override bool IsValid() => FeedbackId > 0;
}