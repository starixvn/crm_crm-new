namespace CRM.Criteria.Redemption
{
    using System;
    using CRM.Core.Models;
    using Fanex.Data;

    public class CreateRedemptionLogCommand : BaseNonQueryCommand
    {
        [SpParam(SqlParamName = "CustId")]
        public int CustomerId { get; set; }

        public string Subject { get; set; }

        public DateTime ClaimTime { get; set; }

        public string Remark { get; set; }

        public int StatusId { get; set; }

        public int CurrencyId { get; set; }

        public decimal Amount { get; set; }

        public string DoneBy { get; set; }

        public int UserId { get; set; }

        public string IP { get; set; }

        public override string GetSettingKey() => "Acc_CRM_RedemptionIns";

        public override bool IsValid() => true;
    }
}
