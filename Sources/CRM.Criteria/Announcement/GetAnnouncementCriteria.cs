
namespace CRM.Criteria.Announcement;

using System;
using Fanex.Data.Repository;

public class GetAnnouncementCriteria: CriteriaBase
{
    public int? AnnouncementId { get; set; }

    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public string Title { get; set; }
    public string Status { get; set; }

    public int? PageSize { get; set; }

    public int? PageIndex { get; set; }

    public int TotalRows { get; set; }

    public override string GetSettingKey() => "Acc_CRM_ChatBot_Announcement_Sel";

    public override bool IsValid() => true;
}