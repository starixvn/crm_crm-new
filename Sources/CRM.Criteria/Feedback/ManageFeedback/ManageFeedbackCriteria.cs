namespace CRM.Criteria.Feedback.ManageFeedback;

using System;
using Fanex.Data;

public class ManageFeedbackCriteria : BaseSitePermissionCriteria
{
    public int? FeedbackId { get; set; }

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public string Username { get; set; }

    public bool? IsGuest { get; set; }

    public int? CommunicationId { get; set; }

    public int? MainCategoryId { get; set; }

    public int? SubCategoryId { get; set; }

    public int? StatusId { get; set; }

    public bool? IsReviewed { get; set; }

    public int? ResponseId { get; set; }

    public string HandledBy { get; set; }

    public string Reviewer { get; set; }

    public int PageIndex { get; set; }

    [SpParam(SqlParamName = "ItemsPerPage")]
    public int PageSize { get; set; }

    public int TotalRows { get; set; }

    public override bool IsValid() => true;

    public override string GetSettingKey() => "Acc_CRM_ManageFeedbackList";
}