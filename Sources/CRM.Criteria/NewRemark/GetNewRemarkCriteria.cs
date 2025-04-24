namespace CRM.Criteria.NewRemark;

using System;

public class GetNewRemarkCriteria : BaseSitePermissionCriteria
{
    public string Username { get; set; }
    public DateTime? Fromdate { get; set; }
    public DateTime? Todate { get; set; }
    public string Remark { get; set; }
    public string RemarkTitle { get; set; }
    public bool IsGuest { get; set; }
    public string RelatedPICs { get; set; }
    public bool ShowHeadline { get; set; }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public int TotalRows { get; set; }

    public override string GetSettingKey() => "Acc_CRM_CustomerRemarkNewSearch";

    public override bool IsValid() => true;
}