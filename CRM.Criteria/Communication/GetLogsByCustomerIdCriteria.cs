namespace CRM.Criteria.Communication
{
    using System;
    using Fanex.Data;

    public class GetLogsByCustomerIdCriteria : BaseSitePermisionCriteria
    {
        [SpParam(SqlParamName = "CustId")]
        public int CustomerId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int StatusId { get; set; }

        public string Handler { get; set; }

        public override string GetSettingKey() => "Acc_CRM_CommunicationLogList";

        public override bool IsValid() => true;
    }
}