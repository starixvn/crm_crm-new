namespace CRM.Criteria.Communication;

using Constants;
using Fanex.Data.Repository;
public class GetLogByFeedbackIdCriteria : CriteriaBase
{
    public int FeedbackId { get; set; }
    public short UserRole { get; } = Constants.UserRole;
    public int Mode { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CommunicationLogSel";

    public override bool IsValid() => true;
}