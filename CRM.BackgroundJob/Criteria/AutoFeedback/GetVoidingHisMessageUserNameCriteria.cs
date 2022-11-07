namespace CRM.BackgroundJob.Criteria.AutoFeedback
{
    using CRM.Core.Models;
    using Fanex.Data.Repository;

    public class GetVoidingHisMessageUserNameCriteria : CriteriaBase, CriteriaBaseSiteDb
    {
        public string Messages { get; set; }
        public int SiteDBGroupID { get; set; }

        public override string GetSettingKey() => "Acc_CRM_AbnormalAccount_GetUsernameList";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(Messages) && SiteDBGroupID > 0;
    }
}
