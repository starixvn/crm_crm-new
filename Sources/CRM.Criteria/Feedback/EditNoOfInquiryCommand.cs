namespace CRM.Criteria.Feedback;

using Models;

public class EditNoOfInquiryCommand : BaseNonQueryCommand
{
    public int FeedbackId { get; set; }
    public int? NoInquiries { get; set; }
    public int UserId { get; set; }
    public string IP { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CustomerFeedbackQuickUpd";

    public override bool IsValid() => FeedbackId > 0;
}