namespace CRM.Criteria.Communication
{
    using System;
    using CRM.Core.Constants;
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class GetLogsByCustomerIdCriteria : CriteriaBase
    {
        [SpParam(SqlParamName = "CustId")]
        public int CustomerId { get; set; }

        [SpParam(SqlParamName = "FromDate")]
        public DateTime FromDate { get; set; }

        [SpParam(SqlParamName = "ToDate")]
        public DateTime ToDate { get; set; }

        [SpParam(SqlParamName = "StatusId")]
        public int StatusId { get; set; }

        [SpParam(SqlParamName = "Handler")]
        public string Handler { get; set; }

        public short UserRole { get; } = Constants.UserRole;

        public override string GetSettingKey() => "Acc_CRM_CommunicationLogList";

        public override bool IsValid() => true;
    }
}
