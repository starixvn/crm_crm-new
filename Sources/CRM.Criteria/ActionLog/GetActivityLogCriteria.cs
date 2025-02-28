namespace CRM.Criteria.ActionLog;

using System;
using Constants;
using Fanex.Data;
using Fanex.Data.Repository;

public class GetActivityLogCriteria : CriteriaBase
{
    public string Username { get; set; }

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public int ActionId { get; set; }

    public short UserRole { get; } = Constants.UserRole;

    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    [SpParam(Ignored = true)]
    public int PageIndex { get; set; }

    [SpParam(Ignored = true)]
    public int PageSize { get; set; }

    public override string GetSettingKey() => "Acc_CRM_LogActionActivityList";

    public override bool IsValid() => true;
}