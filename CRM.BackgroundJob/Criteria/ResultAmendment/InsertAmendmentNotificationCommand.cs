namespace CRM.BackgroundJob.Criteria.ResultAmendment
{
    using Fanex.Data.Repository;
    public class InsertAmendmentNotificationCommand : NonQueryCommand
    {
        public string xml { get; set; }
        public int ErrCode { get; set; }
        public string ErrMsg { get; set; }
        public override string GetSettingKey() => "Acc_CRM_AmendmentNoti_AutoFeedbackInfoIns";
        public override bool IsValid() => !string.IsNullOrWhiteSpace(xml);
    }
}
