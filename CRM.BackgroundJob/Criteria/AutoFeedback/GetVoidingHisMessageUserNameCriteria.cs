namespace CRM.BackgroundJob.Criteria.AutoFeedback
{
    using Fanex.Data.Repository;

    public class GetVoidingHisMessageUserNameCriteria : CriteriaBase
    {
        public string Messages { get; set; }

        public override string GetSettingKey() => "Acc_CRM_AbnormalAccount_GetUsernameList";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(Messages);
    }
}
