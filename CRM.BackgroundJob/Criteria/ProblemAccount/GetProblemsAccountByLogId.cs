
namespace CRM.BackgroundJob.Criteria.ProblemAccount
{
    using Fanex.Data.Repository;
    public class GetProblemsAccountByLogId : CriteriaBase
    {
        public int LastLogId { get; set; }
        public int BatchSize { get; set; }

        public override string GetSettingKey() => "Acc_CRM_Chatbot_ProblemAccounts_Sel";
        public override bool IsValid() => true;
    }
}
