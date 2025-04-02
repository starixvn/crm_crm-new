namespace CRM.Criteria.Announcement;

using Fanex.Data.Repository;

public class GetContentByIdCriteria : CriteriaBase
{
    public int AnnouncementId { get; set; }
    public override string GetSettingKey() => "Acc_CRM_ChatBot_AnnouncementDetail_Sel";

    public override bool IsValid() => AnnouncementId > 0;
}