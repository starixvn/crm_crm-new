namespace CRM.Criteria.Redemption;

using System;
using Fanex.Data;
using Fanex.Data.Repository;

public class GetLogsByCustomerIdCriteria : CriteriaBase
{
    [SpParam(SqlParamName = "CustId")]
    public int CustomerId { get; set; }

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public int StatusId { get; set; }

    public override string GetSettingKey() => "Acc_CRM_RedemptionList";

    public override bool IsValid() => true;
}