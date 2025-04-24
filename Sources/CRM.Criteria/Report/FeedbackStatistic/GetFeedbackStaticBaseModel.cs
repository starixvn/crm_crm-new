namespace CRM.Criteria.Report.FeedbackStatistic;

using System;
using Constants;
using Fanex.Data;

public class GetFeedbackStaticBaseModel
{
    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public string FromDuration { get; set; }

    public string ToDuration { get; set; }

    public int Type { get; set; }

    [SpParam(Ignored = true)]
    public int PageIndex { get; set; }

    [SpParam(Ignored = true)]
    public int PageSize { get; set; }

    public short UserRole { get; set; } = Constants.UserRole;
    public short LicenseeType { get; set; } = (short)CRM.Enum.SitePermission.Both;
    public string SitePermission { get; set; }
}