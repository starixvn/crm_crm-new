namespace CRM.BackgroundJob.Criteria.TurnoverControll
{
    using System;
    using Fanex.Data.Repository;
    public class GetTOControlCustNotificationSelCriteria : CriteriaBase
    {
        public DateTime LastNotifiedDate { get; set; }
        public int BatchSize { get; set; }
        public bool ConfigUAT { get; set; }
        public bool ConfigPRO { get; set; }
        public bool IsCredit { get; set; }
        public bool IsDeposit { get; set; }
        public string Enviroment { get; set; }
        public override string GetSettingKey() => "Acc_CRM_TOControl_CustNotificationSel";
        public override bool IsValid() => BatchSize > 0;
    }
}
