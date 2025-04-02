namespace CRM.Criteria.Announcement;

using Models;

public class CancelAnnouncementCommand : BaseNonQueryCommand
{
    public int UserId { get; set; }
    public int AnnouncementId { get; set; }
    public string Status { get; set; }
    public override string GetSettingKey() => "Acc_CRM_ChatBot_AnnouncementStatus_Upd";

    public override bool IsValid() => UserId > 0 && AnnouncementId > 0;
}